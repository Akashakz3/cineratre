import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-2">CineRate</h1>
			<p className="mb-4 text-gray-700">Discover, rate, and review movies.</p>
			<Link to="/movies" className="inline-block bg-black text-white px-4 py-2 rounded">Browse Movies</Link>
		</div>
	);
}


