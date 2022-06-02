import React, {useState, useEffect} from "react"

import MovieLibrary from "./views/MovieLibrary"
import MusicLibrary from "./views/MusicLibrary"
import Movies from "./views/Movies"
import Music from "./views/Music"

import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"

// import { initializeApp } from "firebase/app"
// import { getFirestore, collection, addDoc } from "firebase/firestore"

function App() {

	const [currentView, setView] = useState("Browse Movies")
	const [config, setConfig] = useState({})
	const [query, setQuery] = useState('')

	// Your web app's Firebase configuration
	// const firebaseConfig = {
	// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	// 	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
	// 	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	// 	appId: process.env.REACT_APP_FIREBASE_APP_ID
	// };
  
	// Initialize Firebase
	// const app = initializeApp(firebaseConfig)
	// const db = getFirestore(app)

	// async function addData() {
	// 	try {
	// 		const docRef = await addDoc(collection(db, "users"), {
	// 			first: "Ada",
	// 			last: "Lovelace",
	// 			born: 1815
	// 		});
	// 		console.log("Document written with ID: ", docRef.id);
	// 	} catch (e) {
	// 		console.error("Error adding document: ", e);
	// 	}
	// }
	
	
	function selectMenuItem(value) {
		setView(prev => {
			return value
		})
	}

	function getConfig() {
		try {
			fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
				.then(res => res.json())
				.then(data => {
					setConfig(data)
				})
		} catch (err) {
			console.error(err)
			return err
		}
	}

	function getQuery(queryString) {
		setQuery(queryString)
	}

	useEffect(() => {
		getConfig()
	}, [])


	return (
		<div className="App">
			<SearchBar handleSearch={getQuery}/>
			<SideBar onSelect={selectMenuItem} currentView={currentView}/>
			{config.images && <div className="view">
				{currentView === "My Movies" && <MovieLibrary config={config} query={query} />}
				{currentView === "My Music" && <MusicLibrary config={config} query={query} />}
				{currentView === "Browse Movies" && <Movies config={config} query={query} />}
				{currentView === "Browse Music" && <Music config={config} query={query} />}
			</div>}
			<Footer/>
		</div>
	)
}

export default App