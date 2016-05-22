import React from 'react'

class Panel extends React.Component {
  constructor (props) {
    super(props)
    this.dragging = false
    this.resizing = false
  }

  styleWrapper() {
    return {
      position: 'absolute',
      width: this.props.width,
      top: this.props.y,
      left: this.props.x
    }
  }

  styleBody() {
    return {
      height: this.props.height
    }
  }


  // DRAGGING EVENTS
  handleHeaderMouseDown (self, e) {
    self.dragging = true
    self.originDraggingX = e.pageX
    self.originDraggingY = e.pageY
  }
  handleHeaderMouseUp (self, e) {
    self.dragging = false
  }
  handleHeaderMouseOut (self, e) {
    if (self.dragging){
      self.dragComponent(self, e)
    }
  }
  handleHeaderMouseMove (self, e) {
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

  // RESIZING EVENTS
  handleResizerMouseDown (self, e) {
    self.resizing = true
    self.originResizingX = e.pageX
    self.originResizingY = e.pageY
  }
  handleResizerMouseUp (self, e) {
    self.resizing = false
  }
  handleResizerMouseOut (self, e) {
    self.resizing = false
  }
  handleResizerMouseMove (self, e) {
    if (self.resizing) {
      console.log('resizing')
      let deltaX = e.pageX - self.originResizingX
      let deltaY = e.pageY - self.originResizingY
      self.props.app.resizeComponent(self.props.id, deltaX, deltaY)
      self.originResizingX = e.pageX
      self.originResizingY = e.pageY
    }
  }

  render() {
    var that = this
    return (
      <div style={this.styleWrapper()}>
        <div
          className="panel panel-success">
          <div
            className="panel-heading"
            onMouseDown={this.handleHeaderMouseDown.bind(this, that)}
            onMouseMove={this.handleHeaderMouseMove.bind(this, that)}
            onMouseUp={this.handleHeaderMouseUp.bind(this, that)}
            onMouseOut={this.handleHeaderMouseOut.bind(this, that)}
            >
            <h3 className="panel-title">{this.props.label}</h3>
          </div>
          <div className="panel-body" style={this.styleBody()}>
            {
              this.props.children
            }
            <i
              className="panel-resizer fa fa-expand"
              onMouseDown={this.handleResizerMouseDown.bind(this, that)}
              onMouseUp={this.handleResizerMouseUp.bind(this, that)}
              onMouseOut={this.handleResizerMouseOut.bind(this, that)}
              onMouseMove={this.handleResizerMouseMove.bind(this, that)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;
