
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
} from '@wordpress/components'

import './editor.scss';
// Custom components
import PostCard from '../components/PostCard';
import PostPlaceholder from '../components/Placeholder';


export default function Edit({attributes, setAttributes}) {
	const blockProps = { ...useBlockProps() };
	const getPostsEndPoint = 'get-posts';
	const {postType, taxonomies, author, categories, tags, dateFrom, dateTo} = attributes;
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const renderPostList = posts.map((post) => {
		return <PostCard post={post}/>
	});

	/**
	 * Get post lists
	 */
	const getPosts = async () => {
		const response = await postDesigner.get(getPostsEndPoint,{});
		if (response.statusText === 'OK') {
			setPosts(response.data);
		} else {
			alert(response.statusText)
		}
		setLoading(false)
	}

	useEffect(() => {

		getPosts();
		
	}, []);
	return (
		loading ?
		<PostPlaceholder /> :
		<div {...blockProps}>
			<InspectorControls key={"settings"}>
				<Panel>
					<PanelBody title={__('Post Type', 'post-designer')} initialOpen={ true }>
							<select>
								<option>A</option>
								<option>B</option>
								<option>C</option>
							</select>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody title={__('Pagination', 'post-designer')} initialOpen={ false }>
						<PanelRow>
							<NumberControl
								isShiftStepEnabled={ true }
								onChange={ () => {}}
								shiftStep={ 10 }
								value={ 10}
								label= {__('Posts per page', 'post-designer')}
								labelPosition={'top'}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'No Pagination', 'post-designer' ) }
								help={ __( 'On only if you want to display all posts together', 'post-designer' ) }
								checked={ false }
								onChange={ () => {
									
								} }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody title={ __( 'Sorting', 'post-designer' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Order By ', 'post-designer' ) }
							value={ '' }
							options={ [
								{ label: __( 'ID', 'post-designer' ), value: 'ID' },
								{ label: __( 'Title', 'post-designer' ), value: 'post_title' },
								{ label: __( 'Date', 'post-designer' ), value: 'post_date' },
							] }
							onChange={ ( value ) => {} }
						/>
						<RadioControl
							label={ __( 'Order', 'post-designer' ) }
							selected={ '' }
							options={ [
								{ label: 'DESC', value: 'DESC' },
								{ label: 'ASC', value: 'ASC' },
							] }
							onChange={ ( value ) => {} }
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
