import axios from 'axios';

const baseURL = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE ? import.meta.env.VITE_API_BASE : '/';
export const api = axios.create({ baseURL });

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


