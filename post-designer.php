<?php
/**
 * Plugin Name:       Post Designer
 * Description:       Design any kind of post as a List & Carousel.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blocky
 *
 * @package           post-designer
 */

use PostDesigner\Blocks\Blocks;

if ( ! class_exists( 'PostDesigner' ) ) {

	/**
	 * PostDesigner main class that trigger the plugin
	 */
	final class PostDesigner {

		/**
		 * Plugin meta data
		 *
		 * @since v1.0.0
		 *
		 * @var $plugin_data
		 */
		private static $plugin_data = array();

		/**
		 * Plugin instance
		 *
		 * @since v1.0.0
		 *
		 * @var $instance
		 */
		public static $instance = null;

		/**
		 * Register hooks and load dependent files
		 *
		 * @since v1.0.0
		 *
		 * @return void
		 */
		public function __construct() {
			if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
				include_once __DIR__ . '/vendor/autoload.php';
			}
			register_activation_hook( __FILE__, array( __CLASS__, 'register_activation' ) );
			register_deactivation_hook( __FILE__, array( __CLASS__, 'register_deactivation' ) );
			add_action( 'init', array( __CLASS__, 'load_textdomain' ) );

			$this->load_packages();
		}

		/**
		 * Plugin meta data
		 *
		 * @since v1.0.0
		 *
		 * @return array  contains plugin meta data
		 */
		public static function plugin_data(): array {
			if ( ! function_exists( 'get_plugin_data' ) ) {
				require_once ABSPATH . 'wp-admin/includes/plugin.php';
			}
			$plugin_data = get_plugin_data(
				__FILE__
			);
			array_push( self::$plugin_data, $plugin_data );

			self::$plugin_data['plugin_url']  = plugin_dir_url( __FILE__ );
			self::$plugin_data['plugin_path'] = plugin_dir_path( __FILE__ );
			self::$plugin_data['base_name']   = plugin_basename( __FILE__ );
			self::$plugin_data['templates']   = plugin_dir_path( __FILE__ ) . 'templates';
			self::$plugin_data['views']       = plugin_dir_path( __FILE__ ) . 'views';
			self::$plugin_data['assets']      = plugin_dir_url( __FILE__ ) . 'assets';
			self::$plugin_data['base_name']   = plugin_basename( __FILE__ );
			// set ENV DEV | PROD.
			self::$plugin_data['env'] = 'DEV';
			return self::$plugin_data;
		}

		/**
		 * Create and return instance of this plugin
		 *
		 * @return self  instance of plugin
		 */
		public static function instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Do some stuff after activate plugin
		 *
		 * @return void
		 */
		public static function register_activation() {
			update_option( '_post_designer_install_time', time() );
		}

		/**
		 * Do some stuff after deactivate plugin
		 *
		 * @return void
		 */
		public static function register_deactivation() {

		}

		/**
		 * Load plugin text domain
		 *
		 * @return void
		 */
		public static function load_textdomain() {
			load_plugin_textdomain( 'post-designer', false, dirname( plugin_basename( __FILE__ ) ) . '/assets/languages' );
		}

		/**
		 * Load packages
		 *
		 * @return void
		 */
		public function load_packages() {
			new Blocks();
		}
	}
	// trigger.
	PostDesigner::instance();
}

