import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

import Node from './node.jsx!'
import Link from './link.jsx!'

class Graph extends React.Component {
  constructor (props) {
    super(props)

    this.defaultLinkStyle = {
      "stroke": '#000',
      "strokeWidth": '1px',
      "opacity": 0.5
    }
    this.overLinkStyle = _.assign(this.defaultNodeStyle, {
      "opacity": 1
    })
    this.selectedLinkStyle = _.assign(this.defaultNodeStyle, {
      "strokeWidth": 4,
      "opacity": .7
    })

    this.defaultNodeStyle = {
      "stroke": '#000',
      "stroke-width": '1px',
      "fillOpacity": 0.5,
      "strokeOpacity": 0.5
    }
    var defaultNodeClone = _.clone(this.defaultNodeStyle)
    this.overNodeStyle = _.clone(_.assign(defaultNodeClone, {
      "fillOpacity": 0.3,
      "strokeOpacity": 0,
      "stroke-width": 0,
      "fill": 'orange'
    }))
    this.selectedNodeStyle = _.clone(_.assign(defaultNodeClone, {
      "stroke-width": '3px',
      "fillOpacity": 1,
      "strokeOpacity": 1
    }))
    console.log(this.overNodeStyle)

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
    var self = this
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
      self.forceUpdate()
    })
  }

  loadData() {
    var that = this
    var nodes = this.getNodes()
    var links = this.getLinks()

    this.setState({nodes: nodes, links: links})
  }

  nodeStyle(node) {
    var style = {}
    if (node.selected){
      style = _.clone(this.selectedNodeStyle)
    }else{
      style = _.clone(this.defaultNodeStyle)
    }
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

  drawOverNode() {
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

  linkStyle(link) {
    var style = {
      stroke: this.props.app.getTypeColor(link.type),
      strokeWidth: 2,
      opacity: 0.4
    }

    if (link.over){ style = _.assign(style, this.overLinkStyle)}
    if (link.selected){ style = _.assign(style, this.selectedLinkStyle)}

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

  render() {
    return (
      <div className="component component-graph" >
        <svg
          width={this.props.w()}
          height={this.props.h()}>
          {this.getLinks()}
          {this.drawOverNode()}
          {this.getNodes()}
        </svg>
      </div>
    );
  }
}

export default Graph;
