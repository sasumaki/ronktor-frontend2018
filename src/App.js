import React from 'react'
import ObservationPost from './components/ObservationPost'
import Api from './services/Api'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: ['Tokio', 'Helsinki', 'New York', 'Amsterdam', 'Dubai'],
      observations: {}
    }
  }
  componentDidMount() {
    Api.getObservations().then(response => {
      this.setState({ observations: response })
      console.log('component did mount')
      console.log(this.state.observations)
    })
  }

  render() {
    return (
      <div>
        <h1>Weather Service</h1>
        <table>
          <tbody>
            {this.state.locations.map(location => (
              <ObservationPost key={location} location={location} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
