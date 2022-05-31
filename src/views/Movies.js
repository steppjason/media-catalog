import React, { useState, useEffect } from "react"

import Movie from "../components/Movie"

function Movies() {

	const [movies, setMovies] = useState(
		{
			page: 1,
			movies: []
		}
	)
	
	function getMovies() {
		fetch(`https://api.themoviedb.org/3/discover/movie?page=${movies.page}&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
			.then(res => res.json())
			.then(data => {
				setMovies(prev => { 
					return {
						page: prev.page + 1,
						list: prev.movies.concat(data.results)
					}
				})
			})			
	}

	useEffect(() => {
		getMovies()
	},[])

	return (
		<div>
			<h2>Movies</h2>
			<button onClick={getMovies}>Load More</button>
			{movies.list.map((movie, index) => <Movie key={index} title={movie.title} />)}
		</div>
	)
}

export default Movies