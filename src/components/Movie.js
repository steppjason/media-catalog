import React, { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, doc, deleteDoc } from "firebase/firestore"

function Movie(props) {

	const [inLibrary, setInLibrary] = useState(false)
	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
		messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID
	};
  
	// Initialize Firebase
	const app = initializeApp(firebaseConfig)
	const db = getFirestore(app)

	useEffect(() => {
		if (Object.keys(props.movieLibrary).length !== 0) {
			let res = props.movieLibrary.map(movie => {
				if (props.movie.id === movie.data().id)
					setInLibrary(true)
				
				return movie
				})
				console.log(res)
		}


	}, [props.movieLibrary, props.movie.id])

	// props.movieLibrary.map(movie => {
	// 	if (props.movie.id === movie.data().id)
	// 		setInLibrary(true)
	// 	})
	

	function addMovie() {
		console.log("Adding...")
		addDoc(collection(db, "movies"), { id: props.movie.id, title: props.movie.title, poster: props.movie.poster_path })
			.then(props.refreshData())
			.then(setInLibrary(true))
	}

	async function deleteMovie() {
		const responses = props.movieLibrary.map(movie => {
			if (props.movie.id === movie.data().id) {
				console.log("Deleting...")
				deleteDoc(doc(props.firebaseDB, "movies", movie.id))
			}
			return movie
		})

		const resolved = await Promise.all(responses)
		if (resolved) {
			props.refreshData()
			setInLibrary(false)
		}
			
		
	}

	return (
		<div className="movie">
			{inLibrary && <div className="check"><i className="fa-solid fa-circle-check"></i></div>}
			{(!inLibrary && <div className="poster" onClick={addMovie}><img title={props.movie.title} alt={props.movie.title} src={props.image} /></div>) ||
											<div className="poster" title="delete" onClick={deleteMovie}><img title={props.movie.title} alt={props.movie.title} src={props.image} /></div> }
			<div className="title">{props.movie.title}</div>
			
		</div>
	)
}

export default Movie