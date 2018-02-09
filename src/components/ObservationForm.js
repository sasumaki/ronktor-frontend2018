import React from 'react'
import '../App.css'
import Api from '../services/Api'
class ObservationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1>Form</h1>
          <div>
            <input
              onChange={event => this.input(event)}
              placeholder="Temperature"
            />
          </div>
          <button onClick={() => this.add(this.state.input)}>Add</button>
          <button onClick={this.props.toggle}>Close</button>
        </div>
      </div>
    )
  }

  input = event => {
    this.setState({ input: event.target.value })
  }
  add = (temp, location) => {
    console.log('Adding')
    let newObs = {
      location: location,
      temperature: temp,
      Date: new Date()
    }
    Api.addObservation(newObs)
  }
}

export default ObservationForm
