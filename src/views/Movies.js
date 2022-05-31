import React, { useState, useEffect } from "react"

import Movie from "../components/Movie"

function Movies(props) {

	const [movies, setMovies] = useState(
		{
			page: 1,
			list: []
		}
	)
	
	function getMovies() {
		fetch(`https://api.themoviedb.org/3/discover/movie?page=${movies.page}&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
			.then(res => res.json())
			.then(data => {
				setMovies(prev => { 
					return {
						page: prev.page + 1,
						list: prev.list.concat(data.results)
					}
				})
			})
	}

	useEffect(() => {
		getMovies()
		console.log(props.config)
	},[])

	return (
		<div>
			<h2>Movies</h2>
			<button onClick={getMovies}>Load More</button>
			<div className="movies">
				{movies.list.map((movie, index) => <Movie key={index} title={movie.title} image={props.config.images.base_url + 'w400' + movie.poster_path} />)}
			</div>
		</div>
	)
}

export default Movies