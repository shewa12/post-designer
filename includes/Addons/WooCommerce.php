<?php
/**
 * Extend Post Designer with WooCommerce
 *
 * Add WC Product data to show on post list
 *
 * @package PostDesigner\Extends\WooCommerce
 * @since   1.0.0
 * @author Shewa <shewa12kpi@email.com>
 */

namespace PostDesigner\Addons;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Extends Post Designer with WC
 */
class WooCommerce {

	/**
	 * WC product post type
	 *
	 * @var string
	 */
	const PRODUCT_POST_TYPE = 'product';

	/**
	 * Register hooks
	 *
	 * @since 1.1.0
	 */
	public function __construct() {
		add_action( 'plugins_loaded', __CLASS__ . '::init' );
	}

	/**
	 * Init all the hooks / methods
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public static function init() {
		if ( ! self::is_exists() ) {
			return;
		}

		add_filter( 'pd_post_after_footer', __CLASS__ . '::add_product_info', 10, 2 );
	}
	/**
	 * Add product info with post content
	 *
	 * @since 1.1.0
	 *
	 * @param string $content default content.
	 * @param int    $post_id product id.
	 *
	 * @return string
	 */
	public static function add_product_info( string $content, int $post_id ) {
		if ( self::PRODUCT_POST_TYPE === get_post_type( $post_id ) ) {
			$content = self::get_product_price_with_cart_btn( $post_id );
		}

		return $content;
	}

	/**
	 * Get WC product price & add-to-cart/product view btn html
	 *
	 * @since 1.0.0
	 *
	 * @param integer $post_id product id.
	 *
	 * @return string
	 */
	public static function get_product_price_with_cart_btn( int $post_id ) {
		if ( ! self::is_exists() ) {
			return '';
		}

		$product      = wc_get_product();
		$product_info = '';

		if ( $product ) {
			$product_price = $product->get_price_html();

			ob_start();

			woocommerce_template_single_add_to_cart();

			$add_to_cart = ob_get_clean();

			$product_info = '<div class="pd-wc-product-info">
				<div> ' . $product_price . ' </div>
				<div>
					' . $add_to_cart . '
				</div>
			</div>';

			return $product_info;
		}

		return $product_info;
	}

	/**
	 * Check weather WC exists or not
	 *
	 * @since 1.0.0
	 *
	 * @return boolean
	 */
	private static function is_exists() {
		return function_exists( 'WC' );
	}
}
