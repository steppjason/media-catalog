import React from "react"

function MenuItem(props) {

	function handleClick(){
		console.log("handle click")
		props.onSelect(props.title)
	}

	return (
		<li className={props.currentView === props.title ? "active" : ""} onClick={handleClick}>{props.title}</li>
	)
}

export default MenuItem