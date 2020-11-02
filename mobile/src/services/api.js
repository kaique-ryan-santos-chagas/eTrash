import axios from 'axios';

const api = axios.create({
	baseURL: 'https://etrash.herokuapp.com'
});

export default api;