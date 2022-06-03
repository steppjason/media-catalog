import React, { useState, useEffect, useCallback } from "react"
import MovieLibrary from "../components/MovieLibrary"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"

function MoviesLibrary(props) {

	const [searchMovies, setSearchMovies] = useState([])
	const [qry, setQuery] = useState('')
	const [movieLibrary, setMovieLibrary] = useState({})
	const apiKEY = `?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`

	const getMovieLibrary = useCallback(async () => {
		setTimeout(async () => {
			let q = null
			
			q = await query(collection(props.firebaseDB, "movies"), orderBy("title", "asc"))
				
			onSnapshot(q, (movies) => {
				setMovieLibrary(movies.docs)	
			})
		}, 100)
	}, [props.firebaseDB])

	const getSearchLibrary = useCallback(async () => {

		if (props.query !== qry)
			setQuery(props.query)
		
		let fetchURL = `https://api.themoviedb.org/3/search/movie`
		let page = `&page=1`
		let queryString = `&query=${encodeURI(props.query)}`

		fetchURL = fetchURL + apiKEY + page
		if (props.query !== '')
			fetchURL = fetchURL + queryString
		
			try {
				fetch(fetchURL)
					.then(res => res.json())
					.then(data => {
						setSearchMovies(prev => data.results)
					})
				
			} catch (err) {
				if (err.name === 'AboutError')	
					return
				
				console.error(err)
				return err
		}
		
		

	}, [props.query, apiKEY, qry])

	function refreshData() {
		getMovieLibrary()
	}
	

	useEffect(() => {
		window.scrollTo(0, 0);
		if(props.query !== '')
			getSearchLibrary()
		else
			setSearchMovies([])
		
	}, [props.query]) // eslint-disable-line react-hooks/exhaustive-deps
	
	
	useEffect(() => {
		getMovieLibrary()
	}, [getMovieLibrary])


	return (
		<div>
			<h1>My Movies</h1>
			<div className="movies">

				{Object.keys(movieLibrary).length !== 0 &&
			
					movieLibrary.map((movie, index) => {
						let poster = `${props.config.images.secure_base_url}w400${movie.data().poster}`
						if (movie.data().poster === null)
							poster = './movie-poster.png'

						if (searchMovies.length > 0) {	
							return searchMovies.map((searchMovie) => {
								if(searchMovie.id === movie.data().id)
									return <div title={index} key={index}><MovieLibrary movie={movie} image={poster} movieLibrary={movieLibrary} firebaseDB={props.firebaseDB} refreshData={refreshData} /></div>
								
								return null
							})
						} else {
							return <div title={index} key={index}><MovieLibrary movie={movie} image={poster} movieLibrary={movieLibrary}  firebaseDB={props.firebaseDB}  refreshData={refreshData} /></div>
						}

					})
				}

			</div>
			<div className="movie library spacer"></div>
		</div>
	)
}

export default MoviesLibrary