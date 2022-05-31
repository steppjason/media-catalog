import React, {useState, useEffect} from "react"

import MovieLibrary from "./views/MovieLibrary"
import MusicLibrary from "./views/MusicLibrary"
import Movies from "./views/Movies"
import Music from "./views/Music"

import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"

function App() {

	const [currentView, setView] = useState("Browse Movies")
	const [config, setConfig] = useState({}) 
	
	function selectMenuItem(value) {
		setView(prev => {
			return value
		})
	}

	function getConfig() {
		fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
			.then(res => res.json())
			.then(data => {
				setConfig(data)
			})
	}

	useEffect(() => {
		getConfig()
	}, [])


	return (
		<div className="App">
			<SearchBar />
			<SideBar onSelect={selectMenuItem} currentView={currentView}/>
			{config.images && <div className="view">
				{currentView === "My Movies" && <MovieLibrary config={config} />}
				{currentView === "My Music" && <MusicLibrary config={config} />}
				{currentView === "Browse Movies" && <Movies config={config} />}
				{currentView === "Browse Music" && <Music config={config} />}
			</div>}
			<Footer/>
		</div>
	)
}

export default App