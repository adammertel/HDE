import React from 'react'

class AppHeader extends React.Component {

  render() {
    var that = this
    return (
      <div>
        <h3><b>HISTORICAL DATA EXPLORATION </b> TOOL</h3>
        <h5><small>experimental prototype of application for testing the </small>concept of <b>linking forms of visualization </b> for the purpose of <b> historical research</b></h5>
        <h6><b> - Adam Mertel</b> &lt;mertel.adam@gmail.com&gt; <small> programming, visualization</small> </h6>
        <h6><b> - Jan Škvrňák</b> &lt;jan.skvrnak@gmail.com&gt; <small> historical research, data</small> </h6>
        <h6> - Masaryk University <small>Brno, 2016</small></h6>
      </div>
    );
  }
}

export default AppHeader;
