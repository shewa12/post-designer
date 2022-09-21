<?php
/**
 * Manage Post API callback
 *
 * @since v1.0.0
 * @package PostDesigner\Posts
 * @author <Shewa>
 */

namespace PostDesigner\Posts;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Post API endpoints method
 */
class Posts {

    public static function get() {
        $args = array(
            'post_type' => 'post',
        );
        $the_query = new WP_Query( $args );
        if ( $the_query->have_posts() ) {
            return $the_query->posts;
        } else {
            return array();
        }
    }
}