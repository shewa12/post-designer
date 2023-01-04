
import { __ } from '@wordpress/i18n';
import postDesigner from '../API/Instance';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

const { useState, useEffect } = wp.element;

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
import EndPoints from '../API/EndPoints';

export default function Edit({attributes, setAttributes}) {
	// Attributes
	const blockProps = { ...useBlockProps() };
	const {postType,postPerPage, noPagination, taxonomies, author, categories, tags, dateFrom, dateTo} = attributes;

	// States
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [postTypes, setPostTypes] = useState([]);
	const [postTypeState, setPostTypeState] = useState(postType)

	const renderPostList = posts.map((post) => {
		return <PostCard post={post}/>
	});

	/**
	 * Get post lists
	 */
	const getPosts = async () => {
		setLoading(true);
		const response = await postDesigner.get(EndPoints.getPosts,{
			params: {
				post_type: postType
			}
		});
		if (response.statusText === 'OK') {
			setPosts(response.data);
		} else {
			alert(response.statusText)
		}
		setLoading(false)
	}

	/**
	 * Get all registered post types
	 */
	const getPostTypes = async () => {
		setLoading(true);
		const response = await postDesigner.get(EndPoints.getPostTypes, {});
		if (response.statusText === 'OK') {
			setPostTypes(response.data)
		} else {
			alert(response.statusText);
		}
		setLoading(false);
	}

	// Update post per page
	const updatePostPerPage = (value) => {
		setAttributes({postPerPage: value})
	}

	// Toggle pagination
	const toggleNoPagination = (state) => {
		setAttributes({noPagination: state})
	}

	useEffect(() => {
		getPosts();

	}, [postType]);

	useEffect(() => {
		getPostTypes();

	}, []);

	return (
		
		loading ?
		<PostPlaceholder /> :
		<div {...blockProps}>
		{console.log('acb'+attributes.postPerPage)}
			<InspectorControls key={"settings"}>
				<Panel>
					<PanelBody title={__('Post Type', 'post-designer')} initialOpen={ true }>
					<SelectControl
						value={ postType }
						options={ postTypes }
						onChange={ ( postType ) => {
							setAttributes({postType: postType});
							setPostTypeState(postType)
						} }
					/>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody title={__('Pagination', 'post-designer')} initialOpen={ false }>
						<PanelRow>
							<NumberControl
								isShiftStepEnabled={ true }
								onChange={ updatePostPerPage }
								shiftStep={ 1 }
								value={ postPerPage }
								label= {__('Posts per page', 'post-designer')}
								labelPosition={'top'}
							/>
						</PanelRow>
						<Divider />
						<PanelRow>
							<ToggleControl
								label={ __( 'No Pagination', 'post-designer' ) }
								help={ __( 'On only if you want to display all posts together', 'post-designer' ) }
								checked={ noPagination }
								onChange={ toggleNoPagination }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody title={ __( 'Sorting', 'post-designer' ) } initialOpen={ false }>
						<PanelRow>
							<RadioControl
								label={ __( 'Order By', 'post-designer' ) }
								selected={ '' }
								options={ [
									{ label: 'ID', value: 'ID' },
									{ label: 'Title', value: 'Title' },
									{ label: 'Date', value: 'Date' },
								] }
								onChange={ ( value ) => {} }
							/>
						</PanelRow>
						<Divider />
						<PanelRow>
							<RadioControl
								label={ __( 'Order', 'post-designer' ) }
								selected={ '' }
								options={ [
									{ label: 'Latest', value: 'DESC' },
									{ label: 'Oldest', value: 'ASC' },
									{ label: 'Random', value: 'RAND' },
								] }
								onChange={ ( value ) => {} }
							/>
						</PanelRow>
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
