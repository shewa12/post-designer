import { useEffect, useState } from "react";
import postDesigner from "../API/Instance";
import EndPoints from "../API/EndPoints";
import Select from 'react-select'
import { __ } from '@wordpress/i18n';

function usePostDesigner(attributes, setAttributes) {
	// Attributes
	const {postType, postPerPage, noPagination, order, orderBy, taxonomies, taxonomy, terms, selectedTerms, authors, dateFrom, dateTo, layout, columnPerRow} = attributes;

	// States
	const [postTypes, setPostTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [postAuthors, setPostAuthors] = useState([]); 

	/**
	 * Get all registered post types
	 */
	const getPostTypes = async () => {
		const response = await postDesigner.get(EndPoints.getPostTypes, {});
		if (response.statusText === "OK") {
			setPostTypes(response.data);
		} else {
			alert(response.statusText);
		}
	};

	/**
	 * Get post authors
	 */
	const getPostAuthors = async () => {
		const response = await postDesigner.get(EndPoints.getPostAuthors, {
			params: {'post-type': postType}
		});

		if (response.statusText === "OK") {
			let updatedArr = response.data.map(obj => Object.assign({}, obj, {value: obj.id, label: obj.display_name}));
			setPostAuthors(updatedArr);
			
		} else {
			alert(response.statusText);
		}
	};

	/**
	 * Get post
	 */
	const getPosts = async () => {
		setLoading(true);
		const response = await postDesigner.get(EndPoints.getPosts,{
			params: {
				'post-type': postType
			}
		});
		if (response.statusText === 'OK') {
			setPosts(response.data);
		} else {
			alert(response.statusText)
		}
		setLoading(false)
	}

	// Get taxonomies
	const getTaxonomies = async () => {
		setLoading(true);
		const response = await postDesigner.get(EndPoints.getPostTaxonomies,{
			params: {
				'post-type': postType
			}
		});
		if (response.statusText === 'OK') {
			setAttributes({taxonomies: response.data});
			setAttributes({taxonomy: response.data.length ? response.data[0].value : ''})
		} else {
			alert(response.statusText)
		}
		setLoading(false)
	}

	const getTerms = async () => {
		// if (!taxonomy) {
		// 	return;
		// }
		setLoading(true);
		const response = await postDesigner.get(EndPoints.getTerms,{
			params: {
				'post-type': postType,
				'taxonomy': taxonomy
			}
		});

		if (response.statusText === 'OK') {
			let updatedArr = response.data.map(obj => Object.assign({}, obj, {value: obj.term_id, label: obj.name}));
			setAttributes({terms: updatedArr});
		} else {
			alert(response.statusText)
		}
		setLoading(false)
	}

	const termsTemplate = () => {
		const options = terms;
		return (
			<Select
				menuPortalTarget={document.body}
				styles={{ menuPortal: base => ({ ...base, zIndex: 9999, border: 0 }) }}
					options={options} isMulti='true'
				onChange={(terms) => {
					setAttributes({selectedTerms: terms})
				}}
				value={selectedTerms}
			/>
		);
	}
	const authorsTemplate = () => {
		const options = postAuthors;
		return (
			<Select
				menuPortalTarget={document.body}
				styles={{ menuPortal: base => ({ ...base, zIndex: 9999, border: 0 }) }}
					options={options} isMulti='true'
				onChange={(authors) => {
					setAttributes({authors: authors})
				}}
				value={authors}
			/>
		);
	}


	// Manage attributes
	const updatePostType = (value) => {
		setAttributes({postType: value})
	}

	const updatePostPerPage = (value) => {
		setAttributes({postPerPage: value})
	}

	const toggleNoPagination = (state) => {
		setAttributes({noPagination: state})
	}

	const updateOrders = (selected) => {
		setAttributes({order: selected})
	}

	const updateOrdersBy = (selected) => {
		setAttributes({orderBy: selected})
	}	

	const updateTaxonomy = (selected) => {
		setAttributes({taxonomy: selected});
		setAttributes({selectedTerms: []});
	}	

	const updateLayout = (selected) => {
		setAttributes({layout: selected});
	}

	const updateColumnPerRow = (value) => {
		setAttributes({columnPerRow: value});
	}


	// Get terms
	useEffect(() => {
		getTerms();
	}, [taxonomy]);

	useEffect(() => {
		getPostTypes();
	}, []);

	useEffect(() => {
		getPosts();
		getPostAuthors();
		getTaxonomies();
	}, [postType]);

	return {
		posts,
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
	};
}

export default usePostDesigner;
