import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

export default function MoviesList() {
	const [params, setParams] = useSearchParams();
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);

	const q = params.get('q') || '';
	const genre = params.get('genre') || '';
	const year = params.get('year') || '';

	useEffect(() => {
		async function load() {
			setLoading(true);
			try {
				const res = await axios.get('/api/movies', { params: { q, genre, year } });
				setItems(res.data.items);
				setTotal(res.data.total);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [q, genre, year]);

	function updateParam(key, value) {
		const next = new URLSearchParams(params.toString());
		if (value) next.set(key, value); else next.delete(key);
		setParams(next);
	}

	return (
		<div className="p-4 max-w-6xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Browse Movies</h1>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
				<input className="border p-2 rounded" placeholder="Search title" value={q} onChange={e => updateParam('q', e.target.value)} />
				<input className="border p-2 rounded" placeholder="Genre (e.g. action)" value={genre} onChange={e => updateParam('genre', e.target.value)} />
				<input className="border p-2 rounded" placeholder="Year" value={year} onChange={e => updateParam('year', e.target.value)} />
				<div className="text-sm text-gray-500 self-center">{total} results</div>
			</div>

			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{items.map((m) => (
						<Link key={m._id} to={`/movie/${m._id}`} className="block border rounded overflow-hidden hover:shadow">
							{m.posterUrl ? (
								<img src={m.posterUrl} alt={m.title} className="w-full h-64 object-cover" />
							) : (
								<div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">No Poster</div>
							)}
							<div className="p-2">
								<div className="font-semibold truncate">{m.title}</div>
								<div className="text-sm text-gray-600">{m.year} • {m.genres?.join(', ')}</div>
								<div className="text-sm">⭐ {m.averageRating?.toFixed?.(1) || 0} ({m.ratingsCount || 0})</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}


