import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

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

    this.defaultLinkStyle = {
      "strokeWidth": '1px',
      "strokeOpacity": .5
    }
    var defaultLinkClone = _.clone(this.defaultLinkStyle)
    this.overLinkStyle = _.clone(_.assign(defaultLinkClone, {
      "strokeOpacity": .4,
      "strokeWidth": '5px',
      "stroke": 'orange'
    }))
    this.selectedLinkStyle = _.clone(_.assign(defaultLinkClone, {
      "strokeWidth": '3px',
      "strokeOpacity": .8
    }))

    this.defaultNodeStyle = {
      "stroke": '#000',
      "stroke-width": '1px',
      "fillOpacity": .5
    }
    var defaultNodeClone = _.clone(this.defaultNodeStyle)
    this.overNodeStyle = _.clone(_.assign(defaultNodeClone, {
      "stroke-width": 0,
      "fill": 'orange',
      "fillOpacity": .3
    }))
    this.selectedNodeStyle = _.clone(_.assign(defaultNodeClone, {
      "stroke-width": '2px',
      "strokeOpacity": 1,
      "fillOpacity": 1
    }))
  }

  componentDidMount () {
    this.setForce()
    this.loadData()
  }

  componentWillReceiveProps () {
    this.loadData()
    if (this.props.h() != this.lastH){
      this.setForce()
    }
  }

  doSelection () {
    var minX = this.selectionX()
    var minY = this.selectionY()
    var maxX = minX + this.selectionW()
    var maxY = minY + this.selectionH()

    var nodesInRectangle = []
    this.props.app.getData().nodes.map(function (node, index) {
      var x = node.x
      var y = node.y
      if (x > minX && x < maxX && y > minY && y < maxY) {
        nodesInRectangle.push(node.id)
      }
    })

    this.props.app.setSelect(nodesInRectangle, true)

  }

  setForce () {
    var that = this
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

  loadData() {
    var that = this
    var nodes = this.getNodes()
    var links = this.getLinks()

    this.setState({nodes: nodes, links: links})
  }

  nodeStyle(node) {
    var style = _.clone(this.defaultNodeStyle)
    if (node.selected){ style = _.clone(this.selectedNodeStyle) }
    style['fill'] = this.props.app.getGroupColor(node.group)
    return style
  }

  onNodeOver(e) {
    this.props.app.setOver([parseInt(e.target.id)], true)
  }

  onNodeOut(e) {
    this.props.app.deOver(true)
  }

  getNodes() {
    var that = this

    return this.props.app.getData().nodes.map(function (node, index) {
      return <Node
        id={node.id}
        key={node.id}
        x={node.x}
        y={node.y}
        radius={5}
        onmouseover={that.onNodeOver.bind(that)}
        onmouseout={that.onNodeOut.bind(that)}
        style={that.nodeStyle(node)} />
    })
  }

  drawOverNodes() {
    var that = this
    return this.props.app.getData().nodes.map(function (node, index) {
      if (node.over){
        return <Node
          id={node.id}
          key={node.id}
          x={node.x}
          y={node.y}
          radius={10}
          style={that.overNodeStyle} />
      }
    })
  }

  drawOverLinks() {
    var that = this
    return this.props.app.getData().links.map(function (link, index) {
      if (link.over){
        return <Link
          source={link.source}
          target={link.target}
          value={link.value}
          key={index}
          style={that.overLinkStyle} />
      }
    })
  }

  linkStyle(link) {
    var style = _.clone(this.defaultLinkStyle)
    if (link.selected){ style = _.clone(this.selectedLinkStyle) }
    style['stroke'] = this.props.app.getTypeColor(link.type)
    return style
  }

  getLinks () {
    var that = this
    var links = this.props.app.getData().links.map(function (link, index) {
      return (<Link
        source={link.source}
        target={link.target}
        value={link.value}
        key={index}
        style={that.linkStyle(link)}
      />)
    })
    return (
      <g>
        {links}
      </g>
    )
  }

  componentDidUpdate() {

  }

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

  svgOriginPosition () {
    var graphElBounds = this.refs.graph.getBoundingClientRect()
    return [graphElBounds.left, graphElBounds.top]
  }

  startSelection (e) {
    var elPosition = this.svgOriginPosition()

    console.log(e.clientY)
    console.log(elPosition[1])

    this.setState({
      selectionX1: (e.clientX - elPosition[0]) - this.state.draggedX,
      selectionY1: (e.clientY - elPosition[1]) - this.state.draggedY,
      selectionX2: (e.clientX - elPosition[0]) - this.state.draggedX,
      selectionY2: (e.clientY - elPosition[1]) - this.state.draggedY,
    })
  }

  confirmSelection () {
    console.log('selection confirmed')
    this.doSelection()
    this.hideSelectingRectangle()
  }

  updateSelection (e) {
    console.log('selection updated')
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
    var that = this

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

  componentDidMount () {
    var graphEl = this.refs.graph
    graphEl.addEventListener("mousewheel", this.handleScroll.bind(this), false);
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

  selectButtonStyle () {
    return {
      width: '30px',
      height: '30px',
      cursor: 'pointer',
      padding: '3px',
      backgroundColor: 'white',
      top: '50px',
      left: '10px',
      position: 'absolute'
    }
  }

  selectionRectStyle () {
    return {
      'stroke': this.props.app.state.style.selected.strokeColor,
      'strokeOpacity': this.props.app.state.style.selected.strokeOpacity,
      'strokeWidth': this.props.app.state.style.selected.strokeWidth,
      'fill': this.props.app.state.style.selected.fillColor,
      'fillOpacity': this.props.app.state.style.selected.fillOpacity
    }
  }

  selectionY () {
    if (this.state.selectionY1 < this.state.selectionY2){
      return this.state.selectionY1
    }else{
      return this.state.selectionY2
    }
  }

  selectionX () {
    if (this.state.selectionX1 < this.state.selectionX2){
      return this.state.selectionX1
    }else{
      return this.state.selectionX2
    }
  }

  selectionW () {
    return Math.abs(this.state.selectionX1 - this.state.selectionX2)
  }

  selectionH () {
    return Math.abs(this.state.selectionY1 - this.state.selectionY2)
  }

  render () {
    var that = this
    return (
      <div className="component component-graph" >
        <div
          className="fa fa-hand-o-down fa-2x leaflet-bar leaflet-control leaflet-control-custom" style={this.selectButtonStyle()}
          onClick={this.activateSelection.bind(that)}></div>
        <svg
          ref="graph"
          width={this.props.w()}
          height={this.props.h()}
          onMouseDown={that.handleMouseDown.bind(that)}
          onMouseUp={that.handleMouseUp.bind(that)}
          onMouseMove={that.handleMouseMove.bind(that)}
          >
          <g
            pointer-events="all"
            transform={"translate(" + that.state.draggedX + "," + that.state.draggedY + ")scale(" + that.state.zoom + ")"}
          >
            <rect style={this.selectionRectStyle()}
              x={this.selectionX()} y={this.selectionY()} width={this.selectionW()} height={this.selectionH()} />
            {this.drawOverLinks()}
            {this.getLinks()}
            {this.drawOverNodes()}
            {this.getNodes()}
          </g>
        </svg>
      </div>
    )
  }
}

export default Graph;
