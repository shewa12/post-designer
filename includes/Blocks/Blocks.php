<?php
/**
 * Register blocks
 *
 * @since v1.0.0
 * @package PostDesigner\Blocks
 * @author <Shewa>
 */

namespace PostDesigner\Blocks;

use PostDesigner;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register blocks
 */
class Blocks {

	private static $plugin_data;

	/**
	 * Register hooks
	 *
	 * @since v1.0.0
	 */
	public function __construct() {
		self::$plugin_data = PostDesigner::plugin_data();
		add_action( 'init', __CLASS__ . '::register_blocks' );
		add_filter( 'block_categories_all', __CLASS__ . '::filter_block_categories', 10, 2 );
	}

	/**
	 * Register all blocks
	 *
	 * @since v1.0.0
	 *
	 * @return void
	 */
	public static function register_blocks() {
		$array_blocks = array(
			'list',
			'carousel',
		);
		foreach ( $array_blocks as $block ) {
			register_block_type(
				self::$plugin_data['plugin_path'] . 'build/' . $block,
				array(
					'render_callback' => __CLASS__ . "::render_{$block}",
				)
			);
		}
	}

	/**
	 * Add custom category
	 *
	 * @param array  $block_categories available categories.
	 * @param object $editor_context editor context.
	 *
	 * @return array   modified categories
	 */
	public static function filter_block_categories( $block_categories, $editor_context ) {
		array_push(
			$block_categories,
			array(
				'slug'  => 'post-designer',
				'title' => __( 'Post Designer', 'post-designer' ),
				'icon'  => null,
			)
		);
		return $block_categories;
	}

	/**
	 * Render list block on the frontend
	 *
	 * @since 1.0.0
	 *
	 * @param array $attrs attributes of block.
	 *
	 * @return string
	 */
	public static function render_list( $attrs ) {
		$post_list_template = trailingslashit( self::$plugin_data['templates'] ) . 'post-list.php';
		ob_start();
		if ( file_exists( $post_list_template ) ) {
			include $post_list_template;
		} else {
			echo esc_html( $post_list_template ) . esc_html__( 'not found', 'post-designer' );
		}

		return apply_filters(
			'post_designer_list_template',
			ob_get_clean()
		);
	}

	/**
	 * Render carousel block on the frontend
	 *
	 * @since 1.0.0
	 *
	 * @param array $attrs attributes of block.
	 *
	 * @return string
	 */
	public static function render_carousel( $attrs ) {
		$post_carousel_template = trailingslashit( self::$plugin_data['templates'] ) . 'post-carousel.php';
		ob_start();
		if ( file_exists( $post_carousel_template ) ) {
			include $post_carousel_template;
		} else {
			echo esc_html( $post_carousel_template ) . esc_html__( 'not found', 'post-designer' );
		}

		return apply_filters(
			'post_designer_carousel_template',
			ob_get_clean()
		);
	}
}
