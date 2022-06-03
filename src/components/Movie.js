import React, { useState, useEffect } from "react"
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore"

function Movie(props) {

	const [inLibrary, setInLibrary] = useState(false)

	useEffect(() => {
		if (Object.keys(props.movieLibrary).length !== 0) {
			setInLibrary(false)
			props.movieLibrary.map(movie => {
				if (props.movie.id === movie.data().id)
					setInLibrary(true)
				
				return movie
				})
		}
	},[props.movieLibrary, props.movie.id]) 

	function addMovie() {
		addDoc(collection(props.firebaseDB, "movies"), { id: props.movie.id, title: props.movie.title, poster: props.movie.poster_path })
		props.refreshData()
	}

	async function deleteMovie() {
		props.movieLibrary.map(movie => {
			if (props.movie.id === movie.data().id) {
				deleteDoc(doc(props.firebaseDB, "movies", movie.id))
				props.refreshData()		
			}
				return movie
		})
	}

	return (
		<div className="movie">
			{inLibrary && <div className="check"><i className="fa-solid fa-circle-check"></i></div>}
			{(!inLibrary && <div className="poster" title={props.movie.id} onClick={addMovie}><img title={props.movie.title} alt={props.movie.title} src={props.image} /></div>) ||
											<div className="poster" title={props.movie.id} onClick={deleteMovie}><img title={props.movie.title} alt={props.movie.title} src={props.image} /></div> }
			<div className="title">{props.movie.title}</div>
			
		</div>
	)
}

export default Movie