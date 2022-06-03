import React from "react"
import {  doc, deleteDoc } from "firebase/firestore"

function MovieLibrary(props) {
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