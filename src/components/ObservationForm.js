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
          <h2>Add observation</h2> <h1>{this.props.location}</h1>
          <div>
            <input
              onChange={event => this.input(event)}
              placeholder="Temperature"
            />
          </div>
          <button
            onClick={() => {
              this.add(
                this.state.input,
                this.props.location,
                this.props.func,
                this.props.snackbar
              )
              this.props.toggle()
            }}
          >
            Add
          </button>
          <button onClick={this.props.toggle}>Close</button>
        </div>
      </div>
    )
  }

  input = event => {
    event.preventDefault()
    this.setState({ input: event.target.value })
  }
  add = (temp, location, refresh, snackbar) => {
    let newObs = {
      location: location,
      temperature: temp
    }
    Api.addObservation(newObs)
      .then(result => {
        snackbar('Added!')
        this.showSnack()
        refresh()
      })
      .catch(error => {
        snackbar('Impossible temperature!')
        this.showSnack()
      })
  }
  showSnack = () => {
    var x = document.getElementById('snackbar')

    x.className = 'show'

    setTimeout(function() {
      x.className = x.className.replace('show', '')
    }, 3000)
  }
}

export default ObservationForm
