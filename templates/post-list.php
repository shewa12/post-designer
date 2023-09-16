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
		$big             = PHP_INT_MAX;
		$pagination_args = array(
			'base'    => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format'  => '?paged=%#%',
			'current' => max( 1, get_query_var( 'paged' ) ),
			'total'   => $the_query->max_num_pages,
		);

		$wp_query->max_num_pages = $the_query->max_num_pages;
		?>
		<?php if ( $wp_query->max_num_pages > 1 ) : ?>
			<div class="pd-pagination">
				<?php echo wp_kses_post( paginate_links( $args ) ); ?>
			</div>
		<?php endif; ?>
	<!-- pagination end -->
	
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
	r.style.setProperty('--pd-list-card-background-color', '<?php echo esc_attr( $attrs['cardBackgroundColor'] ); ?>');
	r.style.setProperty('--pd-list-card-border','<?php echo esc_attr( $attrs['cardBorder'] ) . 'px'; ?>');
	r.style.setProperty('--pd-list-card-border-radius','<?php echo esc_attr( $attrs['cardBorderRadius'] ) . 'px'; ?>');

	// Title
	r.style.setProperty('--pd-list-title-color','<?php echo esc_attr( $attrs['titleColor'] ); ?>');
	r.style.setProperty('--pd-list-title-padding','<?php echo esc_attr( $title_padding ); ?>');
	r.style.setProperty('--pd-list-title-font-size','<?php echo esc_attr( $attrs['titleFontSize'] ) . 'px'; ?>');

	// Meta
	r.style.setProperty('--pd-list-meta-key-color','<?php echo esc_attr( $attrs['metaKeyColor'] ); ?>');
	r.style.setProperty('--pd-list-meta-key-font-size','<?php echo esc_attr( $attrs['metaKeyFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-list-meta-value-color','<?php echo esc_attr( $attrs['metaValueColor'] ); ?>');
	r.style.setProperty('--pd-list-meta-value-font-size','<?php echo esc_attr( $attrs['metaValueFontSize'] ) . 'px'; ?>');

	// Category
	r.style.setProperty('--pd-list-category-label-color','<?php echo esc_attr( $attrs['categoryLabelColor'] ); ?>');
	r.style.setProperty('--pd-list-category-label-font-size','<?php echo esc_attr( $attrs['categoryLabelFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-list-category-value-color','<?php echo esc_attr( $attrs['categoryValueColor'] ); ?>');
	r.style.setProperty('--pd-list-category-value-font-size','<?php echo esc_attr( $attrs['categoryValueFontSize'] ) . 'px'; ?>');

	// Excerpt
	r.style.setProperty('--pd-list-excerpt-color','<?php echo esc_attr( $attrs['excerptColor'] ); ?>');
	r.style.setProperty('--pd-list-excerpt-font-size','<?php echo esc_attr( $attrs['excerptFontSize'] ) . 'px'; ?>');

	r.style.setProperty('--pd-list-read-more-color','<?php echo esc_attr( $attrs['readMoreColor'] ); ?>');
	r.style.setProperty('--pd-list-read-more-font-size','<?php echo esc_attr( $attrs['readMoreFontSize'] ) . 'px'; ?>');

	// Author
	r.style.setProperty('--pd-list-avatar-size', '<?php echo esc_attr( $attrs['avatarSize'] . 'px' ); ?>');

	r.style.setProperty('--pd-list-avatar-border-top', '<?php echo esc_attr( $avatar_border->top ); ?>');
	r.style.setProperty('--pd-list-avatar-border-right', '<?php echo esc_attr( $avatar_border->right ); ?>');
	r.style.setProperty('--pd-list-avatar-border-left', '<?php echo esc_attr( $avatar_border->left ); ?>');
	r.style.setProperty('--pd-list-avatar-border-bottom','<?php echo esc_attr( $avatar_border->bottom ); ?>');
	
	r.style.setProperty('--pd-list-avatar-border-radius', '<?php echo esc_attr( $attrs['avatarBorderRadius'] . '%' ); ?>');
	r.style.setProperty('--pd-list-author-name-color','<?php echo esc_attr( $attrs['authorNameColor'] ); ?>');
	r.style.setProperty('--pd-list-author-name-font-size', '<?php echo esc_attr( $attrs['authorNameFontSize'] . 'px' ); ?>');

</script>

