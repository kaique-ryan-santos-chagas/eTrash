import axios from 'axios';

const ipApi = axios.create({
	baseURL: 'https://ip-api.com/json'
});

export default ipApi;

