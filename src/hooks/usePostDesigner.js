import { useEffect, useState } from "react";
import postDesigner from "../API/Instance";
import EndPoints from "../API/EndPoints";
import Select from "react-select";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

let loading = false;
function usePostDesigner(attributes, setAttributes) {
	// Attributes
	const {
		postType,
		postPerPage,
		noPagination,
		order,
		orderBy,
		taxonomy,
		terms,
		selectedTerms,
		authors,
		excerptLength,
		readMoreText,
	} = attributes;

	// States
	const [posts, setPosts] = useState([]);
	const [postAuthors, setPostAuthors] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [maxNumPages, setMaxNumPages] = useState(1);

	const postTypes = useSelect((select) => {
		const postTypes = select(coreDataStore).getPostTypes({
			per_page: -1,
			public: true,
		});

		const filter = postTypes?.filter((type) => type.viewable === true);

		return filter?.map((type) => ({
			value: type.slug,
			label: type.name,
		}));
	}, []);

	const taxonomies = useSelect(
		(select) => {
			if (!postType) return [];
			const taxonomies =
				select(coreDataStore).getTaxonomies({ type: postType }) || [];

			return taxonomies?.map((tax) => ({
				value: tax.slug,
				label: tax.name,
			}));
		},
		[postType]
	);

	/**
	 * Get post authors
	 */
	const getPostAuthors = async () => {
		try {
			const response = await postDesigner.get(EndPoints.getPostAuthors, {
				params: { "post-type": postType },
			});

			if (response.status === 200) {
				const updatedArr = response.data.map((obj) => ({
					...obj,
					value: obj.id,
					label: obj.display_name,
				}));
				setPostAuthors(updatedArr);
			} else {
				alert(__("Failed to fetch authors", "post-designer"));
			}
		} catch (error) {
			alert(error.message || __("Failed to fetch authors", "post-designer"));
		}
	};

	/**
	 * Get post
	 */
	const getPosts = async () => {
		loading = true;
		try {
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

			// Safe: if request is successful, it will be here
			let { data } = response;
			let pagination = data.length ? data[data.length - 1] : null;

			setMaxNumPages(pagination ? pagination.max_num_pages : 1);

			data.pop();
			setPosts(data);
			getPostAuthors();
		} catch (error) {
			alert(error.message || __("Failed to fetch posts", "post-designer"));
		} finally {
			loading = false;
		}
	};

	const getTerms = async () => {
		try {
			const response = await postDesigner.get(EndPoints.getTerms, {
				params: {
					"post-type": postType,
					taxonomy: taxonomy,
				},
			});

			if (response.status === 200) {
				const updatedArr = response.data.map((obj) => ({
					...obj,
					value: obj.term_id,
					label: obj.name,
				}));
				setAttributes({ terms: updatedArr });
			} else {
				alert(__("Failed to fetch terms", "post-designer"));
			}
		} catch (error) {
			alert(error.message || __("Failed to fetch terms", "post-designer"));
		}
	};

	const termsTemplate = () => {
		const options = terms;
		return (
			<Select
				menuPortalTarget={document.body}
				styles={{
					menuPortal: (base) => ({
						...base,
						zIndex: 9999,
						border: 0,
					}),
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
					menuPortal: (base) => ({
						...base,
						zIndex: 9999,
						border: 0,
					}),
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

	return {
		loading,
		posts,
		taxonomies,
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
