import React from 'react';
import _ from 'lodash'

class SelectingRectangle extends React.Component {
  constructor (props) {
    super(props)
  }

  getY () {
    return _.min([this.props.y1, this.props.y2])
  }

  getX () {
    return _.min([this.props.x1, this.props.x2])
  }

  getW () {
    return Math.abs(this.props.x1 - this.props.x2)
  }

  getH () {
    return Math.abs(this.props.y1 - this.props.y2)
  }

  style () {
    return {
      'stroke': this.props.app.state.style.selectionRectangle.strokeColor,
      'strokeOpacity': this.props.app.state.style.selectionRectangle.strokeOpacity,
      'strokeWidth': this.props.app.state.style.selectionRectangle.strokeWidth,
      'fill': this.props.app.state.style.selectionRectangle.fillColor,
      'fillOpacity': this.props.app.state.style.selectionRectangle.fillOpacity
    }
  }

  render () {
    return (
      <rect style={this.style()}
        x={this.getX()} y={this.getY()} width={this.getW()} height={this.getH()}
       />
    )
  }


}

export default SelectingRectangle;
