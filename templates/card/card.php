<?php
/**
 * Card template
 *
 * @since v1.0.0
 * @package PostDesigner\Templates
 */

$meta_data         = PostDesigner::plugin_data();
$default_thumbnail = $meta_data['assets'] . 'images/thumbnail.svg';
$author_avatar_url = get_avatar_url(
	get_the_author_meta( 'ID' ),
	array( 'size' => 50, 'default' => 'mysteryman' )
);
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

		<?php if ( $attrs['showCategory'] ) : ?>
			<div class="pd-post-categories">
				<span class="pd-post-category-key">
					<?php esc_html_e( 'In:', 'post-designer' ); ?>
				</span>
				<div class="pd-post-category-value">
					<?php the_category( ',' ); ?>
				</div>
			</div>
		<?php endif; ?>

		<div class="pd-post-content">
			<p>
			  <?php the_excerpt(); ?>  
			</p>
		</div>
	</div>
	<div class="pd-card-footer">
		<div class="pd-post-author">
			<a href="#" class="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self">
				<img src="<?php echo esc_url( $author_avatar_url ) ?>" alt="<?php the_author(); ?>">
			</a>
			<div class="pd-post-author-info">
				<strong>
					<?php the_author(); ?>
				</strong>
			</div>
		</div>
	</div>
</div>
