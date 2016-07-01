import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

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

    var appStyle = this.props.app.state.style

    this.defaultLinkStyle = {
      "strokeWidth": appStyle.defaultLinks.strokeWidth,
      "strokeOpacity": appStyle.defaultLinks.strokeOpacity
    }
    var defaultLinkClone = _.clone(this.defaultLinkStyle)
    this.overLinkStyle = _.clone(_.assign(defaultLinkClone, {
      "strokeOpacity": appStyle.overLinks.strokeOpacity,
      "strokeWidth": appStyle.overLinks.strokeWidth,
      "stroke": appStyle.overLinks.strokeColor
    }))
    this.selectedLinkStyle = _.clone(_.assign(defaultLinkClone, {
      "strokeWidth": appStyle.selectedLinks.strokeWidth,
      "strokeOpacity": appStyle.selectedLinks.strokeOpacity
    }))

    this.defaultNodeStyle = {
      "stroke": appStyle.defaultNodes.strokeColor,
      "stroke-width": appStyle.defaultNodes.strokeWidth,
      "strokeOpacity": appStyle.defaultNodes.strokeOpacity,
      "fillOpacity": appStyle.defaultNodes.fillOpacity
    }
    var defaultNodeClone = _.clone(this.defaultNodeStyle)
    this.overNodeStyle = _.clone(_.assign(defaultNodeClone, {
      "stroke-width": appStyle.overNodes.strokeWidth,
      "fill": appStyle.overNodes.fillColor,
      "fillOpacity": appStyle.overNodes.fillOpacity
    }))
    this.selectedNodeStyle = _.clone(_.assign(defaultNodeClone, {
      "stroke-width": appStyle.selectedNodes.strokeWidth,
      "strokeOpacity": appStyle.selectedNodes.strokeOpacity,
      "fillOpacity": appStyle.selectedNodes.fillOpacity
    }))
  }

  componentWillMount () {
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

  loadData() {
    let that = this
    let nodes = this.getNodes()
    let links = this.getLinks()

    this.setState({nodes: nodes, links: links})
  }

  nodeStyle(node) {
    let style = _.clone(this.defaultNodeStyle)
    if (node.selected){ style = _.clone(this.selectedNodeStyle) }
    style['fill'] = this.props.app.getGroupColor(node)
    return style
  }

  onNodeOver(e) {
    this.props.app.setOver([parseInt(e.target.id)], true)
  }

  onNodeOut(e) {
    this.props.app.deOver(true)
  }

  getNodes() {
    let that = this

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
    let that = this
    return this.props.app.getData().links.map(function (link, index) {
      if (link.over){
        return <Link
          source={link.source}
          target={link.target}
          key={index}
          style={that.overLinkStyle} />
      }
    })
  }

  linkStyle(link) {
    let style = _.clone(this.defaultLinkStyle)
    if (link.selected){ style = _.clone(this.selectedLinkStyle) }
    style['stroke'] = this.props.app.getTypeColor(link)
    return style
  }

  getLinks () {
    let that = this
    let links = this.props.app.getData().links.map(function (link, index) {
      return (<Link
        source={link.source}
        target={link.target}
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

  componentDidMount () {
    let graphEl = this.refs.graph
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
