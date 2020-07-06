import axios from 'axios';

const ipApi = axios.create({
	baseURL: 'http://ip-api.com'
});

export default ipApi;

