
import { __ } from '@wordpress/i18n';
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
} from '@wordpress/components'


// Custom components
import PostCard from '../components/PostCard';
import PostPlaceholder from '../components/Placeholder';

// Utilities
import defaultOrders, { defaultOrderBy, layouts }  from '../utilities/Utilities';

// Custom hooks
import usePostDesigner from '../hooks/usePostDesigner';

// Slick slider
import Slider from "react-slick";
import "./edit.scss";
import { useEffect } from 'react';

export default function Edit({attributes, setAttributes}) {
	const r = document.querySelector(':root');

	// States
	const blockProps = { ...useBlockProps() };

	// Attributes from hook
	const { 
		posts,
		updatePostType,
		termsTemplate,
		authorsTemplate,
		updatePostPerPage,
		updateOrders,
		updateOrdersBy,
		updateTaxonomy,
		updateLayout,
		updateReadMoreText
	} = usePostDesigner(attributes, setAttributes);

	// Attributes
	const {		
		postType,

		order, 
		orderBy, 
		taxonomies,
		taxonomy,
		dots,
		infinite,
		autoplay,
		centerMode,
		speed,
		postPerPage,
		slidesToScroll,
		arrows,
		focusOnSelect,
		initialSlide,
		rtl,
		terms, 
		authors,
		postAuthors,
		dateFrom, 
		dateTo,
		postTypes,
		loading,
		layout,
		} = attributes;
	
	const sliderSettings = {
		slidesToShow: Number(postPerPage),
		slidesToScroll,
		infinite,
		autoplay,
		speed,
		centerMode,
		initialSlide,
		dots,
		arrows,
		focusOnSelect,
		rtl,
	};

	const renderPostList = () => {
		return posts.map((post) => {
			return <PostCard post={post} attributes={attributes}/>
		})
	};

	useEffect(() => {
		let titlePadding = Object.values(attributes.titlePadding);

		// Card
		r.style.setProperty('--pd-card-background-color', attributes.cardBackgroundColor);
		r.style.setProperty('--pd-card-border', `${attributes.cardBorder}px`);
		r.style.setProperty('--pd-card-border-radius', `${attributes.cardBorderRadius}px`);

		// Title
		r.style.setProperty('--pd-title-color', attributes.titleColor);
		r.style.setProperty('--pd-title-font-size', `${attributes.titleFontSize}px`);
		r.style.setProperty('--pd-title-padding', titlePadding);

		// Meta
		r.style.setProperty('--pd-meta-key-color', attributes.metaKeyColor);
		r.style.setProperty('--pd-meta-key-font-size', `${attributes.metaKeyFontSize}px`);

		r.style.setProperty('--pd-meta-value-color', attributes.metaValueColor);
		r.style.setProperty('--pd-meta-value-font-size', `${attributes.metaValueFontSize}px`);

		// Category
		r.style.setProperty('--pd-category-label-color', attributes.categoryLabelColor);
		r.style.setProperty('--pd-category-label-font-size', `${attributes.categoryLabelFontSize}px`);

		r.style.setProperty('--pd-category-value-color', attributes.categoryValueColor);
		r.style.setProperty('--pd-category-value-font-size', `${attributes.categoryValueFontSize}px`);

		// Excerpt
		r.style.setProperty('--pd-excerpt-color', attributes.excerptColor);
		r.style.setProperty('--pd-excerpt-font-size', `${attributes.excerptFontSize}px`);
		r.style.setProperty('--pd-read-more-color', attributes.readMoreColor);
		r.style.setProperty('--pd-read-more-font-size', `${attributes.readMoreFontSize}px`);

	  }, []);

	return (
		loading ?
		
		<PostPlaceholder /> :
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
					<PanelBody title={__('Carousel Settings', 'post-designer')} initialOpen={ false }>
						{/* slide show per page */}
						<NumberControl
							isShiftStepEnabled={ true }
							onChange={ updatePostPerPage }
							shiftStep={ 1 }
							value={ postPerPage }
							label= {__('Slide to Show', 'post-designer')}
							labelPosition={'top'}
						/>

						<Divider />

						<NumberControl
							isShiftStepEnabled={ true }
							onChange={
								(value) => { 
									setAttributes({slidesToScroll: value}) 
								} 
							}
							shiftStep={ 1 }
							value={ slidesToScroll }
							label= {__('Slide to Scroll', 'post-designer')}
							labelPosition={'top'}
						/>
					
						<Divider />

						<NumberControl
							isShiftStepEnabled={ true }
							onChange={
								(value) => { 
									setAttributes({initialSlide: value}) 
								} 
							}
							shiftStep={ 1 }
							value={ initialSlide }
							label= {__('First Slide', 'post-designer')}
							labelPosition={'top'}
						/>

						<Divider />

						<ToggleControl
							label={ __( 'Infinite Loop', 'post-designer' ) }
							help={ __( 'Let the carousel rotating infinitely', 'post-designer' ) }
							checked={ infinite }
							onChange={
								(value) => {
									setAttributes( { infinite: value } )
								}
							}
						/>

						<Divider />

						<ToggleControl
							label={ __( 'Auto Play', 'post-designer' ) }
							checked={ autoplay }
							onChange={
								(value) => {
									setAttributes( { autoplay: value } )
								}
							}
						/>

						<Divider />

						<NumberControl
							label= {__('Rotation Speed', 'post-designer')}
							labelPosition={'top'}
							isShiftStepEnabled={ true }
							onChange={
								(value) => { 
									setAttributes({speed: value}) 
								} 
							}
							shiftStep={ 100 }
							value={ speed }
						/>

						<Divider />

						<ToggleControl
							label={ __( 'Center Slide', 'post-designer' ) }
							checked={ centerMode }
							onChange={
								(value) => {
									setAttributes( { centerMode: value } )
								}
							}
						/>

						<Divider />

						<ToggleControl
							label={ __( 'Show Dots', 'post-designer' ) }
							checked={ dots }
							onChange={
								(value) => {
									setAttributes( { dots: value } )
								}
							}
						/>

						<Divider />
	
						<ToggleControl
							label={ __( 'Show Arrows', 'post-designer' ) }
							checked={ arrows }
							onChange={
								(value) => {
									setAttributes( { arrows: value } )
								}
							}
						/>

						<Divider />

						<ToggleControl
							label={ __( 'Focus on Select', 'post-designer' ) }
							checked={ focusOnSelect }
							onChange={
								(value) => {
									setAttributes( { focusOnSelect: value } )
								}
							}
						/>

						<Divider />

						<ToggleControl
							label={ __( 'RTL', 'post-designer' ) }
							checked={ rtl }
							onChange={
								(value) => {
									setAttributes( { rtl: value } )
								}
							}
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
								console.log(`color: ${color}`);
								setAttributes({cardBackgroundColor: color})
								r.style.setProperty('--pd-card-background-color', color);
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
									r.style.setProperty('--pd-card-border', `${value}px`);
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
									r.style.setProperty('--pd-card-border-radius', `${value}px`);
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
									r.style.setProperty('--pd-title-color', value);
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
								r.style.setProperty('--pd-title-font-size', `${value}px`);
							} }
						/>

						<Divider />

						<BoxControl
							values={ attributes.titlePadding }
							onChange={ ( nextValues ) => {
								let values = Object.values(nextValues).filter(v => v)
								
								setAttributes({titlePadding: nextValues})
								r.style.setProperty('--pd-title-padding', Object.values(values));
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
											r.style.setProperty('--pd-meta-key-color', value);
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
										r.style.setProperty('--pd-meta-key-font-size', `${value}px`);
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
											r.style.setProperty('--pd-meta-value-color', value);
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
										r.style.setProperty('--pd-meta-value-font-size', `${value}px`);
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
											r.style.setProperty('--pd-category-label-color', value);
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
										r.style.setProperty('--pd-category-label-font-size', `${value}px`);
									} }
								/>

								<Divider />

								<BaseControl label={ __('Category Color', 'post-designer') }>
									<ColorPalette
										value={attributes.categoryValueColor}
										onChange= { (value) => { 
											setAttributes({categoryValueColor: value});
											r.style.setProperty('--pd-category-value-color', value);
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
										r.style.setProperty('--pd-category-value-font-size', `${value}px`);
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
											r.style.setProperty('--pd-excerpt-color', value);
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
										r.style.setProperty('--pd-excerpt-font-size', `${value}px`);
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
											r.style.setProperty('--pd-read-more-color', value);
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
										r.style.setProperty('--pd-read-more-font-size', `${value}px`);
									} }
								/>

							</div>
							: ''
						}
					</PanelBody>
				</Panel>

			</InspectorControls>
			<div className={`pd-card-row`}>
				<Slider {...sliderSettings}>
					{ renderPostList() }
				</Slider>
			</div>

		</div>
	);
}
