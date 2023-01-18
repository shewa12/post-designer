
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	Panel,
	PanelBody,
	PanelRow,
	__experimentalNumberControl as NumberControl,
	ToggleControl,
	RadioControl,
	SelectControl,
	CheckboxControl,
	__experimentalText as Text,
	__experimentalDivider as Divider,
	TabPanel,
} from '@wordpress/components'

import './editor.scss';
// Custom components
import PostCard from '../components/PostCard';
import PostPlaceholder from '../components/Placeholder';

// Utilities
import defaultOrders, { showColumnPerRow, defaultOrderBy, layouts }  from '../utilities/Utilities';

// Custom hooks
import usePostDesigner from '../hooks/usePostDesigner';

export default function Edit({attributes, setAttributes}) {

	const blockProps = { ...useBlockProps() };

	// Attributes from hook
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
		dateFrom, 
		dateTo,
		postTypes,
		posts,
		loading,
		layout,
		columnPerRow,
		updatePostType,
		termsTemplate,
		updatePostPerPage,
		updateOrders,
		updateOrdersBy,
		toggleNoPagination,
		updateTaxonomy,
		updateLayout,
		updateColumnPerRow,
	} = usePostDesigner(attributes, setAttributes);

	
	const renderPostList = posts.map((post) => {
		return <PostCard post={post}/>
	});

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
					<PanelBody title={ __( 'Query', 'post-designer' ) }>
					<SelectControl
						label={ __('Taxonomy', 'post-designer') }
						value={ taxonomy ? taxonomy : taxonomies[0].value }
						options={ taxonomies }
						onChange={ updateTaxonomy }
					/>
					<Divider></Divider>
						<label className='pd-gb-label'>
							{__('Term', 'post-designer')}
						</label>
						{ termsTemplate() }
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
				<Panel>
					<PanelBody title={ __( 'Sorting', 'post-designer' ) } initialOpen={ false }>
						<RadioControl
							label={ __( 'Order By', 'post-designer' ) }
							selected={ orderBy }
							options={ defaultOrderBy }
							onChange={ updateOrdersBy }
						/>
						<Divider />
						<RadioControl
							label={ __( 'Order', 'post-designer' ) }
							selected={ order }
							options={ defaultOrders }
							onChange={ updateOrders }
						/>
					</PanelBody>
				</Panel>

			</InspectorControls>
			<div className='pd-card-row pd-3-col'>
				{ renderPostList }
			</div>
		</div>
	);
}
