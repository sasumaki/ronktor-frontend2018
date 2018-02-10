import React from 'react'
import ObservationPost from './components/ObservationPost'
import LoadingSpinner from './components/LoadingSpinner'
import ObservationForm from './components/ObservationForm'
import ObservationList from './components/ObservationList'
import Api from './services/Api'
import './snackbar.css'
let _ = require('underscore')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      observations: [],
      form: false,
      list: false,
      activeFormLocation: undefined,
      snackbartext: ''
    }
  }
  /*
  A tad heavy preprocessing method for the database.
  */
  preprocess = db => {
    let obs = Object.entries(_.groupBy(db, 'location'))
    obs = obs.map(loc => {
      let sorted = _.sortBy(loc[1], o => {
        o.temperature = Number(Number(o.temperature).toFixed(2))

        let key = new Date(o.date).getTime()
        return -key
      })
      let yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
      let filtered = _.filter(sorted, o => {
        return new Date(o.date).getTime() >= yesterday
      })
      let maxTemp = _.max(filtered, temp => temp.temperature).temperature
      let minTemp = _.min(filtered, temp => temp.temperature).temperature
      let obj = {
        name: loc[0],
        max: maxTemp,
        min: minTemp,
        obs: sorted
      }
      return obj
    })
    return obs
  }
  componentDidMount() {
    this.getObservations()
    console.log('Lets go')
  }
  getObservations = () => {
    Api.getObservations().then(response => {
      let obs = this.preprocess(response)
      this.setState({
        observations: obs
      })
    })
  }
  toggleList = location => {
    this.setState({ list: !this.state.list, activeFormLocation: location })
  }
  toggleForm = location => {
    this.setState({ form: !this.state.form, activeFormLocation: location })
  }
  editSnackbar = text => {
    this.setState({ snackbartext: text })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Weather Service</h1>
          <p>Sasu Mäkinen</p>
        </div>
        {this.state.observations.length ? (
          this.state.observations.map(location => (
            <ObservationPost
              key={location.name}
              location={location}
              toggle={this.toggleForm}
              togglelist={this.toggleList}
            />
          ))
        ) : (
          <LoadingSpinner />
        )}
        <div>
          {this.state.form ? (
            <div>
              <ObservationForm
                toggle={this.toggleForm.bind(this)}
                location={this.state.activeFormLocation}
                func={this.getObservations}
                snackbar={this.editSnackbar.bind(this)}
              />
            </div>
          ) : null}
        </div>
        <div>
          {this.state.list ? (
            <div>
              <ObservationList
                location={this.state.activeFormLocation}
                observations={this.state.observations}
                toggle={this.toggleList}
              />
            </div>
          ) : null}
        </div>
        <div id="snackbar">{this.state.snackbartext}</div>
      </div>
    )
  }
}

export default App
