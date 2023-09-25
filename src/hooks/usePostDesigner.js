import { useEffect, useState } from "react";
import postDesigner from "../API/Instance";
import EndPoints from "../API/EndPoints";
import Select from "react-select";
import { __ } from "@wordpress/i18n";

let loading = false;
function usePostDesigner(attributes, setAttributes) {
	

	// Attributes
	const {
		postType,
		postPerPage,
		noPagination,
		order,
		orderBy,
		taxonomies,
		taxonomy,
		terms,
		selectedTerms,
		authors,
		dateFrom,
		dateTo,
		layout,
		columnPerRow,
		excerptLength,
		readMoreText,
	} = attributes;

	// States
	const [postTypes, setPostTypes] = useState([]);
	const [posts, setPosts] = useState([]);
	const [postAuthors, setPostAuthors] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [maxNumPages, setMaxNumPages] = useState(1);

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
			params: { "post-type": postType },
		});

		if (response.statusText === "OK") {
			let updatedArr = response.data.map((obj) =>
				Object.assign({}, obj, { value: obj.id, label: obj.display_name })
			);
			setPostAuthors(updatedArr);
		} else {
			alert(response.statusText);
		}
	};

	/**
	 * Get post
	 */
	const getPosts = async () => {
		console.log(`loading 1: ${loading}`);
		loading = true;
		console.log(`loading 2: ${loading}`);
		let authorIds = authors.map((obj) => obj.id).join(",");
		let termIds = selectedTerms.map((obj) => obj.term_id).join(",");

		const response = await postDesigner.get(EndPoints.getPosts, {
			params: {
				"post-type": postType,
				authors: authorIds,
				taxonomy: taxonomy,
				terms: termIds,
				order: order,
				order_by: orderBy,
				no_pagination: noPagination,
				post_per_page: postPerPage,
				paged: currentPage,
				excerpt_length: excerptLength,
				read_more_text: readMoreText,
			},
		});

		if (response.statusText === "OK") {
			// Set pagination
			let { data } = response;
			let pagination = data.length ? data[data.length - 1] : null;

			setMaxNumPages(pagination ? pagination.max_num_pages : 1);

			// Remove pagination object
			data.pop();

			// Set posts
			setPosts(data);
			getPostAuthors();
		} else {
			alert(response.statusText);
		}
		loading = false;
		console.log(`loading3: ${loading}`);
	};

	// Get taxonomies
	const getTaxonomies = async (postType) => {
		const response = await postDesigner.get(EndPoints.getPostTaxonomies, {
			params: {
				"post-type": postType,
			},
		});
		if (response.statusText === "OK") {
			setAttributes({ taxonomies: response.data });
			setAttributes({
				taxonomy: response.data.length ? response.data[0].value : "",
			});
		} else {
			alert(response.statusText);
		}
	};

	const getTerms = async () => {
		const response = await postDesigner.get(EndPoints.getTerms, {
			params: {
				"post-type": postType,
				taxonomy: taxonomy,
			},
		});

		if (response.statusText === "OK") {
			let updatedArr = response.data.map((obj) =>
				Object.assign({}, obj, { value: obj.term_id, label: obj.name })
			);
			setAttributes({ terms: updatedArr });
		} else {
			alert(response.statusText);
		}
	};

	const termsTemplate = () => {
		const options = terms;
		return (
			<Select
				menuPortalTarget={document.body}
				styles={{
					menuPortal: (base) => ({ ...base, zIndex: 9999, border: 0 }),
				}}
				options={options}
				isMulti="true"
				onChange={(terms) => {
					setAttributes({ selectedTerms: terms });
				}}
				value={selectedTerms}
			/>
		);
	};
	const authorsTemplate = () => {
		const options = postAuthors;
		return (
			<Select
				menuPortalTarget={document.body}
				styles={{
					menuPortal: (base) => ({ ...base, zIndex: 9999, border: 0 }),
				}}
				options={options}
				isMulti="true"
				onChange={(authors) => {
					setAttributes({ authors: authors });
				}}
				value={authors}
			/>
		);
	};

	// Manage attributes
	const updatePostType = (value) => {
		setAttributes({ postType: value });
		getPostAuthors();
		getTaxonomies(value);
	};

	const updatePostPerPage = (value) => {
		setAttributes({ postPerPage: value });
	};

	const toggleNoPagination = (state) => {
		setAttributes({ noPagination: state });
	};

	const updateOrders = (selected) => {
		setAttributes({ order: selected });
	};

	const updateOrdersBy = (selected) => {
		setAttributes({ orderBy: selected });
	};

	const updateTaxonomy = (selected) => {
		getTerms();
		setAttributes({ taxonomy: selected });
		setAttributes({ selectedTerms: [] });
	};

	const updateLayout = (selected) => {
		setAttributes({ layout: selected });
	};

	const updateColumnPerRow = (value) => {
		setAttributes({ columnPerRow: value });
	};

	const updateExcerptLength = (value) => {
		setAttributes({ excerptLength: value });
	};

	const updateReadMoreText = (value) => {
		setTimeout(() => {
			setAttributes({ readMoreText: value });
		}, 2000);
	};

	// Get posts whenever these args get update.
	useEffect(() => {
		getPosts();
	}, [
		postType,
		authors,
		selectedTerms,
		taxonomy,
		order,
		orderBy,
		noPagination,
		postPerPage,
		currentPage,
		excerptLength,
		readMoreText,
	]);

	// Get terms.
	useEffect(() => {
		getTerms();
	}, [taxonomy]);

	// Get post types.
	useEffect(() => {
		getPostTypes();
	}, []);

	return {
		loading,
		posts,
		postTypes,
		maxNumPages,
		currentPage,
		setCurrentPage,
		setPosts,
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
		updateExcerptLength,
		updateReadMoreText,
	};
}

export default usePostDesigner;
