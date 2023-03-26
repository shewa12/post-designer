<?php
/**
 * Post list template
 *
 * @package PostDesigner\List
 * @author Shewa <shewa12kpi@gmail.com>
 * @link https://shewazone.com
 * @since 1.0.0
 */

use PostDesigner\Utilities\Utilities;

global $wp_query;

$args      = Utilities::prepare_args( $attrs );
$the_query = new WP_Query( $args );

if ( $the_query->have_posts() ) :
?>

<div class="wp-block-post-designer-list">

	<div class='pd-card-row pd-<?php echo esc_attr( $attrs['columnPerRow'] ); ?>-col'>
		<?php
			while ( $the_query->have_posts() ) :
			$the_query->the_post();
		?>

			<?php require trailingslashit( __DIR__ ) . 'card/card.php'; ?>

		<?php endwhile; ?>
	</div>

	<!-- pagination -->
	<?php
		$big = PHP_INT_MAX;
		$pagination_args = array(
			'base'      => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format'    => '?paged=%#%',
			'current'   => max( 1, get_query_var( 'paged' ) ),
			'total'     => $the_query->max_num_pages
		);

		$wp_query->max_num_pages = $the_query->max_num_pages;
	?>
	<div class="pd-pagination">
		<?php echo paginate_links( $args ); ?>
	</div>
	<!-- pagination end -->
	
</div>

<?php else : ?>
	<p>
		<?php esc_html_e( 'No posts found', 'post-designer' ); ?>
	</p>
<?php
endif;
wp_reset_postdata();
?>

