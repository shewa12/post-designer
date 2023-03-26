<?php
/**
 * Post carousel template
 *
 * @package PostDesigner\Carousel
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

<div class="wp-block-post-designer-carousel">

	<div class='pd-card-row pd-slick-slider'>
		<?php
		while ( $the_query->have_posts() ) :
			$the_query->the_post();
			?>

			<?php require trailingslashit( __DIR__ ) . 'card/card.php'; ?>

		<?php endwhile; ?>
	</div>
	
</div>

<?php else : ?>
	<p>
		<?php esc_html_e( 'No posts found', 'post-designer' ); ?>
	</p>
	<?php
endif;
wp_reset_postdata();
?>