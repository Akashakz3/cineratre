import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, setAuthToken } from '../lib/api';

export default function Signup() {
	const nav = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const res = await api.post('/api/auth/signup', { name, email, password });
			setAuthToken(res.data.token);
			nav('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Signup failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="p-6 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Sign up</h1>
			<form onSubmit={submit} className="space-y-3">
				<input className="border p-2 rounded w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
				<input className="border p-2 rounded w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
				<input className="border p-2 rounded w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<button disabled={loading} className="bg-black text-white px-4 py-2 rounded">{loading ? '...' : 'Create account'}</button>
			</form>
			<div className="text-sm mt-3">Have an account? <Link className="underline" to="/login">Login</Link></div>
		</div>
	);
}


