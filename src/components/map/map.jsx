import React from 'react';
import L from 'leaflet';
import _ from 'lodash'

class Map extends React.Component {

  constructor (props) {
    super(props)

    this.markers = []

    this.overStyle = {
      fillOpacity: 1
    }

    this.selectedStyle = {
      weight: 3
    }
  }

  style() {
    return {
      'backgroundColor': 'lightgreen'
    }
  }

  componentWillReceiveProps () {
    this.loadData()
    this.map.invalidateSize(true)
  }

  componentDidMount () {
    this.setMap()
    this.loadData()
  }



  setMap() {

    var wms = function(url, layer) {
      return L.tileLayer.wms(url, {layers: layer, format: 'image/png', transparent: true, version: '1.3.0', opacity: 0.2})
    }

    var mapEl = this.refs.map
    var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors', opacity: 0.2})

    var baseMaps = {
      'OSM': osm,
      'Satellite': wms('http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?', 'GR_ORTFOTORGB'),
      'Base map 1:10 000': wms('http://geoportal.cuzk.cz/WMS_ZM10_PUB/WMService.aspx?', 'GR_ZM10'),
      'LIDAR': wms('http://geoportal.cuzk.cz/WMS_TEREN/WMService.aspx', 'GR_TEREN'),
    }

    var map = this.map = L.map(mapEl, {layers: osm}).setView([49, 17], 8);
    L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(this.map);


    var controlSelect = L.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'fa fa-hand-o-down fa-2x leaflet-bar leaflet-control leaflet-control-custom');

        container.style.backgroundColor = 'white';
        container.style.width = '30px';
        container.style.height = '30px';
        container.style.cursor = 'pointer';
        container.style.padding = '3px';

        container.onclick = function(){
          console.log('buttonClicked');
        }
        return container;
      },

    });

    this.map.addControl(new controlSelect());
  }

  onMorkerOver (marker, e) {
    this.props.app.setOverNode(marker.options.id)
  }


  onMarkerOut (marker, e) {
    this.props.app.deOverNodes()
  }

  onMarkerClick (marker, e) {
    console.log(e)
  }

  styleOverNode (nodeStyle) {
    return _.assign(nodeStyle, this.overStyle)
  }

  styleSelectedNode (nodeStyle) {
    return _.assign(nodeStyle, this.selectedStyle)
  }

  defaultNodeStyle (node) {
    return {
      id: node.id,
      radius: 5,
      color: 'black',
      fillColor: this.props.app.getGroupColor(node.group),
      opacity: 0.5,
      fillOpacity: 0.3,
      weight: 1
    }
  }

  clearMap() {
    var that = this
    this.markers.map(function (marker, m) {
      that.map.removeLayer(marker)
    })
    this.markers = []
  }

  loadData() {
    var that = this
    this.clearMap()
    this.props.app.getData().nodes.map(function (node, index) {

      var style = that.defaultNodeStyle(node)
      if (node.over){ style = that.styleOverNode(style)}
      if (node.selected){ style = that.styleSelectedNode(style)}

      var marker = L.circleMarker(node.coords, style).addTo(that.map)

      that.markers.push(marker)
      marker.on('mouseover', function (e) {
        that.onMorkerOver(this, e)
      })

      marker.on('mouseout', function (e) {
        that.onMarkerOut(this, e)
      })

      marker.on('mouseclick', function (e) {
        that.onMarkerClick(this, e)
      })
    })

  }

  onMapClick() {
      // Do some wonderful map things...
  }

  render() {
    return (
      <div className="component component-map" style={this.style()}>
        <div ref="map" className="map"/>
      </div>
    );
  }
}

export default Map;
