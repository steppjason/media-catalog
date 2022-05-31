import React from "react"

function Movie(props) {
	return (
		<div className="movie">
			<div className="movie__image"><img title={props.title} alt={props.title} src={props.image} /></div>
			<div className="movie__title">{props.title}</div>
		</div>
	)
}

export default Movie