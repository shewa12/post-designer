
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
} from '@wordpress/components'

import './editor.scss';
// Custom components
import PostCard from '../components/PostCard';
import PostPlaceholder from '../components/Placeholder';

// Utilities
import defaultOrders, { defaultOrderBy }  from '../utilities/Utilities';

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
		terms, 
		authors, 
		dateFrom, 
		dateTo,
		postTypes,
		posts,
		loading,
		updatePostType,
		updatePostPerPage,
		updateOrders,
		updateOrdersBy,
		toggleNoPagination
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
					<PanelBody title={__('Post Type', 'post-designer')} initialOpen={ true }>
					<SelectControl
						value={ postType }
						options={ postTypes }
						onChange={ updatePostType }
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
				<Panel>
					<PanelBody title={ __( 'Query', 'post-designer' ) }>
							
					</PanelBody>
				</Panel>

			</InspectorControls>
			<div className='pd-card-row pd-3-col'>
				{ renderPostList }
			</div>
		</div>
	);
}
