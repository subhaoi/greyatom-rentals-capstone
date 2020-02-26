import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"


const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 19.114855, lng: 72.837006 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                <div className="restinfo">
                  <i
                    className="fas fa-map-marker"
                    style={{ color: "orangered", fontSize: "12px" }}
                  ></i>
                  <span className="restname">{marker.Name}</span>
                  <br />
                  <span className="restrent">Rent - {marker.Rent}</span>
                  <div className="restareas">
                    {marker.Area}
                  </div>
                  <span className="restrent">{marker.Bedrooms} Bedroom</span>
                </div>
              </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

class MapFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apartments: [],
      selectedMarker: false
    }
  }
  // componentDidMount() {
  //     this.setState({ apartments: this.props.itemsToDisplay })
  // }
  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker })
  }
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.props.itemsToDisplay}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAosgS15RurHcpHaqQ3RL0IGJ4zm-Uww58&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export { MapFilter };