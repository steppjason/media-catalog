import React, {useState, useEffect} from "react"

import MoviesLibrary from "./views/MoviesLibrary"
import Movies from "./views/Movies"

import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

function App() {

	const [currentView, setView] = useState("My Movies")
	const [config, setConfig] = useState({})
	const [query, setQuery] = useState('')

	const firebaseConfig = {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
		messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID
	};

	// Initialize Firebase
	const firebaseApp = initializeApp(firebaseConfig)
	const firebaseDB = getFirestore(firebaseApp)
	

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
				{currentView === "My Movies" && <MoviesLibrary config={config} query={query} firebaseDB={firebaseDB} firebaseConfig={firebaseConfig} />}
				{currentView === "Browse Movies" && <Movies config={config} query={query} firebaseDB={firebaseDB} firebaseConfig={firebaseConfig} />}
			</div>}
			<Footer/>
		</div>
	)
}

export default App