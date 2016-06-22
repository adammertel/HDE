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
      zoom: 1
    }
    this.dragging = false
    this.dragOriginX = 0
    this.dragOriginY = 0

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
    this.loadData()
    this.setForce()
  }

  componentWillReceiveProps () {
    this.loadData()
    if (this.props.h() != this.lastH){
      this.setForce()
    }
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

  handleMouseDown (e) {
    this.dragOriginX = e.clientX
    this.dragOriginY = e.clientY
    this.dragging = true
  }

  handleMouseMove (e) {
    var that = this

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
      console.log('dragging')
    }
  }

  componentDidMount () {
    var graphEl = this.refs.graphSvg
    graphEl.addEventListener("mousewheel", this.handleScroll.bind(this), false);
  }

  handleScroll (e) {
    var zoom = this.state.zoom
    if (e.deltaY < 0) {
      zoom += 0.1
    }else{
      zoom -= 0.1
    }
    console.log(zoom)
    this.setState({zoom: zoom})
  }

  render() {
    var that = this
    return (
      <div className="component component-graph" >
        <svg
          ref="graphSvg"
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
