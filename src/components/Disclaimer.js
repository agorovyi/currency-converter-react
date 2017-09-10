import React, { Component } from 'react';
import { getData } from '../utils/api.js';

class Disclaimer extends Component {
  state = {
    data: [],
    toggle: false,
    isPending: true,
  };

  componentDidMount() {
    getData('CAD').then(response =>
      this.setState({
        data: response,
        isPending: false,
      })
    );
  }

  handleHoverOver = () => {
    this.setState({
      toggle: true,
    });
  };

  handleHoverOut = () => {
    this.setState({
      toggle: false,
    });
  };

  render() {
    const { data, isPending } = this.state;
    return (
      <div>
        <button
          className="slds-button slds-button_neutral"
          onMouseOver={this.handleHoverOver}
          onMouseOut={this.handleHoverOut}
        >
          Disclamer
        </button>

        <div
          className={
            'slds-popover slds-popover_tooltip slds-nubbin--top-right disclaimer ' +
            (this.state.toggle ? 'slds-fall-from-ground' : 'slds-fall-into-ground')
          }
          role="tooltip"
        >
          <div className="slds-popover__body">
            The latest rate is 1 CAD =&nbsp;
            {isPending ? (
              <span>Please wait the data is loading...</span>
            ) : (
              <span>
                $ {data.rates.USD.toFixed(2)} USD = &euro; {data.rates.EUR.toFixed(2)} EUR
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Disclaimer;
