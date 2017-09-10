import React, { Component } from 'react';
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';
import Curcon from './Curcon';
import { getData } from '../utils/api.js';

class App extends Component {
  state = {
    data: [],
    isPending: true,
  };

  componentDidMount() {
    getData('GBP').then(response =>
      this.setState({
        data: response,
        isPending: false,
      })
    );
  }

  render() {
    const { isPending, data } = this.state;
    return (
      <div className="slds-grid slds-grid_frame slds-wrap slds-grid_vertical-align-center slds-grid_align-space">
        {isPending ? (
          <h2> Loading </h2>
        ) : (
          <div className="slds-grid slds-grid_frame slds-wrap slds-grid_vertical-align-center slds-grid_align-space">
            <Curcon data={data} base="CAD" currency={['USD', 'EUR']} title="Currency Converter from CAD" />
            <Curcon data={data} base="USD" currency={['CAD', 'EUR']} title="Currency Converter from USD" />
            <Curcon data={data} base="EUR" currency={['CAD', 'CAD']} title="Currency Converter from EUR" />
          </div>
        )}
      </div>
    );
  }
}

export default App;
