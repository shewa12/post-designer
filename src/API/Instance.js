import axios from 'axios';

const postDesigner = axios.create({
    baseURL: 'http://localhost/pmpro/wp-json/post-designer/v1/'
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});
export default postDesigner;