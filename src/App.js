import React, {useState} from "react"

import MovieLibrary from "./views/MovieLibrary"
import MusicLibrary from "./views/MusicLibrary"
import Movies from "./views/Movies"
import Music from "./views/Music"

import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"

function App() {

	let [currentView, setView] = useState("My Movies")
	
	function selectMenuItem(value) {
		setView(prev => {
			return value
		})
	}

	return (
		<div className="App">
			<SearchBar />
			<SideBar onSelect={selectMenuItem} currentView={currentView}/>
			<div className="view">
				{ currentView === "My Movies" && <MovieLibrary />}
				{ currentView === "My Music" && <MusicLibrary />}
				{ currentView === "Browse Movies" && <Movies />}
				{ currentView === "Browse Music" && <Music />}
			</div>
			<Footer/>
		</div>
	)
}

export default App