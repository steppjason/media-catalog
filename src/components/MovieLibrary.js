
import React, { useState, useEffect } from "react"
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore"

function MovieLibrary(props) {

	const [inLibrary, setInLibrary] = React.useState(false)

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

	async function deleteMovie() {
		props.movieLibrary.map(movie => {
			if (props.movie.id === movie.id) {
				deleteDoc(doc(props.firebaseDB, "movies", movie.id))
				props.refreshData()		
			}
				return movie
		})
	}

	return (
		<div className="movie library">
			<div className="remove" onClick={deleteMovie}><i className="fa-solid fa-circle-xmark"></i></div>
			<div className="poster" title={props.movie.data().id}><img title={props.movie.data().title} alt={props.movie.data().title} src={props.image} /></div>
			<div className="title">{props.movie.data().title}</div>
		</div>
	)
}

export default MovieLibrary