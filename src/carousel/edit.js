
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
	PanelRow
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

	// Update styles
	const {
		showTitle,
		titleColor,
		titlePadding,
		metaKeyColor,
		metaValueColor
	} = attributes;

	useEffect(() => {
		var r = document.querySelector(':root');
		setAttributes({titleColor: titleColor});
		setAttributes({metaKeyColor: metaKeyColor});
		setAttributes({metaValueColor: metaValueColor});
		
		r.style.setProperty('--pd-title-color', titleColor);
		r.style.setProperty('--pd-meta-key-color', metaKeyColor);
		r.style.setProperty('--pd-meta-value-color', metaValueColor);
	  }, [titleColor, metaKeyColor, metaValueColor]);

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

				<Panel>
					<PanelBody
					title={ __('Title', 'post-designer') }
					initialOpen={ false }>

						<ToggleControl
							checked={showTitle}
							label={ __('Show Title', 'post-designer') }
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
								value={titleColor}
								onChange= { (value) => { setAttributes({titleColor: value}) } }
							/>
						</BaseControl>

						<Divider />

						<RangeControl
							initialPosition={ titlePadding }
							label={ __('Padding', 'post-designer') }
							max={100}
							min={0}
							onChange={() => {}}
						/>

					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={__('Meta Key', 'post-designer')} initialOpen={ false }>
						<BaseControl
						label={ __('Color', 'post-designer') }
						>
							<ColorPalette
								value={metaKeyColor}
								onChange= { (value) => { setAttributes({metaKeyColor: value}) } }
							/>
						</BaseControl>
					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={ __('Meta Value', 'post-designer') } initialOpen={ false }>
						<BaseControl
						label={ __('Color', 'post-designer') }
						>
							<ColorPalette
								value={metaValueColor}
								onChange= { (value) => { setAttributes({metaValueColor: value}) } }
							/>
						</BaseControl>
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
