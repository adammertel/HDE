import _ from 'lodash'

var Styles = {
  graph: {
    nodes: {
      default: function(appStyle) {
        return _.clone({
          "stroke-width": appStyle.defaultNodes.strokeWidth,
          "strokeOpacity": appStyle.defaultNodes.strokeOpacity,
          "stroke": appStyle.defaultNodes.strokeColor,
        })
      },
      over: function(appStyle) {
        let defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "stroke-width": appStyle.overNodes.strokeWidth,
          "fill": appStyle.overColor,
          "fillOpacity": appStyle.overNodes.fillOpacity
        }))
      },
      selected: function(appStyle) {
        let defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "stroke-width": appStyle.selectedNodes.strokeWidth,
          "strokeOpacity": appStyle.selectedNodes.strokeOpacity,
          "fillOpacity": appStyle.selectedNodes.fillOpacity
        }))
      }
    },
    links: {
      default: function(appStyle) {
        return _.clone({
          "strokeWidth": appStyle.defaultLinks.strokeWidth,
          "strokeOpacity": appStyle.defaultLinks.strokeOpacity
        })
      },
      over: function(appStyle) {
        const defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "strokeOpacity": appStyle.overLinks.strokeOpacity,
          "strokeWidth": appStyle.overLinks.strokeWidth,
          "stroke": appStyle.overColor
        }))
      },
      selected: function(appStyle) {
        const defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "strokeWidth": appStyle.selectedLinks.strokeWidth,
          "strokeOpacity": appStyle.selectedLinks.strokeOpacity
        }))
      }
    }
  },
  map: {
    default: function(appStyle) {
      return _.clone({
        radius: appStyle.defaultNodes.radius,
        color: appStyle.defaultNodes.strokeColor,
        opacity: appStyle.defaultNodes.strokeOpacity,
        fillOpacity: appStyle.defaultNodes.fillOpacity,
        weight: appStyle.defaultNodes.strokeWidth
      })
    },
    over: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        fillOpacity: appStyle.overNodes.fillOpacity,
        fillColor: appStyle.overColor,
        weight: appStyle.overNodes.fillOpacity,
        radius: appStyle.overNodes.radius,
      }))
    },
    selected: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        fillOpacity: appStyle.selectedNodes.fillOpacity,
        opacity: appStyle.selectedNodes.strokeOpacity,
        weight: appStyle.selectedNodes.strokeWidth
      }))
    }
  },
  timeline: {
    default: function(appStyle) {
      return _.clone({
        "strokeWidth": '0px',
        "fill": appStyle.timeline.fillColor,
        "opacity": appStyle.defaultNodes.strokeOpacity
      })
    },
    over: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        "opacity": appStyle.overNodes.strokeOpacity,
        "strokeWidth": appStyle.timeline.overStrokeWidth,
        "stroke": appStyle.overColor,
        "strokeLocation": appStyle.timeline.strokeLocation
      }))
    },
    selected: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        "opacity": appStyle.selectedNodes.strokeOpacity
      }))
    }
  }
}

export default Styles;
