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

    this.zoomLLimits = [0.5, 3]

    this.dragging = false
    this.dragOriginX = 0
    this.dragOriginY = 0
    this.selectionActivated = false
    this.selectionOngoing = false

    this.appStyle = this.props.app.state.style
  }

  selectionButtonsStyle () {
    return (
      {
        top: '50px',
        left: '10px',
        position: 'absolute',
        cursor: 'pointer'
      }
    )
  }

  zoomButtonsStyle () {
    return (
      {
        top: '40px',
        cursor: 'pointer'
      }
    )
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
        nodesOut.push(buildNode(node, node.id + 999, Styles.graph.nodes.over(that.appStyle), '10'))
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

    const buildLink = function(link, id, style, isOver = false) {
      return (<Link
        source={link.source}
        target={link.target}
        key={id}
        style={style}
        isOver={isOver}
        />
      )
    }

    let linkGroups = {}

    this.props.app.getData().links.map(function (link) {
      let linkLabel = link.target.id + '-' + link.source.id
      if (!linkGroups[linkLabel]){
        linkGroups[linkLabel] = []
      }
      linkGroups[linkLabel].push(link)
    })

    _.forOwn(linkGroups, function(linkGroup, label) {
      let firstLink = linkGroup[0]
      if (_.filter(linkGroup, function(link){ return link.over}).length > 0){
        linksOut.push(buildLink(firstLink, firstLink.id + 999, Styles.graph.links.over(that.appStyle), true ))
      }

      let style = Styles.graph.links.default(that.appStyle)
      if (_.filter(linkGroup, function(link){ return link.selected}).length > 0){
        style = Styles.graph.links.selected(that.appStyle)
      }
      style['stroke'] = that.props.app.getTypeColor(linkGroup)
      linksOut.push(buildLink(firstLink, firstLink.id, style))
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
    let minX = _.min([this.state.selectionX1, this.state.selectionX2]) / this.state.zoom
    let minY = _.min([this.state.selectionY1, this.state.selectionY2]) / this.state.zoom
    let maxX = _.max([this.state.selectionX1, this.state.selectionX2]) / this.state.zoom
    let maxY = _.max([this.state.selectionY1, this.state.selectionY2]) / this.state.zoom

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
    var newZoom = this.state.zoom
    if (e.deltaY < 0) {
      newZoom += 0.1
    }else{
      newZoom -= 0.1
    }
    newzoom = clampZoom(newzoom)

    this.setState({zoom: newZoom})
  }

  clampZoom (zoom) {
    if (zoom < this.zoomLLimits[0]) {
      zoom = this.zoomLLimits[0]
    }else if (zoom > this.zoomLLimits[1]) {
      zoom = this.zoomLLimits[1]
    }
    return zoom
  }

  activateSelection () {
    this.selectionActivated = !this.selecting
  }

  zoomIn () {
    let newZoom = this.clampZoom(this.state.zoom + 0.2)
    this.setState({zoom: newZoom})
  }

  zoomOut () {
    let newZoom = this.clampZoom(this.state.zoom - 0.2)
    this.setState({zoom: newZoom})
  }

  render () {
    var that = this
    this.width = this.props.w()
    this.height = this.props.h()

    return (
      <div className="component component-graph" >
        <div
          style={this.selectionButtonsStyle()}
          className={"selection-button-graph selection-button fa " + that.props.app.selectionIconClass + " fa-2x leaflet-bar leaflet-control leaflet-control-custom"}
          onClick={this.activateSelection.bind(that)}
        >
        </div>
        <div className="leaflet-top leaflet-right zoom-buttons-graph" style={that.zoomButtonsStyle()}>
          <div className="leaflet-control-zoom leaflet-bar leaflet-control button">
            <a className="leaflet-control-zoom-in" title="Zoom in" onClick={that.zoomIn.bind(that)}>+</a>
            <a className="leaflet-control-zoom-out" title="Zoom out" onClick={that.zoomOut.bind(that)}>-</a>
          </div>
        </div>
        <svg
          ref="graph"
          width={this.width}
          height={this.height}
          onMouseDown={that.handleMouseDown.bind(that)}
          onMouseUp={that.handleMouseUp.bind(that)}
          onMouseMove={that.handleMouseMove.bind(that)}
          >
          <defs>
            <marker id='head' orient='auto' markerWidth='2' markerHeight='4' refX='5' refY='2'>
              <path d='M0,0 V4 L2,2 Z' />
            </marker>
        </defs>
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
            {this.drawLinks()}
            {this.drawNodes()}
          </g>
        </svg>
      </div>
    )
  }
}

export default Graph;
