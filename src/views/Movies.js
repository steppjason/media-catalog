import React, { useState, useEffect, useRef, useCallback } from "react"
import Movie from "../components/Movie"
import { collection, getDocs } from "firebase/firestore"

function Movies(props) {

	const [movies, setMovies] = useState( {page: 1, list: []} )
	const [query, setQuery] = useState('')
	const [movieLibrary, setMovieLibrary] = useState({})
	const apiKEY = `?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`

	const getMovieLibrary = useCallback(async () => {
		setTimeout(async () => {
			const res = await getDocs(collection(props.firebaseDB, "movies"))
			setMovieLibrary(res.docs)	
		}, 100)
	}, [props.firebaseDB])


	const getMovies = useCallback(() => {

		let tempMovies = {page: 1, list: []}

		if (props.query !== query)
			setQuery(props.query)
		
		let fetchURL = `https://api.themoviedb.org/3/discover/movie`
		if (props.query !== '')
			fetchURL = `https://api.themoviedb.org/3/search/movie`


		let 	page = `&page=${movies.page}`
		if (props.query !== query)
			page = `&page=${tempMovies.page}`
		
		let queryString = `&query=${encodeURI(props.query)}`

		fetchURL = fetchURL + apiKEY + page
		if (props.query !== '')
			fetchURL = fetchURL + queryString

		try {
			fetch(fetchURL)
				.then(res => res.json())
				.then(data => {
		
					tempMovies = {page: 2, list: data.results}

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
			if (err.name === 'AboutError')	
				return
			
			console.error(err)
			return err
		}

	}, [movies.page, props.query, query, apiKEY])

	const observer = useRef()
	const lastMovieElement = useCallback(node => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(element => {
			if (element[0].isIntersecting) {
				
				if (props.query !== query)
					setQuery(props.query)
				
				getMovies()

			}
		})
		if(node) observer.current.observe(node)
	}, [getMovies, props.query, query])
	

	function refreshData() {
		getMovieLibrary()
	}
	

	useEffect(() => {
		window.scrollTo(0,0);
		getMovies()
		getMovieLibrary()
	}, [props.query]) // eslint-disable-line react-hooks/exhaustive-deps
	
	
	useEffect(() => {
		getMovieLibrary()
	}, [getMovieLibrary])


	return (
		<div>
			<h1>Movies</h1>
			<div className="movies">
				
				{movies.list.map((movie, index) => {
					let poster = `${props.config.images.secure_base_url}w400${movie.poster_path}`
					if (movie.poster_path === null)
						poster = './movie-poster.png'

					if (index >= movies.list.length - 1)
						return <div title={index} ref={lastMovieElement} key={index}><Movie movie={movie} image={poster} movieLibrary={movieLibrary} firebaseDB={props.firebaseDB} refreshData={refreshData} /></div>
					else
						return <div title={index} key={index}><Movie movie={movie} image={poster} movieLibrary={movieLibrary}  firebaseDB={props.firebaseDB}  refreshData={refreshData} /></div>
				})}

			</div>
		</div>
	)
}

export default Movies