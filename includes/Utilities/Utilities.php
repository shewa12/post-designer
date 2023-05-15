<?php
/**
 * Provide static utility methods
 *
 * @since v1.0.0
 * @package PostDesigner\Utilities
 * @author <Shewa>
 */

namespace PostDesigner\Utilities;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Utilities class
 */
class Utilities {

	/**
	 * Prepare args for WP_Query
	 *
	 * @since v1.0.0
	 *
	 * @param array $attrs blocks attrs.
	 *
	 * @return array
	 */
	public static function prepare_args( array $attrs ): array {
		$args = array(
			'post_type'      => sanitize_text_field( $attrs['postType'] ),
			'posts_per_page' => sanitize_text_field( $attrs['postPerPage'] ),
			'paged'          => get_query_var( 'paged', 1 ),
			'nopaging'       => sanitize_text_field( $attrs['noPagination'] ),
			'orderby'        => sanitize_text_field( $attrs['orderBy'] ),
			'order'          => sanitize_text_field( $attrs['order'] ),
		);

		if ( is_array( $attrs['authors'] ) && count( $attrs['authors'] ) ) {
			$args['authors'] = sanitize_text_field( implode( ',', $attrs['authors'] ) );
		}

		if ( is_array( $attrs['selectedTerms'] ) && count( $attrs['selectedTerms'] ) ) {
			$term_ids = array_column( $attrs['selectedTerms'], 'term_id' );

			$args['tax_query'] = array(
				'relation' => 'AND',
				array(
					'taxonomy' => sanitize_text_field( $attrs['taxonomy'] ),
					'field'    => 'term_id',
					'terms'    => $term_ids,
				)
			);
		}
		return $args;
	}
}
