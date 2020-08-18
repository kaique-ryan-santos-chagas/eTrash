import axios from 'axios';

const api = axios.create({
	baseURL: 'http://10.0.0.7:3001'
});

export default api;