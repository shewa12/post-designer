
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
} from '@wordpress/components'


// Custom components
import PostCard from '../components/PostCard';
import PostPlaceholder from '../components/Placeholder';

// Utilities
import defaultOrders, { defaultOrderBy, layouts }  from '../utilities/Utilities';

// Custom hooks
import usePostDesigner from '../hooks/usePostDesigner';
import PDColorPalette from '../components/styles/ColorPalette';

// Slick slider
import Slider from "react-slick";
import "./edit.scss";

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
		dots,
		infinite,
		autoplay,
		centerMode,
		speed,
		slidesToShow: Number(postPerPage),
		slidesToScroll,
		arrows,
		focusOnSelect,
		initialSlide,
		rtl,
	};

	const renderPostList = () => {
		return posts.map((post) => {
			return <PostCard post={post}/>
		})
	};

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

					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={__('Styles', 'post-designer')} initialOpen={ false }>
						<PDColorPalette />
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
