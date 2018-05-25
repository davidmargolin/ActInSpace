import React, { Component } from 'react';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app-page">
        <div className="app-header">
          <p className="app-head-text">Analytics Dashboard</p>
        </div>
        <div className="app-cont">
          <div className="rowA">
            <div className="invent-cont">
              <p className="invent-text">Inventory</p>
              <div></div>
            </div>
            <div className="trans-cont">
              <p className="trans-text">Latest Transactions</p>
              <div></div>
            </div>
          </div>
          <div className="cust-cont">
            <p className="cust-text">Customer Analytics</p>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
