import React from "react"

function Movie(props) {
	return (
		<div className="movie">
			<div><img title={props.title} alt={props.title} src={props.image} /></div>
			<div className="title">{props.title}</div>
		</div>
	)
}

export default Movie