<?php
/**
 * Card template
 *
 * @since v1.0.0
 * @package PostDesigner\Templates
 */

use PostDesigner\Posts\Posts;

$meta_data         = PostDesigner::plugin_data();
$default_thumbnail = $meta_data['assets'] . 'images/thumbnail.svg';
$author_avatar_url = get_avatar_url(
	get_the_author_meta( 'ID' ),
	array(
		'size'    => 50,
		'default' => 'mysteryman',
	)
);

// Get custom categories.
$custom_categories = '';
$post_type         = get_post_type();

if ( 'post' !== $post_type ) {
	$args = array(
		'object_type' => array( get_post_type() ),
		'public'      => true,
		'show_ui'     => true,
	);

	$custom_categories = Posts::get_custom_post_categories( $args );
}

$has_category = 'post' === $post_type ? has_category() : '' !== $custom_categories;

?>
<div class="pd-card">

	<?php if ( $attrs['showThumbnail'] ) : ?>
	<div class="pd-post-thumbnail">
		<a href="<?php the_permalink(); ?>" class="pd-d-block">
			<div class="pd-ratio pd-ratio-16x9">
				<?php if ( has_post_thumbnail() ) : ?>
					<?php the_post_thumbnail(); ?>
				<?php else : ?>
					<img src="<?php echo esc_url( $default_thumbnail ); ?>" alt="<?php the_title(); ?>">
				<?php endif; ?>
			</div>
		</a>
	</div>
	<?php endif; ?>

	<div class="pd-card-body">

		<?php if ( $attrs['showTitle'] ) : ?>
			<h3 class="pd-post-title" title="<?php the_title(); ?>">
				<a href="<?php the_permalink(); ?>" target="_parent">
					<?php the_title(); ?>
				</a>
			</h3>
		<?php endif; ?>
		
		<?php if ( $attrs['showMeta'] ) : ?>
			<div class="pd-post-meta">
				<span class='pd-post-meta-key'>
					<?php esc_html_e( 'Post Date:', 'post-designer' ); ?>
				</span>
				<span class='pd-post-meta-value'>
					<?php the_time(); ?>
				</span>
			</div>
		<?php endif; ?>

		<?php if ( $attrs['showCategory'] && $has_category ) : ?>
			<div class="pd-post-categories">
				<span class="pd-post-category-key">
					<?php esc_html_e( 'In:', 'post-designer' ); ?>
				</span>
				<div class="pd-post-category-value">
					<?php
					if ( 'post' === get_post_type() ) {
						the_category( ',' );
					} else {
						echo wp_kses(
							$custom_categories,
							array(
								'a' => array(
									'href'  => true,
									'class' => true,
									'id'    => true,
								),
							)
						);
					}
					?>
				</div>
			</div>
		<?php endif; ?>

		<?php if ( $attrs['showExcerpt'] ) : ?>
			<div class="pd-post-content">
				<p>
				<?php the_excerpt(); ?>  
				</p>
			</div>
		<?php endif; ?>

	</div>
	
	<?php if ( $attrs['showAvatar'] || $attrs['showAuthor'] ) : ?>
	<div class="pd-card-footer">
		<div class="pd-post-author">
			<?php if ( $attrs['showAvatar'] ) : ?>
				<a href="#" class="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self">
					<img src="<?php echo esc_url( $author_avatar_url ); ?>" alt="<?php the_author(); ?>">
				</a>
			<?php endif; ?>

			<?php if ( $attrs['showAuthor'] ) : ?>
				<div class="pd-post-author-info">
					<span>
						<?php esc_html_e( 'By ', 'post-designer' ); ?>
					</span>
					<strong>
						<?php the_author(); ?>
					</strong>
				</div>
			<?php endif; ?>
		</div>
	</div>
	<?php endif; ?>

	<?php
		// Extends post designer.
		$after_footer_content = apply_filters( 'pd_post_after_footer', '', get_the_ID() );

		$allowed_tags = array(
			'div'    => array(
				'class' => array(),
			),
			'del'    => array(
				'aria-hidden' => array(),
			),
			'span'   => array(
				'class'       => array(),
				'aria-hidden' => array(),
			),
			'bdi'    => array(),
			'ins'    => array(),
			'form'   => array(
				'class'   => array(),
				'action'  => array(),
				'method'  => array(),
				'enctype' => array(),
			),
			'input'  => array(
				'type'         => array(),
				'id'           => array(),
				'class'        => array(),
				'name'         => array(),
				'value'        => array(),
				'title'        => array(),
				'size'         => array(),
				'min'          => array(),
				'max'          => array(),
				'step'         => array(),
				'placeholder'  => array(),
				'inputmode'    => array(),
				'autocomplete' => array(),
			),
			'label'  => array(
				'class' => array(),
				'for'   => array(),
			),
			'button' => array(
				'type'  => array(),
				'name'  => array(),
				'value' => array(),
				'class' => array(),
			),
		);
		echo wp_kses( $after_footer_content, $allowed_tags );
		?>
</div>
