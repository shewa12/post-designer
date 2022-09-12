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
			register_block_type( $plugin_data['plugin_path'] . 'build/' . $block );
		}
	}
}
