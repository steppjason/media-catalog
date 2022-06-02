import React, { useState, useEffect, useRef, useCallback } from "react"

import Movie from "../components/Movie"

function Movies(props) {

	const [movies, setMovies] = useState(
		{
			page: 1,
			list: []
		}
	)

	const [query, setQuery] = useState('')


	const getMovies = useCallback(() => {

		let tempMovies = {
			page: 1,
			list: []
		}

		if (props.query !== query) {
			setQuery(props.query)
		}

		let fetchURL = `https://api.themoviedb.org/3/discover/movie`
		if (props.query !== '')
			fetchURL = `https://api.themoviedb.org/3/search/movie`

		const apiKEY = `?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`

		let page = ''
		if (props.query !== query)
			page = `&page=${tempMovies.page}`
		else 
			page = `&page=${movies.page}`
		
		const queryString = `&query=${encodeURI(props.query)}`

		fetchURL = fetchURL + apiKEY + page
		if (props.query !== '')
			fetchURL = fetchURL + queryString

		try {
			fetch(fetchURL)
				.then(res => res.json())
				.then(data => {
		
					tempMovies = {
						page: 2,
						list: data.results
					}

					if (props.query !== query)
						setMovies(tempMovies)
					else {
						setMovies(prev => {
							return {
								page: prev.page + 1,
								list: prev.list.concat(data.results)
							}
						})
					}
				})
			
		} catch (err) {
			if (err.name === 'AboutError') {
				console.log("Request cancelled")
				return
			}

			console.error(err)
			return err
		}

	}, [movies.page, props.query, query])

	const observer = useRef()
	const lastMovieElement = useCallback(node => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(element => {
			if (element[0].isIntersecting) {
				
				if (props.query !== query) {
					setQuery(props.query)
				}

				getMovies()

			}
		})
		if(node) observer.current.observe(node)
	},[getMovies, props.query, query])
	

	useEffect(() => {
		window.scrollTo(0,0);
		getMovies()
	},[props.query]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<h1>Movies</h1>
			<div className="movies">
				{movies.list.map((movie, index) => {
					
					let poster = ''
					if (movie.poster_path === null)
						poster = './movie-poster.png'
					else
						poster = `${props.config.images.base_url}w400${movie.poster_path}`

					if (index >= movies.list.length - 1)
						return <div title={index} ref={lastMovieElement} key={index}><Movie title={movie.title} image={poster} /></div>
					else
						return <div title={index} key={index}><Movie title={movie.title}  image={poster} /></div>
				})}
			</div>
			
		</div>
	)
}

export default Movies