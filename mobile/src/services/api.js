import axios from 'axios';

const api = axios.create({
	baseURL: 'https://e-trash.herokuapp.com'
});

export default api;