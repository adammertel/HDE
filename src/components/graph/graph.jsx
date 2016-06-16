import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

import Node from './node.jsx!'
import Link from './link.jsx!'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    this.overNodeStyle = {
      opacity: 1
    }

    this.selectedNodeStyle = {
      strokeWidth: 3
    }

    this.overLinkStyle = {
      opacity: 1
    }

    this.selectedLinkStyle = {
      strokeWidth: 4
    }
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

    if (node.over){ style = _.assign(style, this.overNodeStyle)}
    if (node.selected){ style = _.assign(style, this.selectedNodeStyle)}
    return style
  }

  onNodeOver(e) {
    this.props.app.setOver(e.target.id)
  }

  onNodeOut(e) {
    this.props.app.deOver()
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
      <div className="component component-graph" style={this.style()}>
        <svg
          width={this.props.w()}
          height={this.props.h()}>
          {this.getLinks()}
          {this.getNodes()}
        </svg>
      </div>
    );
  }
}

export default Graph;
