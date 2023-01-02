<?php
/**
 * Post list template
 *
 * @package PostDesigner\List
 * @author Shewa <shewa12kpi@gmail.com>
 * @link https://shewazone.com
 * @since 1.0.0
 */

echo '<pre>';
print_r( $attrs );
?>
<div class="wp-block-post-designer-list">
	<div className='pd-card-row pd-3-col'>
		<?php require trailingslashit( __DIR__ ) . 'card/card.php'; ?>
	</div>
</div>

