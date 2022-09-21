
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
} from '@wordpress/components'

import './editor.scss';


export default function Edit({attributes, setAttributes}) {
	const blockProps = { ...useBlockProps() };
	const {postType, author, categories, tags, dateFrom, dateTo} = attributes;
	
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
				<div className="pd-card pd-course-card">
					<div className="pd-course-thumbnail">
						<a href="#" className="pd-d-block">
							<div className="pd-ratio pd-ratio-16x9">
								<img className="pd-card-image-top" src="http://localhost/pmpro/wp-content/uploads/2022/08/logo-1.jpg" alt="" loading="lazy" />
							</div>
						</a>
					</div>
					<div className="pd-card-body">
						<h3 className="pd-course-name pd-fs-5 pd-fw-medium" title="Woocommerce Auto Cancel">
							<a href="#" target="_parent">
								Course title
							</a>
						</h3>

						<div className="pd-meta pd-mt-12 pd-mb-20">
							<div>
								<span className="pd-meta-icon pd-icon-user-line" area-hidden="true"></span>
								<span className="pd-meta-value"></span>
							</div>
							<div>
								<span className="pd-icon-clock-line pd-meta-icon" area-hidden="true"></span>
								<span className="pd-meta-value"></span>
							</div>
						</div>
					</div>
					<div className="pd-card-footer">
						<a href="#" className="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self" onClick={() => {setAttributes({postType: 'abc'})}}>
							View Details
						</a>
					</div>
				</div>
				<div className="pd-card pd-course-card">
					<div className="pd-course-thumbnail">
						<a href="#" className="pd-d-block">
							<div className="pd-ratio pd-ratio-16x9">
								<img className="pd-card-image-top" src="http://localhost/pmpro/wp-content/uploads/2022/08/logo-1.jpg" alt="" loading="lazy" />
							</div>
						</a>
					</div>
					<div className="pd-card-body">
						<h3 className="pd-course-name pd-fs-5 pd-fw-medium" title="Woocommerce Auto Cancel">
							<a href="#" target="_parent">
								Course title
							</a>
						</h3>

						<div className="pd-meta pd-mt-12 pd-mb-20">
							<div>
								<span className="pd-meta-icon pd-icon-user-line" area-hidden="true"></span>
								<span className="pd-meta-value"></span>
							</div>
							<div>
								<span className="pd-icon-clock-line pd-meta-icon" area-hidden="true"></span>
								<span className="pd-meta-value"></span>
							</div>
						</div>
					</div>
					<div className="pd-card-footer">
						<a href="#" className="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self" onClick={() => {setAttributes({postType: 'abc'})}}>
							View Details
						</a>
					</div>
				</div>
				<div className="pd-card pd-course-card">
					<div className="pd-course-thumbnail">
						<a href="#" className="pd-d-block">
							<div className="pd-ratio pd-ratio-16x9">
								<img className="pd-card-image-top" src="http://localhost/pmpro/wp-content/uploads/2022/08/logo-1.jpg" alt="" loading="lazy" />
							</div>
						</a>
					</div>
					<div className="pd-card-body">
						<h3 className="pd-course-name pd-fs-5 pd-fw-medium" title="Woocommerce Auto Cancel">
							<a href="#" target="_parent">
								Course title
							</a>
						</h3>

						<div className="pd-meta pd-mt-12 pd-mb-20">
							<div>
								<span className="pd-meta-icon pd-icon-user-line" area-hidden="true"></span>
								<span className="pd-meta-value"></span>
							</div>
							<div>
								<span className="pd-icon-clock-line pd-meta-icon" area-hidden="true"></span>
								<span className="pd-meta-value"></span>
							</div>
						</div>
					</div>
					<div className="pd-card-footer">
						<a href="#" className="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self" onClick={() => {setAttributes({postType: 'abc'})}}>
							View Details
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
