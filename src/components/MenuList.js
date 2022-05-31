import React from "react"

import MenuItem from "./MenuItem"

function MenuList(props) {

	function selectItem(value) {
		props.onSelect(value)
	}

	return (
		<ul>
			{props.list.map((item, index) => <MenuItem currentView={props.currentView} onSelect={selectItem} key={index} title={item} />)}
		</ul>
	)
}

export default MenuList