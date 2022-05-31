import React from "react"

import MenuList from "./MenuList"


function SideBar(props) {

	const libraryMenu = ["My Movies", "My Music"]
	const mediaMenu = ["Browse Movies", "Browse Music"]

	function selectItem(value) {
		props.onSelect(value)
	}

	return (
		<div className="sidebar">
			<h3>Library</h3>
			<MenuList currentView={props.currentView} onSelect={selectItem} list={libraryMenu}/>
	
			<h3>Media</h3>
			<MenuList currentView={props.currentView} onSelect={selectItem} list={mediaMenu} />
		</div>
	)
}

export default SideBar