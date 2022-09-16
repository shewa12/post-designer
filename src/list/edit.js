/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the className name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const blockProps = { ...useBlockProps() };
	const {postType, author, categories, tags, dateFrom, dateTo} = attributes;
	
	return (
		
		<div {...blockProps}>
			<div className="tutor-card tutor-course-card">
				<div className="tutor-course-thumbnail">
					<a href="" className="tutor-d-block">
						<div className="tutor-ratio tutor-ratio-16x9">
							<img className="tutor-card-image-top" src="http://localhost/pmpro/wp-content/uploads/2022/08/logo-1.jpg" alt="" loading="lazy" />
						</div>
					</a>
				</div>
				<div className="tutor-card-body">
					<h3 className="tutor-course-name tutor-fs-5 tutor-fw-medium" title="Woocommerce Auto Cancel">
						<a href="<?php the_permalink(); ?>" target="_parent">
							Course title
						</a>
					</h3>

					<div className="tutor-meta tutor-mt-12 tutor-mb-20">
						<div>
							<span className="tutor-meta-icon tutor-icon-user-line" area-hidden="true"></span>
							<span className="tutor-meta-value"></span>
						</div>
						<div>
							<span className="tutor-icon-clock-line tutor-meta-icon" area-hidden="true"></span>
							<span className="tutor-meta-value"></span>
						</div>
					</div>
				</div>
				<div className="tutor-card-footer">
					<a href="<?php the_permalink(); ?>" className="tutor-btn tutor-btn-outline-primary tutor-btn-md tutor-btn-block " target="_self" onClick={() => {setAttributes({postType: 'abc'})}}>
						View Details
					</a>
				</div>
			</div>

		</div>
	);
}
