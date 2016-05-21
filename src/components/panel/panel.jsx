import React from 'react'

class Panel extends React.Component {
  constructor (props) {
    super(props)
    this.dragging = false
  }

  style() {
    return {
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      top: this.props.y,
      left: this.props.x,
    }
  }

  handleMouseDown (self, e) {
    self.dragging = true
    self.originDraggingX = e.pageX
    self.originDraggingY = e.pageY
  }

  handleMouseUp (self, e) {
    self.dragging = false
  }

  handleMouseOut (self, e) {
    if (self.dragging){
      self.dragComponent(self, e)
    }
  }

  handleMouseMove (self, e) {
    if (self.dragging) {
      self.dragComponent(self, e)
    }
  }

  dragComponent (self, e) {
    let deltaX = e.pageX - self.originDraggingX
    let deltaY = e.pageY - self.originDraggingY
    self.props.app.moveComponent(self.props.id, deltaX, deltaY)
    self.originDraggingX = e.pageX
    self.originDraggingY = e.pageY
  }

  render() {
    var that = this
    return (
      <div style={this.style()}>
        <div
          className="panel panel-success"
          onMouseDown={this.handleMouseDown.bind(this, that)}
          onMouseMove={this.handleMouseMove.bind(this, that)}
          onMouseUp={this.handleMouseUp.bind(this, that)}
          onMouseOut={this.handleMouseOut.bind(this, that)}
          >
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.x}</h3>
          </div>
          <div className="panel-body">
          {
            this.props.children
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;
