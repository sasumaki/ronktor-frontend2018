import React from 'react'
const ObservationPost = props => {
  return (
    <div>
      <h2>{props.location[1][0].location}</h2>
      <Observation data={props.location[1]} toggle={props.toggle} />
    </div>
  )
}
const Observation = props => {
  return (
    <div>
      <p>Temperature: {props.data[0].temperature} °C</p>
      <button onClick={() => props.toggle(props.data[0].location)}>
        New Observation
      </button>
    </div>
  )
}
export default ObservationPost
