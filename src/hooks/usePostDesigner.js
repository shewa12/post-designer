import { useEffect, useState } from "react";
import postDesigner from "../API/Instance";
import EndPoints from "../API/EndPoints";

function usePostDesigner(attributes, setAttributes) {
	// Attributes
	const {postType, postPerPage, noPagination, order, orderBy, taxonomies, terms, authors, dateFrom, dateTo} = attributes;

	// States
	const [postTypes, setPostTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

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
	 * Get post
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

	useEffect(() => {
		getPostTypes();
	}, []);

	useEffect(() => {
		getPosts();
	}, [postType]);

	return {
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
	};
}

export default usePostDesigner;
