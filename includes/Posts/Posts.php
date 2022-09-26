<?php
/**
 * Manage Post API callback
 *
 * @since v1.0.0
 * @package PostDesigner\Posts
 * @author <Shewa>
 */

namespace PostDesigner\Posts;

use PostDesigner\Validation\Validation;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Post API endpoints method
 */
class Posts {

	/**
	 * Get posts
	 *
	 * @since v1.0.0
	 *
	 * @return array
	 */
	public static function get_posts(): array {
		$args      = array(
			'post_type' => 'post',
		);
		$posts     = array();
		$the_query = new WP_Query( $args );
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post();
				$author = array(
					'ID'           => get_the_author_meta( 'ID' ),
					'user_email'   => get_the_author_meta( 'user_email' ),
					'first_name'   => get_the_author_meta( 'first_name' ),
					'last_name'    => get_the_author_meta( 'last_name' ),
					'display_name' => get_the_author_meta( 'display_name' ),
					'description'  => get_the_author_meta( 'description' ),
					'avatar'       => get_avatar_url( get_the_author_meta( 'ID' ) ),
				);
				$post   = array(
					'ID'           => get_the_ID(),
					'post_title'   => get_the_title(),
					'post_content' => get_the_content(),
					'post_date'    => get_the_date( get_option( 'date_format' ) ),
					'thumbnail'    => get_the_post_thumbnail_url(),
					'author'       => $author,
					'categories'   => get_the_category_list( ',' ),
					'tags'         => get_the_tag_list( '<span class="pd-post-tag">', ',', '<span>' ),
				);
				array_push( $posts, $post );
			}
			wp_reset_postdata();
			return $posts;
		} else {
			return array();
		}
	}

	/**
	 * Get terms
	 *
	 * @since v1.0.0
	 *
	 * @param WP_REST_Request $request  post type.
	 *
	 * @return mixed WP_Term on success, WP_Error on failure
	 */
	public static function get_terms( WP_REST_Request $request ) {
		$post_type        = sanitize_text_field( $request['post-type'] );
		$taxonomy         = sanitize_text_field( $request['taxonomy'] );
		$validation_rules = array(
			'post-type' => 'required',
			'taxonomy'  => 'required',
		);
		$data             = array(
			'post-type' => $post_type,
			'taxonomy'  => $taxonomy,
		);

		$validate = Validation::validate( $validation_rules, $data );
		if ( $validate->success ) {
			$terms = self::get_terms_by_post_type( $post_type, $taxonomy );
			return rest_ensure_response( $terms );
		} else {
			return rest_ensure_response( $validate->errors );
		}
	}

	/**
	 * Get terms by post type
	 *
	 * @param string $post_type  post type.
	 * @param string $taxonomy taxonomy name.
	 *
	 * @return mixed WP_Term on success WP_Error on failure
	 */
	public static function get_terms_by_post_type( string $post_type, string $taxonomy ) {
		$posts_in_post_type = get_posts(
			array(
				'fields'         => 'ids',
				'post_type'      => $post_type,
				'posts_per_page' => -1,
			)
		);

		return wp_get_object_terms( $posts_in_post_type, $taxonomy, array( 'ids' ) );
	}

	/**
	 * Permission callback for API
	 *
	 * @return bool
	 */
	public static function permission(): bool {
		return true;
	}
}
