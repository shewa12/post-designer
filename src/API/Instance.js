import axios from 'axios';

const baseURL = window.location.origin;
const postDesigner = axios.create({
    baseURL: `${baseURL}/wp-json/post-designer/v1/`
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
export default postDesigner;