import React from 'react';
import d3 from 'd3'
import _ from 'lodash'
import Styles from '../../enums/styles'

import SelectingRectangle from './../general/selectingrectangle.jsx!'
import Node from './node.jsx!'
import Link from './link.jsx!'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      draggedX: 0,
      draggedY: 0,
      zoom: 1,
      selectionX1: 0,
      selectionY1: 0,
      selectionX2: 0,
      selectionY2: 0,
    }
    this.dragging = false
    this.dragOriginX = 0
    this.dragOriginY = 0
    this.selectionActivated = false
    this.selectionOngoing = false

    this.appStyle = this.props.app.state.style
  }

  componentWillMount () {
    this.setForce()
  }

  componentWillReceiveProps () {
    if (this.props.h() != this.lastH){
      this.setForce()
    }
  }

  componentDidMount () {
    let graphEl = this.refs.graph
    graphEl.addEventListener("mousewheel", this.handleScroll.bind(this), false);
  }

  componentDidUpdate() {
  }

  setForce () {
    let that = this
    this.lastH = this.props.h()
    this.lastW = this.props.w()

    let nodesData = this.props.app.getData().nodes
    let linksData = this.props.app.getData().links

    this.force = d3.layout.force()
      .charge(-50)
      .linkDistance(25)
      .size([this.lastH, this.lastW])
      .nodes(nodesData)
      .links(linksData)
      .start()

    this.force.on("tick", function (tick, b, c) {
      that.forceUpdate()
    })
  }

  drawNodes() {
    var that = this
    var nodesOut = []

    const buildNode = function(node, id, style, radius, overEvent=false, outEvent=false) {
      return (<Node
        id={node.id}
        key={id}
        x={node.x}
        y={node.y}
        radius={radius}
        onmouseover={overEvent}
        onmouseout={outEvent}
        style={style} />
      )
    }

    this.props.app.getData().nodes.map(function (node, index) {
      if (node.over){
        nodesOut.push(buildNode(node, 999, Styles.graph.nodes.over(that.appStyle), '10', false, false))
      }

      let style = Styles.graph.nodes.default(that.appStyle)
      if (node.selected) { style = Styles.graph.nodes.selected(that.appStyle) }
      style['fill'] = that.props.app.getGroupColor(node)
      nodesOut.push(buildNode(node, node.id, style, '5', that.onNodeOver.bind(that), that.onNodeOut.bind(that)))
    })

    return nodesOut
  }

  // Node events
  onNodeOver(e) {
    this.props.app.setOver([parseInt(e.target.id)], true)
  }

  onNodeOut(e) {
    this.props.app.deOver(true)
  }

  drawLinks () {
    var that = this
    var linksOut = []

    const buildLink = function(link, id, style) {
      return (<Link
        source={link.source}
        target={link.target}
        key={link.id}
        style={style} />
      )
    }

    this.props.app.getData().links.map(function (link) {
      if (link.over){
        linksOut.push(buildLink(link, link.id + 999, Styles.graph.links.over(that.appStyle) ))
      }

      let style = Styles.graph.links.default(that.appStyle)
      if (link.selected) { style = Styles.graph.links.selected(that.appStyle) }
      style['stroke'] = that.props.app.getTypeColor(link)
      linksOut.push(buildLink(link, link.id, style))
    })
    return linksOut
  }


  // Mouse events
  handleMouseUp (e) {
    this.dragging = false
  }

  hideSelectingRectangle () {
    this.setState({
      selectionX1: 0,
      selectionX2: 0,
      selectionY1: 0,
      selectionY2: 0.
    })
  }

  doSelection () {
    let minX = _.min([this.state.selectionX1, this.state.selectionX2])
    let minY = _.min([this.state.selectionY1, this.state.selectionY2])
    let maxX = _.max([this.state.selectionX1, this.state.selectionX2])
    let maxY = _.max([this.state.selectionY1, this.state.selectionY2])

    let nodesInRectangle = []
    this.props.app.getData().nodes.map(function (node, index) {
      let x = node.x
      let y = node.y
      if (x > minX && x < maxX && y > minY && y < maxY) {
        nodesInRectangle.push(node.id)
      }
    })

    this.props.app.setSelect(nodesInRectangle, true)
  }

  svgOriginPosition () {
    let graphElBounds = this.refs.graph.getBoundingClientRect()
    return [graphElBounds.left, graphElBounds.top]
  }

  startSelection (e) {
    let elPosition = this.svgOriginPosition()

    this.setState({
      selectionX1: (e.clientX - elPosition[0]) - this.state.draggedX,
      selectionY1: (e.clientY - elPosition[1]) - this.state.draggedY,
      selectionX2: (e.clientX - elPosition[0]) - this.state.draggedX,
      selectionY2: (e.clientY - elPosition[1]) - this.state.draggedY,
    })
  }

  confirmSelection () {
    this.doSelection()
    this.hideSelectingRectangle()
  }

  updateSelection (e) {
    var elPosition = this.svgOriginPosition()
    this.setState({
      selectionX2: (e.clientX - elPosition[0]) - this.state.draggedX,
      selectionY2: (e.clientY - elPosition[1]) - this.state.draggedY
    })
  }

  handleMouseDown (e) {
    var eClone = _.clone(e)
    if (this.selectionOngoing) {
      this.selectionOngoing = false
      this.selectionActivated = false
      this.confirmSelection()
    }
    if (this.selectionActivated){
      var that = this
      setTimeout(function(){
        that.selectionOngoing = true
        that.startSelection(eClone)
      }, 300)
    }else{
      this.dragOriginX = e.clientX
      this.dragOriginY = e.clientY
      this.dragging = true
    }
  }

  handleMouseMove (e) {
    let that = this

    if (this.selectionOngoing) {
      this.updateSelection(e)
    }

    if (this.dragging) {
      var x = e.clientX
      var y = e.clientY
      var newDragX = this.state.draggedX + (x - this.dragOriginX)
      var newDragY = this.state.draggedY + (y - this.dragOriginY)

      this.setState({
        draggedX: newDragX,
        draggedY: newDragY
      }, function(){
        that.dragOriginX = x
        that.dragOriginY = y
      })
    }
  }

  handleScroll (e) {
    var zoom = this.state.zoom
    if (e.deltaY < 0) {
      zoom += 0.1
    }else{
      zoom -= 0.1
    }
    this.setState({zoom: zoom})
  }

  activateSelection () {
    this.selectionActivated = !this.selecting
  }

  render () {
    var that = this
    this.width = this.props.w()
    this.height = this.props.h()

    return (
      <div className="component component-graph" >
        <div
          className="selection-button-graph selection-button fa fa-hand-o-down fa-2x leaflet-bar leaflet-control leaflet-control-custom"
          onClick={this.activateSelection.bind(that)}></div>
        <svg
          ref="graph"
          width={this.width}
          height={this.height}
          onMouseDown={that.handleMouseDown.bind(that)}
          onMouseUp={that.handleMouseUp.bind(that)}
          onMouseMove={that.handleMouseMove.bind(that)}
          >
          <SelectingRectangle
            app={this.props.app}
            x1={this.state.selectionX1 + this.state.draggedX}
            x2={this.state.selectionX2 + this.state.draggedX}
            y1={this.state.selectionY1 + this.state.draggedY}
            y2={this.state.selectionY2 + this.state.draggedY}
          />
          <g
            pointer-events="all"
            transform={"translate(" + that.state.draggedX + "," + that.state.draggedY + ")scale(" + that.state.zoom + ")"}
          >
            <g>
              {this.drawLinks()}
            </g>
            {this.drawNodes()}
          </g>
        </svg>
      </div>
    )
  }
}

export default Graph;
