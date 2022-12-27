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

	/**
	 * Register hooks
	 *
	 * @since v1.0.0
	 */
	public function __construct() {
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
		$plugin_data  = PostDesigner::plugin_data();
		$array_blocks = array(
			'list',
			'carousel',
		);
		foreach ( $array_blocks as $block ) {
			register_block_type(
				$plugin_data['plugin_path'] . 'build/' . $block,
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
		return 'hello....';
	}
}
