import React from 'react'
import '../App.css'
const ObservationList = props => {
  let observationsToShow = props.observations.filter(location => {
    return location.name === props.location
  })
  return (
    <div className="popup">
      <div className="popup_inner2">
        <div className="Fixed">
          <h1>{props.location}</h1>
          <div>
            <button onClick={props.toggle}>Close</button>
          </div>
        </div>
        <div className="container2">
          <table align="center">
            <tbody>
              <tr>
                <td>Temperature °C</td>
                <td>Date</td>
              </tr>
              {observationsToShow[0].obs.map(obs => {
                return (
                  <tr key={obs.id}>
                    <td> {obs.temperature} °C </td>
                    <td> {new Date(obs.date).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={props.toggle}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ObservationList
