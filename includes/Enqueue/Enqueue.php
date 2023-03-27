<?php
/**
 * Enqueue assets
 *
 * @since v1.0.0
 * @package PostDesigner\Enqueue
 * @author <Shewa>
 */

namespace PostDesigner\Enqueue;

use PostDesigner;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Assets enqueue class
 */
class Enqueue {

    private static $plugin_data;

    /**
     * Register hooks
     * 
     * @since 1.0.0
     */
    public function __construct()
    {
        add_action( 'wp_enqueue_scripts', __CLASS__ . '::load_frontend_scripts' );

        self::$plugin_data = PostDesigner::plugin_data();
    }

    /**
     * Load frontend only scripts
     * 
     * @since 1.0.0
     */
    public static function load_frontend_scripts() {
        wp_enqueue_script(
            'pd-slick-slider',
            self::$plugin_data['assets'] . 'lib/slick-slider.min.js',
            array( 'jquery' ),
            filemtime( self::$plugin_data['plugin_path'] . 'assets/lib/slick-slider.min.js' ),
            true
        );
        wp_enqueue_script(
            'pd-slick-slider-config',
            self::$plugin_data['assets'] . 'lib/slick-config.js',
            array( 'jquery' ),
            filemtime( self::$plugin_data['plugin_path'] . 'assets/lib/slick-config.js' ),
            true
        );
        wp_enqueue_style(
            'pd-slick-slider',
            self::$plugin_data['assets'] . 'lib/slick.css'
        );
        wp_enqueue_style(
            'pd-slick-theme',
            self::$plugin_data['assets'] . 'lib/slick-theme.css'
        );

        $custom_css = "
            .pd-slick-slider .slick-prev:before, .slick-next:before{
                color:#000;
            }
            .pd-slick-slider .slick-track {
                display: flex;
                gap: 20px;
            }
            .pd-slick-slider .slick-slide {
                height: inherit !important;
            }
        ";
        wp_add_inline_style(
            'pd-slick-theme',
            $custom_css
        );
    }
}