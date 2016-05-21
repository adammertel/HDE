import React from 'react';

import Map from './map/map.jsx!';
import Graph from './graph/graph.jsx!';
import Menu from './menu/menu.jsx!';
import Timeline from './timeline/timeline.jsx!';
import Panel from './panel/panel.jsx!';

import Components from '../enums/components';

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      components: [
        {
          id: 1,
          type: 'GRAPH',
          width: 500,
          height: 500,
          x: 200,
          y: 300
        }
      ],
      window: {
        width: 0,
        height: 0
      }
    }
  }

  findComponent (componentId) {
    var foundComponent = false

    this.state.components.map(function(component){
      if (component.id == componentId) {
        foundComponent = component
      }
    })

    return foundComponent
  }

  moveComponent (componentId, dX, dY) {
    let component = this.findComponent(componentId)

    if (component){
      component.x += dX
      component.y += dY
      this.setState({'components': this.state.components})
    }
  }

  render () {
    let that = this
    return (
      <div>
        <Menu />
        {
          this.state.components.map(function(component){
            let componentState = {
              width: component.width,
              height: component.height,
              x: component.x,
              y: component.y,
              id: component.id,
              app: that
            }

            let componentEl = React.createElement(Components[component.type].component)
            let panel = React.createElement(Panel, componentState, componentEl)
            return panel;
          })
        }
      </div>
    );
  }
}

export default App;
