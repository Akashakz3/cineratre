import axios from 'axios';

export const api = axios.create({ baseURL: '/' });

export function setAuthToken(token) {
	if (token) {
		api.defaults.headers.common.Authorization = `Bearer ${token}`;
		localStorage.setItem('token', token);
	} else {
		delete api.defaults.headers.common.Authorization;
		localStorage.removeItem('token');
	}
}

// initialize from storage
const stored = localStorage.getItem('token');
if (stored) setAuthToken(stored);


