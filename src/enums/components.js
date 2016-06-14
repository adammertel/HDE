import Graph from '../components/graph/graph.jsx!';
import Map from '../components/map/map.jsx!';
import Timeline from '../components/timeline/timeline.jsx!';
import Menu from '../components/menu/menu.jsx!';
import Detail from '../components/detail/detail.jsx!';

var Components = {
  GRAPH: {
    component: Graph,
    label: 'graph'
  },
  MAP: {
    component: Map,
    label: 'map'
  },
  TIMELINE: {
    component: Timeline,
    label: 'timeline'
  },
  MENU: {
    component: Menu,
    label: 'menu'
  },
  DETAIL: {
    component: Detail,
    label: 'detail'
  }
}

export default Components;
