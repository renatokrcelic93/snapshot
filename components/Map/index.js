import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView,
  InfoWindow,
  LatLngBounds,
  LatLng
} from "react-google-maps";

class Map extends Component {
  state = {
    showInfoBox: true,
    markerOffset: 90,
    markerOffsetMultiMarker: 55,
    firstLoad: true,
    zoom: 12
  };

  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2) - this.state.markerOffset
  });
  getPixelPositionOffsetMultiMarker = (width, height, i) => {
    const offset = this.state[`markerOffsetMultiMarker${i}`]
      ? this.state[`markerOffsetMultiMarker${i}`]
      : this.state.markerOffsetMultiMarker;
    const data = {
      x: -(width / 2),
      y: -(height / 2) - offset
    };
    return data;
  };
  _renderOverlayViews = data => {
    return data.map((item, i) => {
      if (!item.address || item.anywhere) {
        return;
      }
      if (
        item.coordinates.coordinates[0] == 0 &&
        item.coordinates.coordinates[1] == 0
      ) {
        return;
      }
      return (
        <OverlayView
          key={item.id}
          position={{
            lat: item.coordinates.coordinates[1],
            lng: item.coordinates.coordinates[0]
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          /*
           * 2. Tweak the OverlayView's pixel position. In this case, we're
           *    centering the content.
           */
          getPixelPositionOffset={(width, height) =>
            this.getPixelPositionOffsetMultiMarker(width, height, i)
          }
        >
          <div>
            {this.state[`showInfoBox${i}`] && (
              <div className="box">
                <p className="font-xs ellipsis">{item.name}</p>
                <a
                  target="_blank"
                  href={`https://maps.google.com/maps/dir/${item.coordinates.coordinates
                    .reverse()
                    .join(",")}`}
                >
                  Get directions
                </a>
                <img
                  src="../static/close.png"
                  onClick={() =>
                    this.setState({
                      [`showInfoBox${i}`]: false,
                      [`markerOffsetMultiMarker${i}`]: 55
                    })
                  }
                  className="x"
                />
                <div className="arrow-down" />
              </div>
            )}
            <img
              onClick={() =>
                this.setState({
                  [`showInfoBox${i}`]: true,
                  [`markerOffsetMultiMarker${i}`]: 90
                })
              }
              className="marker"
              src="https://s3.amazonaws.com/vomo-web/development/common/images/marker.png"
            />
            <style jsx>
              {`
                .ellipsis {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .box {
                  cursor: auto;
                  padding: 8px;
                  position: relative;
                  background-color: #fff;
                  width: 300px;
                  height: 70px;
                  border-radius: 5px;
                  box-shadow: 0px 6px 28px -2px rgba(0, 0, 0, 0.39);
                }
                .arrow-down {
                  position: absolute;
                  bottom: -10px;
                  margin-left: -10px;
                  left: 50%;
                  width: 0;
                  height: 0;
                  border-left: 10px solid transparent;
                  border-right: 10px solid transparent;
                  border-top: 10px solid #fff;
                }
                .x {
                  height: 10px;
                  width: 10px;
                  cursor: pointer;
                  position: absolute;
                  top: 3px;
                  right: 3px;
                }
                .marker {
                  position: absolute;
                  margin-left: -19px;
                  left: 50%;
                  bottom: -50px;
                }
              `}
            </style>
          </div>
        </OverlayView>
      );
    });
  };

  _fitTheBounds = data => {
    const bounds = new window.google.maps.LatLngBounds();
    let newBounds = [];
    data.map(item => {
      if (!item.address || item.anywhere) {
        return;
      }
      if (
        item.coordinates.coordinates[0] == 0 &&
        item.coordinates.coordinates[1] == 0
      ) {
        return;
      }
      newBounds.push(
        new window.google.maps.LatLng(
          Number(item.coordinates.coordinates[1]),
          Number(item.coordinates.coordinates[0])
        )
      );
    });
    newBounds.forEach(bound => bounds.extend(bound));
    this.refs.map.fitBounds(bounds);
    let currentZoom = this.refs.map.getZoom();
    if (this.state.firstLoad == true && currentZoom > 15) {
      setTimeout(() => {
        this.setState({ zoom: 15 });
      }, 100);
    }
    this.setState({ firstLoad: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.multiMarker == true) {
      return this._fitTheBounds(nextProps.data);
    }
    return;
  }
  render() {
    const { geolocation, address, multiMarker = false, data } = this.props;

    if (multiMarker) {
      let center = this.props.data.find(item => item.coordinates)
        ? this.props.data.find(
            item =>
              item.coordinates.coordinates[0] !== 0 ||
              item.coordinates.coordinates[1] !== 0
          )
        : { coordinates: { coordinates: [19.0499, 47.4986] } };
      center = center
        ? center
        : { coordinates: { coordinates: [19.0499, 47.4986] } };
      return (
        <GoogleMap
          ref="map"
          zoom={this.state.zoom}
          center={{
            lat: center.coordinates.coordinates[1],
            lng: center.coordinates.coordinates[0]
          }}
          onTilesLoaded={
            this.state.firstLoad ? () => this._fitTheBounds(data) : () => null
          }
        >
          {this._renderOverlayViews(data)}
        </GoogleMap>
      );
    }
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: geolocation[0], lng: geolocation[1] }}
      >
        <OverlayView
          position={{ lat: geolocation[0], lng: geolocation[1] }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          /*
         * 2. Tweak the OverlayView's pixel position. In this case, we're
         *    centering the content.
         */
          getPixelPositionOffset={this.getPixelPositionOffset}
        >
          <div>
            {this.state.showInfoBox && (
              <div className="box">
                <p className="font-xs ellipsis">{address + address}</p>
                <a
                  target="_blank"
                  href={`https://maps.google.com/maps/dir/${geolocation.join(
                    ","
                  )}`}
                >
                  Get directions
                </a>
                <img
                  src="../static/close.png"
                  onClick={() =>
                    this.setState({ showInfoBox: false, markerOffset: 55 })
                  }
                  className="x"
                />
                <div className="arrow-down" />
              </div>
            )}
            <img
              onClick={() =>
                this.setState({ showInfoBox: true, markerOffset: 90 })
              }
              className="marker"
              src="https://s3.amazonaws.com/vomo-web/development/common/images/marker.png"
            />
            <style jsx>
              {`
                .ellipsis {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .box {
                  cursor: auto;
                  padding: 8px;
                  position: relative;
                  background-color: #fff;
                  width: 300px;
                  height: 70px;
                  border-radius: 5px;
                  box-shadow: 0px 6px 28px -2px rgba(0, 0, 0, 0.39);
                }
                .arrow-down {
                  position: absolute;
                  bottom: -10px;
                  margin-left: -10px;
                  left: 50%;
                  width: 0;
                  height: 0;
                  border-left: 10px solid transparent;
                  border-right: 10px solid transparent;
                  border-top: 10px solid #fff;
                }
                .x {
                  height: 10px;
                  width: 10px;
                  cursor: pointer;
                  position: absolute;
                  top: 3px;
                  right: 3px;
                }
                .marker {
                  position: absolute;
                  margin-left: -19px;
                  left: 50%;
                  bottom: -50px;
                }
              `}
            </style>
          </div>
        </OverlayView>
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
