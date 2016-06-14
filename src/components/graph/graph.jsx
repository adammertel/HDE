import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

import Node from './node.jsx!'
import Link from './link.jsx!'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      links: [],
      width: 300,
      height: 300
    }

    this.overStyle = {
      opacity: 1
    }

    this.selectedStyle = {
      strokeWidth: 3
    }
  }

  componentDidMount () {
    this.loadData()
    this.setForce()
  }

  componentWillReceiveProps () {
    this.loadData()
  }

  setForce () {
    var self = this

    let nodesData = this.props.app.getData().nodes
    let linksData = this.props.app.getData().links
    this.force = d3.layout.force()
      .charge(-120)
      .linkDistance(15)
      .size([this.state.width, this.state.height])
      .nodes(nodesData)
      .links(linksData)
      .start()

    this.force.on("tick", function (tick, b, c) {
      self.forceUpdate()
    })

  }

  style() {
    return {
      'backgroundColor': 'white'
    }
  }

  loadData() {
    var that = this
    var nodes = this.getNodes()
    var links = this.getLinks()

    this.setState({nodes: nodes, links: links})
  }

  nodeStyle(node) {
    var style = {
      fill: this.props.app.getGroupColor(node.group),
      stroke: '#000',
      strokeWidth: '1px',
      opacity: 0.5
    }

    if (node.over){ style = _.assign(style, this.overStyle)}
    if (node.selected){ style = _.assign(style, this.selectedStyle)}
    return style
  }

  onNodeOver(e) {
    this.props.app.setOverNode(e.target.id)
  }

  onNodeOut(e) {
    this.props.app.deOverNodes()
  }

  getNodes() {
    var that = this
    var nodes = this.props.app.getData().nodes.map(function (node, index) {
      return (<Node
        id={node.id}
        key={node.id}
        x={node.x}
        y={node.y}
        onmouseover={that.onNodeOver.bind(that)}
        onmouseout={that.onNodeOut.bind(that)}
        style={that.nodeStyle(node)}
        />)
      })

    return nodes;
  }

  getLinks () {
    var that = this
    var links = this.props.app.getData().links.map(function (link, index) {
      return (<Link
        source={link.source}
        target={link.target}
        value={link.value}
        key={index}
        color={that.props.app.getTypeColor(link.type)}
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
      <div className="component component-graph" style={this.style()}>
        <svg
          width={this.state.width}
          height={this.state.height}>
          {this.getLinks()}
          {this.getNodes()}
        </svg>
      </div>
    );
  }
}

export default Graph;
