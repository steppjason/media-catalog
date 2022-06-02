import React from "react"

function SearchBar(props) {
	
	function _handleKeyDown(e) {
		props.handleSearch(e.target.value)
	}

	return (
		<div className="search-bar">
			<input onChange={_handleKeyDown} type="text" placeholder="&#xF002; Search"/>
		</div>
	)
}

export default SearchBar