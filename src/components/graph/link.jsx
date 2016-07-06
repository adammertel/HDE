import React from 'react';

class Link extends React.Component {
  render () {
    let endMarker = 'url(#head)'
    if (this.props.isOver){
      endMarker = false
    }
    return (
      <line
        markerEnd={endMarker}
        x1={this.props.source.x}
        y1={this.props.source.y}
        x2={this.props.target.x}
        y2={this.props.target.y}
        style={this.props.style}/>
    );
  }
}

export default Link
