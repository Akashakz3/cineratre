import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetail() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function load() {
			setLoading(true);
			try {
				const [m, r] = await Promise.all([
					axios.get(`/api/movies/${id}`),
					axios.get(`/api/movies/${id}/reviews`),
				]);
				setMovie(m.data);
				setReviews(r.data);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [id]);

	if (loading || !movie) return <div className="p-4">Loading...</div>;

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<div className="flex flex-col md:flex-row gap-4">
				{movie.posterUrl && (
					<img src={movie.posterUrl} alt={movie.title} className="w-full md:w-64 h-auto rounded" />
				)}
				<div>
					<h1 className="text-3xl font-bold">{movie.title} <span className="text-gray-500 text-xl">({movie.year})</span></h1>
					<div className="text-gray-700 mb-2">{movie.genres?.join(', ')}</div>
					<p className="mb-3">{movie.synopsis}</p>
					{movie.trailerUrl && (
						<div className="aspect-video">
							<iframe className="w-full h-full" src={movie.trailerUrl} title="Trailer" allowFullScreen></iframe>
						</div>
					)}
					<div className="mt-2 text-sm text-gray-700">Cast: {movie.cast?.join(', ')}</div>
					<div className="mt-2">⭐ {movie.averageRating?.toFixed?.(1) || 0} ({movie.ratingsCount || 0} ratings)</div>
				</div>
			</div>

			<h2 className="text-xl font-semibold mt-6 mb-2">Reviews</h2>
			<div className="space-y-2">
				{reviews.length === 0 && <div className="text-gray-500">No reviews yet.</div>}
				{reviews.map((r) => (
					<div key={r._id} className="border rounded p-3">
						<div className="font-semibold">{r.user?.name || 'User'} • ⭐ {r.rating}</div>
						<div className="text-sm">{r.text}</div>
						<div className="text-xs text-gray-500">Upvotes: {r.upvotes}</div>
					</div>
				))}
			</div>
		</div>
	);
}


