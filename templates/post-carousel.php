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

	<div class='pd-card-row pd-slick-slider' <?php echo $attrs['rtl'] ? 'dir="rtl"' : ''; ?> data-slides-to-show="<?php echo esc_attr( $attrs['postPerPage'] ); ?>" data-initial-slide="<?php echo esc_attr( $attrs['initialSlide'] ); ?>" data-dots="<?php echo (bool) esc_attr( $attrs['dots'] ); ?>" data-infinite="<?php echo (bool) esc_attr( $attrs['infinite'] ); ?>" data-autoplay="<?php echo (bool) esc_attr( $attrs['autoplay'] ); ?>" data-center-mode="<?php echo (bool) esc_attr( $attrs['centerMode'] ); ?>" data-speed="<?php echo esc_attr( $attrs['speed'] ); ?>" data-slides-to-scroll="<?php echo esc_attr( $attrs['slidesToScroll'] ); ?>" data-arrows="<?php echo (bool) esc_attr( $attrs['arrows'] ); ?>" data-focus-on-select="<?php echo (bool) esc_attr( $attrs['focusOnSelect'] ); ?>" data-rtl="<?php echo esc_attr( $attrs['rtl'] ? true : false ); ?>">
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

$title_padding = implode( ' ', array_values( $attrs['titlePadding'] ) );
?>
<script>
	var r = document.querySelector(':root');

	r.style.setProperty('--pd-card-background-color', '<?php echo esc_attr( $attrs['cardBackgroundColor'] ); ?>');
	r.style.setProperty('--pd-card-border','<?php echo esc_attr( $attrs['cardBorder'] ) . 'px'; ?>');
	r.style.setProperty('--pd-card-border-radius','<?php echo esc_attr( $attrs['cardBorderRadius'] ) . 'px'; ?>');

	r.style.setProperty('--pd-title-color','<?php echo esc_attr( $attrs['titleColor'] ); ?>');
	r.style.setProperty('--pd-title-padding','<?php echo esc_attr( $title_padding ); ?>');
	r.style.setProperty('--pd-title-font-size','<?php echo esc_attr( $attrs['titleFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-meta-key-color','<?php echo esc_attr( $attrs['metaKeyColor'] ); ?>');
	r.style.setProperty('--pd-meta-key-font-size','<?php echo esc_attr( $attrs['metaKeyFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-meta-value-color','<?php echo esc_attr( $attrs['metaValueColor'] ); ?>');
	r.style.setProperty('--pd-meta-value-font-size','<?php echo esc_attr( $attrs['metaValueFontSize'] ) . 'px'; ?>');
</script>
