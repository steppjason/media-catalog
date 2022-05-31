import React, { useState, useEffect, useRef, useCallback } from "react"

import Movie from "../components/Movie"

function Movies(props) {

	const [movies, setMovies] = useState(
		{
			page: 1,
			list: []
		}
	)

	const getMovies = useCallback(() => {
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
	}, [movies.page])

	const observer = useRef()
	const lastMovieElement = useCallback(node => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(element => {
			if (element[0].isIntersecting) {
				console.log("visible")
				getMovies()
			}
		})
		if(node) observer.current.observe(node)
	},[getMovies])
	
	useEffect(() => {
		getMovies()
	},[]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<h1>Movies</h1>
			<div className="movies">
				{movies.list.map((movie, index) => {
					if (index >= movies.list.length - 1)
						return <div ref={lastMovieElement} key={index}><Movie title={movie.title} image={props.config.images.base_url + 'w400' + movie.poster_path} /></div>
					else
						return <div key={index}><Movie title={movie.title} image={props.config.images.base_url + 'w400' + movie.poster_path} /></div>
				})}
			</div>
		</div>
	)
}

export default Movies