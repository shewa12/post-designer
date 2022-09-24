
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
	const {postType, author, categories, tags, dateFrom, dateTo} = attributes;
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const renderPostList = posts.map((post) => {
		return <PostCard post={post}/>
	});

	useEffect(() => {
		const getPosts = async () => {
			const response = await postDesigner.get(getPostsEndPoint,{});
			if (response.statusText === 'OK') {
				setPosts(response.data);
			} else {
				alert(response.statusText)
			}
			setLoading(false)
		}
		getPosts();
	}, []);
	return (

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
					<PanelBody title={ __( 'Sorting & Filtering', 'post-designer' ) } initialOpen={ false }>
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
						<SelectControl
							label={ __( 'Categories', 'post-designer' ) }
							value={ '' }
							options={ [
								{ label: __( 'ID', 'post-designer' ), value: 'ID' },
								{ label: __( 'Title', 'post-designer' ), value: 'post_title' },
								{ label: __( 'Date', 'post-designer' ), value: 'post_date' },
							] }
							multiple= { true }
							onChange={ ( value ) => {} }
						/>
						<SelectControl
							label={ __( 'Authors', 'post-designer' ) }
							value={ '' }
							options={ [
								{ label: __( 'ID', 'post-designer' ), value: 'ID' },
								{ label: __( 'Title', 'post-designer' ), value: 'post_title' },
								{ label: __( 'Date', 'post-designer' ), value: 'post_date' },
							] }
							multiple={ true }
							onChange={ ( value ) => {} }
						/>
					</PanelBody>
				</Panel>

			</InspectorControls>
			<div className='pd-row' style={{display: 'flex', justifyContent: 'space-between', gap: '20px'}}>
				{ loading ? <PostPlaceholder /> : renderPostList }
			</div>
		</div>
	);
}
