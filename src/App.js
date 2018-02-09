import React from 'react'
import ObservationPost from './components/ObservationPost'
import Api from './services/Api'
import ObservationForm from './components/ObservationForm'
let _ = require('underscore')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      observations: [],
      form: false,
      activeFormLocation: undefined
    }
  }
  componentDidMount() {
    /* 
    Gets all observations from database and groups them as list of observations for each
    city with its name as first entry. 
    Resulting object might feel a bit tricky..
    */
    Api.getObservations().then(response => {
      let obs = Object.entries(_.groupBy(response, 'location'))
      this.setState({
        observations: obs
      })
    })
  }
  toggleForm = location => {
    this.setState({ form: !this.state.form, activeFormLocation: location })
    console.log('Observation form toggled ' + this.state.form)
  }

  render() {
    return (
      <div>
        <h1>Weather Service</h1>
        {this.state.observations.map(location => (
          <ObservationPost
            key={location}
            location={location}
            toggle={this.toggleForm}
          />
        ))}
        {this.state.form ? (
          <div>
            <ObservationForm
              toggle={this.toggleForm.bind(this)}
              location={this.state.activeFormLocation}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
