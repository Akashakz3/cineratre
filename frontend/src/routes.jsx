import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MoviesList from './pages/MoviesList.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

export const router = createBrowserRouter([
	{ path: '/', element: <Home /> },
	{ path: '/movies', element: <MoviesList /> },
	{ path: '/movie/:id', element: <MovieDetail /> },
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <Signup /> },
]);


