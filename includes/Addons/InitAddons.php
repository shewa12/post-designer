<?php
/**
 * Initialize Addons
 *
 * @package PostDesigner\Addons
 * @since 1.0.0
 * @author Shewa <shewa12kpi@email.com>
 */

namespace PostDesigner\Addons;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initialize all the addons
 *
 * @since 1.0.0
 */
class InitAddons {

	/**
	 * Create instance of Addons class
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		new WooCommerce();
	}
}
