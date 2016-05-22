import React from 'react';

class Map extends React.Component {

  style() {
    return {
      'backgroundColor': 'lightgreen',
      'width': this.props.width,
      'height': this.props.height,
    }
  }

  render() {
    return (
      <div className="component component-map" style={this.style()}>
        Map
      </div>
    );
  }
}

export default Map;
