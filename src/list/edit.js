
import { __ } from '@wordpress/i18n';
import { useEffect } from 'react';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	__experimentalNumberControl as NumberControl,
	ToggleControl,
	RadioControl,
	SelectControl,
	__experimentalText as Text,
	__experimentalDivider as Divider,
	ColorPalette,
	BaseControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
	__experimentalInputControl as InputControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from '@wordpress/components'


// Custom components
import PostCard from '../components/PostCard';
import PostPlaceholder from '../components/Placeholder';

// Utilities
import defaultOrders, { showColumnPerRow, defaultOrderBy, layouts }  from '../utilities/Utilities';

// Custom hooks
import usePostDesigner from '../hooks/usePostDesigner';
import Pagination from '../components/Pagination';
import NotFound from '../components/NotFound';

export default function Edit({attributes, setAttributes}) {

	const r = document.querySelector(':root');

	// States
	const blockProps = { ...useBlockProps() };

	// Attributes from hook
	const {
		
		postTypes,
		posts,
		maxNumPages,
		currentPage,
		setCurrentPage,
		updatePostType,
		termsTemplate,
		authorsTemplate,
		updatePostPerPage,
		updateOrders,
		updateOrdersBy,
		toggleNoPagination,
		updateTaxonomy,
		updateLayout,
		updateColumnPerRow,
		updateReadMoreText,
		loading,
	} = usePostDesigner(attributes, setAttributes);

	// Attributes
	const {		
		postType,
		postPerPage,
		noPagination, 
		order, 
		orderBy, 
		taxonomies,
		taxonomy,
		terms, 
		authors,
		postAuthors,
		dateFrom, 
		dateTo,
		layout,
		columnPerRow } = attributes;
	
		
	const renderPostList = () => {
		if (posts.length) {
			return posts.map((post) => {
				return <PostCard post={post} attributes={attributes}/>
			})
		} else {
			return <NotFound text={ __( 'No posts found', 'post-designer') }></NotFound>
		}
	};

	const prepareAvatarBorder = (border) => {
		
		let avatarBorderTop = border.top ?
			`${border.top.width ? border.top.width : '' } ${border.top.style ? border.top.style : ''} ${border.top.color ? border.top.color: ''}` : '';

		if (avatarBorderTop === '') {
			avatarBorderTop = border.width ? border.width : '';
			if (avatarBorderTop !== '') {
				avatarBorderTop = `${avatarBorderTop} ${border.style ? border.style : 'solid'} ${border.color ? border.color : ''}`;
			}
		}

		let avatarBorderRight = border.right ?
			`${border.right.width ? border.right.width : '' } ${border.right.style ? border.right.style : ''} ${border.right.color ? border.right.color: ''}` : '';

		if (avatarBorderRight === '') {
			avatarBorderRight = border.width ? border.width : '';
			if (avatarBorderRight !== '') {
				avatarBorderRight = `${avatarBorderRight} ${border.style ? border.style : 'solid'} ${border.color ? border.color : ''}`;
			}
		}

		let avatarBorderBottom = attributes.avatarBorder.bottom ?
			`${border.bottom.width ? border.bottom.width : '' } ${border.bottom.style ? border.bottom.style : ''} ${border.bottom.color ? border.bottom.color: ''}` : '';

		if (avatarBorderBottom === '') {
			avatarBorderBottom = border.width ? border.width : '';
			if (avatarBorderBottom !== '') {
				avatarBorderBottom = `${avatarBorderBottom} ${border.style ? border.style : 'solid'} ${border.color ? border.color : ''}`;
			}
		}
	
		
		let avatarBorderLeft = border.left ?
			`${border.left.width ? border.left.width : '' } ${border.left.style ? border.left.style : ''} ${border.left.color ? border.left.color: ''}` : '';
		
		
		if (avatarBorderLeft === '') {
			avatarBorderLeft = border.width ? border.width : '';
			if (avatarBorderLeft !== '') {
				avatarBorderLeft = `${avatarBorderLeft} ${border.style ? border.style : 'solid'} ${border.color ? border.color : ''}`;
			}
		}	

		return {
			top: avatarBorderTop,
			left: avatarBorderLeft,
			right: avatarBorderRight,
			bottom: avatarBorderBottom
		}
	}

	useEffect(() => {
		let titlePadding = Object.values(attributes.titlePadding);
		let avatarBorder = prepareAvatarBorder(attributes.avatarBorder);
		
		// Card
		r.style.setProperty('--pd-list-card-background-color', attributes.cardBackgroundColor);
		r.style.setProperty('--pd-list-card-border', `${attributes.cardBorder}px`);
		r.style.setProperty('--pd-list-card-border-radius', `${attributes.cardBorderRadius}px`);

		// Title
		r.style.setProperty('--pd-list-title-color', attributes.titleColor);
		r.style.setProperty('--pd-list-title-font-size', `${attributes.titleFontSize}px`);
		r.style.setProperty('--pd-list-title-padding', titlePadding);

		// Meta
		r.style.setProperty('--pd-list-meta-key-color', attributes.metaKeyColor);
		r.style.setProperty('--pd-list-meta-key-font-size', `${attributes.metaKeyFontSize}px`);

		r.style.setProperty('--pd-list-meta-value-color', attributes.metaValueColor);
		r.style.setProperty('--pd-list-meta-value-font-size', `${attributes.metaValueFontSize}px`);

		// Category
		r.style.setProperty('--pd-list-category-label-color', attributes.categoryLabelColor);
		r.style.setProperty('--pd-list-category-label-font-size', `${attributes.categoryLabelFontSize}px`);

		r.style.setProperty('--pd-list-category-value-color', attributes.categoryValueColor);
		r.style.setProperty('--pd-list-category-value-font-size', `${attributes.categoryValueFontSize}px`);

		// Excerpt
		r.style.setProperty('--pd-list-excerpt-color', attributes.excerptColor);
		r.style.setProperty('--pd-list-excerpt-font-size', `${attributes.excerptFontSize}px`);
		r.style.setProperty('--pd-list-read-more-color', attributes.readMoreColor);
		r.style.setProperty('--pd-list-read-more-font-size', `${attributes.readMoreFontSize}px`);

		// Avatar & Author
		r.style.setProperty('--pd-list-avatar-size', `${attributes.avatarSize}px`);

		r.style.setProperty('--pd-list-avatar-border-top', avatarBorder.top);
		r.style.setProperty('--pd-list-avatar-border-right', avatarBorder.right);
		r.style.setProperty('--pd-list-avatar-border-left', avatarBorder.left);
		r.style.setProperty('--pd-list-avatar-border-bottom', avatarBorder.bottom);

		r.style.setProperty('--pd-list-avatar-border-radius', `${attributes.avatarBorderRadius}%`);
		r.style.setProperty('--pd-list-author-name-color', attributes.authorNameColor);
		r.style.setProperty('--pd-list-author-name-font-size', `${attributes.authorNameFontSize}px`);

	  }, []);

	return (
		<div {...blockProps}>
			<InspectorControls key={"settings"}>
				<Panel>
					<PanelBody title={__('General', 'post-designer')} initialOpen={ true }>
					<SelectControl
						label={ __('Post Type', 'post-designer') }
						value={ postType }
						options={ postTypes }
						onChange={ updatePostType }
					/>
					<Divider></Divider>
					<SelectControl
						label={ __('Layouts', 'post-designer') }
						value={ layout }
						options={ layouts }
						onChange={ updateLayout }
					/>
					<Divider></Divider>
					<SelectControl
						label={ __('Column per Row', 'post-designer') }
						value={ columnPerRow }
						options={ showColumnPerRow }
						onChange={ updateColumnPerRow }
					/>
					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={ __( 'Query', 'post-designer' ) } initialOpen={ false }>
					<label className='pd-gb-label'>
							{__('Authors', 'post-designer')}
					</label>
					{ authorsTemplate() }
					<Divider></Divider>
					<SelectControl
						label={ __('Taxonomy', 'post-designer') }
						value={ taxonomy ? taxonomy : taxonomies.length ? taxonomies[0].value: '' }
						options={ taxonomies }
						onChange={ updateTaxonomy }
					/>
					<Divider></Divider>
						<label className='pd-gb-label'>
							{__('Term', 'post-designer')}
						</label>
						{ termsTemplate() }
					
					<Divider></Divider>
					{/* sorting */}
					<RadioControl
						label={ __( 'Order By', 'post-designer' ) }
						selected={ orderBy }
						options={ defaultOrderBy }
						onChange={ updateOrdersBy }
					/>
					<Divider></Divider>
					<RadioControl
						label={ __( 'Order', 'post-designer' ) }
						selected={ order }
						options={ defaultOrders }
						onChange={ updateOrders }
					/>
					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={__('Pagination', 'post-designer')} initialOpen={ false }>
						<NumberControl
							isShiftStepEnabled={ true }
							onChange={ updatePostPerPage }
							shiftStep={ 1 }
							value={ postPerPage }
							label= {__('Posts per page', 'post-designer')}
							labelPosition={'top'}
						/>
						<Divider />
						<ToggleControl
							label={ __( 'No Pagination', 'post-designer' ) }
							help={ __( 'On only if you want to display all posts together', 'post-designer' ) }
							checked={ noPagination }
							onChange={ toggleNoPagination }
						/>
					</PanelBody>
				</Panel>

				{/* style controls */}
				<Panel>
					<PanelBody
					initialOpen={ false }
					title={ __('Card', 'post-designer') }
					>

						<BaseControl
						label={ __('Background Color', 'post-designer') }
						>
							<ColorPalette
							value={ attributes.cardBackgroundColor }
							onChange={ ( color ) => {
								
								setAttributes({cardBackgroundColor: color})
								r.style.setProperty('--pd-list-card-background-color', color);
							} }
							/>
						</BaseControl>

						<Divider />

						<RangeControl
							initialPosition={attributes.cardBorder}
							label={ __('Border', 'post-designer') } 
							max={100}
							min={0}
							onChange={
								(value) => {
									setAttributes({cardBorder: value});
									r.style.setProperty('--pd-list-card-border', `${value}px`);
								}
							}
						/>

						<Divider />

						<RangeControl
							initialPosition={attributes.cardBorderRadius}
							label={ __('Border Radius', 'post-designer') } 
							max={100}
							min={0}
							onChange={
								(value) => {
									setAttributes({cardBorderRadius: value});
									r.style.setProperty('--pd-list-card-border-radius', `${value}px`);
								}
							}
						/>

					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody
					initialOpen={false}
					title={ __('Thumbnail', 'post-designer') }
					>
						<ToggleControl
							checked={attributes.showThumbnail}
							label={ __('Show Thumbnail', 'post-designer') }
							onChange={
								(value) => {
									setAttributes({showThumbnail: value})
								}
							}
						/>

					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody
					title={ __('Title', 'post-designer') }
					initialOpen={ false }>

						<ToggleControl
							checked={attributes.showTitle}
							label={ __('Show', 'post-designer') }
							onChange={
								(value) => {
									setAttributes({showTitle: value})
								}
							}
						/>

						<Divider/>

						<BaseControl
						label={ __('Color', 'post-designer') }
						>
							<ColorPalette
								value={attributes.titleColor}
								onChange= { (value) => { 
									setAttributes({titleColor: value});
									r.style.setProperty('--pd-list-title-color', value);
								} }
							/>
						</BaseControl>

						<Divider />

						<RangeControl
							initialPosition={ attributes.titleFontSize }
							label={ __('Font Size', 'post-designer') }
							max={100}
							min={0}
							onChange={ (value) => {
								setAttributes({titleFontSize: value});
								r.style.setProperty('--pd-list-title-font-size', `${value}px`);
							} }
						/>

						<Divider />

						<BoxControl
							values={ attributes.titlePadding }
							onChange={ ( nextValues ) => {
								let values = Object.values(nextValues).filter(v => v)
								
								setAttributes({titlePadding: nextValues})
								r.style.setProperty('--pd-list-title-padding', Object.values(values));
							} }
						/>

					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={__('Meta', 'post-designer')} initialOpen={ false }>

						<ToggleControl
							label={ __( 'Show Meta', 'post-designer' ) }
							help={ __( 'Show post meta', 'post-designer' ) }
							checked={ attributes.showMeta }
							onChange={
								(value) => {
									setAttributes( { showMeta: value } )
								}
							}
						/>

						{
							attributes.showMeta ?
							<div>					
								<BaseControl
								label={ __('Label Color', 'post-designer') }
								>
									<ColorPalette
										value={attributes.metaKeyColor}
										onChange= { (value) => { 
											setAttributes({metaKeyColor: value});
											r.style.setProperty('--pd-list-meta-key-color', value);
										} }
									/>
								</BaseControl>

								<RangeControl
									initialPosition={ attributes.metaKeyFontSize }
									label={ __('Label Font Size', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({metaKeyFontSize: value});
										r.style.setProperty('--pd-list-meta-key-font-size', `${value}px`);
									} }
								/>

								<Divider />

								<BaseControl
								label={ __('Value Color', 'post-designer') }
								>
									<ColorPalette
										value={attributes.metaValueColor}
										onChange= { (value) => { 
											setAttributes({metaValueColor: value});
											r.style.setProperty('--pd-list-meta-value-color', value);
										} }
									/>
								</BaseControl>

								<RangeControl
									initialPosition={ attributes.metaValueFontSize }
									label={ __('Value Font Size', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({metaValueFontSize: value});
										r.style.setProperty('--pd-list-meta-value-font-size', `${value}px`);
									} }
								/>
							</div>
							: ''
						}
					</PanelBody>

				</Panel>
				
				{/* Category panel  */}
				<Panel>
					<PanelBody title={ __('Category', 'post-designer') } initialOpen={false}>

						<ToggleControl
							label={ __( 'Show Category', 'post-designer' ) }
							checked={ attributes.showCategory }
							onChange={
								(value) => {
									setAttributes( { showCategory: value } )
								}
							}
						/>

						{
							attributes.showCategory ?
							<div>
								<BaseControl label={ __('Label Color', 'post-designer') }>
									<ColorPalette
										value={attributes.categoryLabelColor}
										onChange= { (value) => { 
											setAttributes({categoryLabelColor: value});
											r.style.setProperty('--pd-list-category-label-color', value);
										} }
									/>
								</BaseControl>

								<RangeControl
									initialPosition={ attributes.categoryLabelFontSize }
									label={ __('Label Font Size', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({categoryLabelFontSize: value});
										r.style.setProperty('--pd-list-category-label-font-size', `${value}px`);
									} }
								/>

								<Divider />

								<BaseControl label={ __('Category Color', 'post-designer') }>
									<ColorPalette
										value={attributes.categoryValueColor}
										onChange= { (value) => { 
											setAttributes({categoryValueColor: value});
											r.style.setProperty('--pd-list-category-value-color', value);
										} }
									/>
								</BaseControl>

								<RangeControl
									initialPosition={ attributes.categoryValueFontSize }
									label={ __('Category Font Size', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({categoryValueFontSize: value});
										r.style.setProperty('--pd-list-category-value-font-size', `${value}px`);
									} }
								/>

							</div>
							: ''
						}
					</PanelBody>
				</Panel>

				{/* Excerpt panel  */}
				<Panel>
					<PanelBody title={ __('Excerpt', 'post-designer') } initialOpen={false}>

						<ToggleControl
							label={ __( 'Show Excerpt', 'post-designer' ) }
							checked={ attributes.showExcerpt }
							onChange={
								(value) => {
									setAttributes( { showExcerpt: value } )
								}
							}
						/>

						{
							attributes.showExcerpt ?
							<div>
								<RangeControl
									initialPosition={ attributes.excerptLength }
									label={ __('Length', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({excerptLength: value});
									} }
								/>

								<BaseControl label={ __('Color', 'post-designer') }>
									<ColorPalette
										value={attributes.excerptColor}
										onChange= { (value) => { 
											setAttributes({excerptColor: value});
											r.style.setProperty('--pd-list-excerpt-color', value);
										} }
									/>
								</BaseControl>

								<RangeControl
									initialPosition={ attributes.excerptFontSize }
									label={ __('Font Size', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({excerptFontSize: value});
										r.style.setProperty('--pd-list-excerpt-font-size', `${value}px`);
									} }
								/>

								<Divider />

								<InputControl
									label={ __('Read More Text', 'post-designer') }
									value={ attributes.readMoreText }
									onChange={ updateReadMoreText }
								/>

								<BaseControl label={ __('Read More Color', 'post-designer') }>
									<ColorPalette
										value={attributes.readMoreColor}
										onChange= { (value) => { 
											setAttributes({readMoreColor: value});
											r.style.setProperty('--pd-list-read-more-color', value);
										} }
									/>
								</BaseControl>

								<RangeControl
									initialPosition={ attributes.readMoreFontSize }
									label={ __('Read More Font Size', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({readMoreFontSize: value});
										r.style.setProperty('--pd-list-read-more-font-size', `${value}px`);
									} }
								/>

							</div>
							: ''
						}
					</PanelBody>
				</Panel>

				{/* Author panel  */}
				<Panel>
					<PanelBody title={ __('Author', 'post-designer') } initialOpen={false}>

						<ToggleControl
							label={ __( 'Show Avatar', 'post-designer' ) }
							checked={ attributes.showAvatar }
							onChange={
								(value) => {
									setAttributes( { showAvatar: value } )
								}
							}
						/>

						{
							attributes.showAvatar ?
							<div>
								<RangeControl
									initialPosition={ attributes.avatarSize }
									label={ __('Avatar Size', 'post-designer') }
									max={500}
									min={10}
									onChange={ (value) => {
										setAttributes({avatarSize: value});
										r.style.setProperty('--pd-list-avatar-size', `${value}px`);
									} }
								/>

								<BorderBoxControl
									label={ __( 'Borders', 'post-signer' ) }
									onChange={ (value) => {
										setAttributes( {avatarBorder: value} );
										let avatarBorder = prepareAvatarBorder(value);
										r.style.setProperty('--pd-list-avatar-border-top', avatarBorder.top);
										r.style.setProperty('--pd-list-avatar-border-left', avatarBorder.left);
										r.style.setProperty('--pd-list-avatar-border-right', avatarBorder.right);
										r.style.setProperty('--pd-list-avatar-border-bottom', avatarBorder.bottom);
									} }
									value={ attributes.avatarBorder }
								/>

								<RangeControl
									initialPosition={ attributes.avatarBorderRadius }
									label={ __('Border Radius (%)', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({avatarBorderRadius: value});
										r.style.setProperty('--pd-list-avatar-border-radius', `${value}%`);
									} }
								/>

							</div>
							: ''
						}

						<Divider />

						<ToggleControl
							label={ __( 'Show Name', 'post-designer' ) }
							checked={ attributes.showAuthor }
							onChange={
								(value) => {
									setAttributes( { showAuthor: value } )
								}
							}
						/>

						{
							attributes.showAuthor ?
							<div>
								<BaseControl label={ __('Name Color', 'post-designer') }>
									<ColorPalette
										value={attributes.authorNameColor}
										onChange= { (value) => { 
											setAttributes({authorNameColor: value});
											r.style.setProperty('--pd-list-author-name-color', value);
										} }
									/>
								</BaseControl>
		
								<RangeControl
									initialPosition={ attributes.authorNameFontSize }
									label={ __('Name Font Size', 'post-designer') }
									max={100}
									min={0}
									onChange={ (value) => {
										setAttributes({authorNameFontSize: value});
										r.style.setProperty('--pd-list-author-name-font-size', `${value}px`);
									} }
								/>
							</div>
						: ''
						}

					</PanelBody>
				</Panel>

			</InspectorControls>
			{
				loading ?
				<PostPlaceholder />: 
				<>
					<div className={`pd-card-row ${ posts.length ? `pd-${columnPerRow}-col` : '' }`}>
					{ renderPostList() }
					</div>

					<Pagination pages={maxNumPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
				</>
			}

		</div>
	);
}
