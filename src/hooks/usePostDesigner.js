import { useEffect, useState } from "react";
import postDesigner from "../API/Instance";
import EndPoints from "../API/EndPoints";

function usePostDesigner(postType) {
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

	useEffect(() => {
		getPostTypes();
	}, []);

	useEffect(() => {
		getPosts();
	}, [postType]);

	return {
		postTypes,
		posts,
		loading
	};
}

export default usePostDesigner;
