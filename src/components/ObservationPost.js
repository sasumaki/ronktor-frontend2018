import React from 'react'
import '../App.css'

const ObservationPost = props => {
  if (props.location.obs[0] === undefined) {
    return (
      <div>
        <h2>{props.location.name}</h2>
        <button
          className="button1"
          onClick={() => props.toggle(props.data.name)}
        >
          New Observation
        </button>
      </div>
    )
  }
  return (
    <div className="card">
      <h2>{props.location.name}</h2>
      <button onClick={() => props.togglelist(props.location.name)}>
        Show all
      </button>
      <Observation data={props.location} toggle={props.toggle} />
    </div>
  )
}
const Observation = props => {
  return (
    <div className="container">
      <p>latest: {props.data.obs[0].temperature} °C</p>
      <p>max: {props.data.max} °C</p>
      <p>min: {props.data.min} °C</p>
      <button className="button1" onClick={() => props.toggle(props.data.name)}>
        New Observation
      </button>
    </div>
  )
}
export default ObservationPost
