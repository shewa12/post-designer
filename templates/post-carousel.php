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

	<div class='pd-card-row pd-slick-slider' <?php echo esc_attr( $attrs['rtl'] ? 'dir="rtl"' : '' ); ?> data-slides-to-show="<?php echo esc_attr( $attrs['postPerPage'] ); ?>" data-initial-slide="<?php echo esc_attr( $attrs['initialSlide'] ); ?>" data-dots="<?php echo (bool) esc_attr( $attrs['dots'] ); ?>" data-infinite="<?php echo (bool) esc_attr( $attrs['infinite'] ); ?>" data-autoplay="<?php echo (bool) esc_attr( $attrs['autoplay'] ); ?>" data-center-mode="<?php echo (bool) esc_attr( $attrs['centerMode'] ); ?>" data-speed="<?php echo esc_attr( $attrs['speed'] ); ?>" data-slides-to-scroll="<?php echo esc_attr( $attrs['slidesToScroll'] ); ?>" data-arrows="<?php echo (bool) esc_attr( $attrs['arrows'] ); ?>" data-focus-on-select="<?php echo (bool) esc_attr( $attrs['focusOnSelect'] ); ?>" data-rtl="<?php echo esc_attr( $attrs['rtl'] ? true : false ); ?>">
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

$border        = $attrs['avatarBorder'];
$avatar_border = new stdClass();

if ( isset( $border['top'] ) ) {

	$avatar_border->top    = $border['top']['width'];
	$avatar_border->right  = $border['right']['width'];
	$avatar_border->bottom = $border['bottom']['width'];
	$avatar_border->left   = $border['left']['width'];

	if ( '' !== $avatar_border->top ) {
		$avatar_border->top = $avatar_border->top . ' ' . ( $border['top']['style'] . ' ' ?? '' ) . ( $border['top']['color'] ?? '' );
	}

	if ( '' !== $avatar_border->right ) {
		$avatar_border->right = $avatar_border->right . ' ' . ( $border['right']['style'] . ' ' ?? '' ) . ( $border['right']['color'] ?? '' );
	}

	if ( '' !== $avatar_border->bottom ) {
		$avatar_border->bottom = $avatar_border->bottom . ' ' . ( $border['bottom']['style'] . ' ' ?? '' ) . ( $border['bottom']['color'] ?? '' );
	}

	if ( '' !== $avatar_border->left ) {
		$avatar_border->left = $avatar_border->left . ' ' . ( $border['left']['style'] . '' ?? '' ) . ( $border['left']['color'] ?? '' );
	}
} else {

	$avatar_border->top = $border['width'] ?? '';

	if ( '' !== $avatar_border->top ) {
		$avatar_border->top    = $avatar_border->top . ' ' . $border['style'] . ' ' ?? '' . $border['color'] ?? '';
		$avatar_border->right  = $avatar_border->top;
		$avatar_border->bottom = $avatar_border->top;
		$avatar_border->left   = $avatar_border->top;
	}
}
?>
<script>
	var r = document.querySelector(':root');

	// Card
	r.style.setProperty('--pd-carousel-card-background-color', '<?php echo esc_attr( $attrs['cardBackgroundColor'] ); ?>');
	r.style.setProperty('--pd-carousel-card-border','<?php echo esc_attr( $attrs['cardBorder'] ) . 'px'; ?>');
	r.style.setProperty('--pd-carousel-card-border-radius','<?php echo esc_attr( $attrs['cardBorderRadius'] ) . 'px'; ?>');

	// Title
	r.style.setProperty('--pd-carousel-title-color','<?php echo esc_attr( $attrs['titleColor'] ); ?>');
	r.style.setProperty('--pd-carousel-title-padding','<?php echo esc_attr( $title_padding ); ?>');
	r.style.setProperty('--pd-carousel-title-font-size','<?php echo esc_attr( $attrs['titleFontSize'] ) . 'px'; ?>');

	// Meta
	r.style.setProperty('--pd-carousel-meta-key-color','<?php echo esc_attr( $attrs['metaKeyColor'] ); ?>');
	r.style.setProperty('--pd-carousel-meta-key-font-size','<?php echo esc_attr( $attrs['metaKeyFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-carousel-meta-value-color','<?php echo esc_attr( $attrs['metaValueColor'] ); ?>');
	r.style.setProperty('--pd-carousel-meta-value-font-size','<?php echo esc_attr( $attrs['metaValueFontSize'] ) . 'px'; ?>');

	// Category
	r.style.setProperty('--pd-carousel-category-label-color','<?php echo esc_attr( $attrs['categoryLabelColor'] ); ?>');
	r.style.setProperty('--pd-carousel-category-label-font-size','<?php echo esc_attr( $attrs['categoryLabelFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-carousel-category-value-color','<?php echo esc_attr( $attrs['categoryValueColor'] ); ?>');
	r.style.setProperty('--pd-carousel-category-value-font-size','<?php echo esc_attr( $attrs['categoryValueFontSize'] ) . 'px'; ?>');

	// Excerpt
	r.style.setProperty('--pd-carousel-excerpt-color','<?php echo esc_attr( $attrs['excerptColor'] ); ?>');
	r.style.setProperty('--pd-carousel-excerpt-font-size','<?php echo esc_attr( $attrs['excerptFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-carousel-read-more-color','<?php echo esc_attr( $attrs['readMoreColor'] ); ?>');
	r.style.setProperty('--pd-carousel-read-more-font-size','<?php echo esc_attr( $attrs['readMoreFontSize'] ) . 'px'; ?>');

	// Author
	r.style.setProperty('--pd-carousel-avatar-size', '<?php echo esc_attr( $attrs['avatarSize'] . 'px' ); ?>');

	r.style.setProperty('--pd-carousel-avatar-border-top', '<?php echo esc_attr( $avatar_border->top ); ?>');
	r.style.setProperty('--pd-carousel-avatar-border-right', '<?php echo esc_attr( $avatar_border->right ); ?>');
	r.style.setProperty('--pd-carousel-avatar-border-left', '<?php echo esc_attr( $avatar_border->left ); ?>');
	r.style.setProperty('--pd-carousel-avatar-border-bottom','<?php echo esc_attr( $avatar_border->bottom ); ?>');
	
	r.style.setProperty('--pd-carousel-avatar-border-radius', '<?php echo esc_attr( $attrs['avatarBorderRadius'] . '%' ); ?>');
	r.style.setProperty('--pd-carousel-author-name-color','<?php echo esc_attr( $attrs['authorNameColor'] ); ?>');
	r.style.setProperty('--pd-carousel-author-name-font-size', '<?php echo esc_attr( $attrs['authorNameFontSize'] . 'px' ); ?>');

</script>
