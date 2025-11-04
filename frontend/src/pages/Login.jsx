import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, setAuthToken } from '../lib/api';

export default function Login() {
	const nav = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const res = await api.post('/api/auth/login', { email, password });
			setAuthToken(res.data.token);
			nav('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="p-6 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			<form onSubmit={submit} className="space-y-3">
				<input className="border p-2 rounded w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
				<input className="border p-2 rounded w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<button disabled={loading} className="bg-black text-white px-4 py-2 rounded">{loading ? '...' : 'Login'}</button>
			</form>
			<div className="text-sm mt-3">No account? <Link className="underline" to="/signup">Sign up</Link></div>
		</div>
	);
}


