<?php
/**
 * Register Routes
 *
 * @since v1.0.0
 * @package PostDesigner\API
 * @author <Shewa>
 */

namespace PostDesigner\API;

use PostDesigner\Posts\Posts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Register supported routes
 */
class Routes {

	/**
	 * Route namespace
	 *
	 * @since v1.0.0
	 *
	 * @var string
	 */
	const NAMESPACE = 'post-designer/v1';

	/**
	 * Register hooks
	 *
	 * @since v1.0.0
	 */
	public function __construct() {
		add_action( 'rest_api_init', __CLASS__ . '::register_routes' );
	}

	/**
	 * Register the available routes
	 *
	 * @since v1.0.0
	 *
	 * @return void
	 */
	public static function register_routes() {
		foreach ( self::endpoints() as $endpoint ) {
			register_rest_route(
				self::NAMESPACE,
				$endpoint['endpoint'] . $endpoint['url_params'],
				array(
					'methods'             => $endpoint['method'],
					'callback'            => $endpoint['callback'],
					'permission_callback' => $endpoint['permission_callback'],
				)
			);
		}
	}

	/**
	 * Get available endpoints
	 *
	 * @since v1.0.0
	 *
	 * @return array
	 */
	public static function endpoints() {
		return array(
			array(
				'endpoint'            => 'get-posts',
				'url_params'          => '',
				'method'              => 'GET',
				'callback'            => array( Posts::class, 'get_posts' ),
				'permission_callback' => array( Posts::class, 'permission' ),
			),
			array(
				'endpoint'            => 'get-terms',
				'url_params'          => '',
				'method'              => 'GET',
				'callback'            => array( Posts::class, 'get_terms' ),
				'permission_callback' => array( Posts::class, 'permission' ),
			),
			array(
				'endpoint'            => 'get-post-types',
				'url_params'          => '',
				'method'              => 'GET',
				'callback'            => array( Posts::class, 'get_post_types' ),
				'permission_callback' => array( Posts::class, 'permission' ),
			),
			array(
				'endpoint'            => 'get-post-taxonomies',
				'url_params'          => '',
				'method'              => 'GET',
				'callback'            => array( Posts::class, 'get_post_taxonomies' ),
				'permission_callback' => array( Posts::class, 'permission' ),
			),
			array(
				'endpoint'            => 'get-post-authors',
				'url_params'          => '',
				'method'              => 'GET',
				'callback'            => array( Posts::class, 'get_post_authors' ),
				'permission_callback' => array( Posts::class, 'permission' ),
			),
		);
	}
}
