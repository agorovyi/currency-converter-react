import React, { Component } from 'react';
import fx from 'money';
import Disclaimer from './Disclaimer';

class Curcon extends Component {
  state = {
    valueFrom: 0,
    valueTo: 0,
    currFrom: this.props.base,
    currTo: 'CAD',
  };

  convert = (value, valfrom, valto) => {
    fx.rates = this.props.data.rates;
    const rate = fx(value)
      .from(valfrom)
      .to(valto)
      .toFixed(2);
    this.setState({ valueTo: rate });
  };

  handleFromInput = e => {
    const value = e.target.value;

    if (value === '' || value < 0) {
      this.setState({
        valueFrom: value,
        valueTo: 0,
      });
    } else {
      this.convert(value, this.state.currFrom, this.state.currTo);
      this.setState({
        valueFrom: value,
      });
    }
  };
  handleFromSelect = e => {
    this.convert(this.state.valueFrom, e.target.value, this.state.currTo);
    this.setState({
      currFrom: e.target.value,
    });
  };

  handleToSelect = e => {
    this.convert(this.state.valueFrom, this.state.currFrom, e.target.value);
    this.setState({
      currTo: e.target.value,
    });
  };

  render() {
    const { valueFrom, valueTo } = this.state;

    return (
      <div className="curcon">
        <article className="slds-card">
          <div className="slds-card__header slds-grid">
            <header className="slds-media slds-media_center slds-has-flexi-truncate">
              <div className="slds-media__body">
                <h2>
                  <span className="slds-text-heading_medium">{this.props.title}</span>
                </h2>
              </div>
            </header>
          </div>
          <div className="slds-card__body slds-card__body_inner">
            <div className="slds-form slds-form_compound">
              <fieldset className="slds-form-element">
                <legend className="slds-form-element__label slds-text-title">
                  Type in amount and select currency:
                </legend>
                <div className="slds-form-element__group">
                  <div className="slds-form-element__row">
                    <div className="slds-form-element slds-size_2-of-3">
                      <label className="slds-form-element__label" htmlFor={this.props.base + 'input-01'}>
                        From
                      </label>
                      {/* From Input */}
                      <input
                        type="number"
                        id={this.props.base + 'input-01'}
                        className="slds-input"
                        onChange={this.handleFromInput}
                        value={valueFrom}
                      />
                    </div>
                    <div className="slds-form-element slds-size_1-of-3">
                      <label className="slds-form-element__label" htmlFor={this.props.base + 'select-01'}>
                        Currency
                      </label>
                      <div className="slds-form-element__control">
                        <div className="slds-select_container">
                          {/* From Select */}
                          <select
                            className="slds-select"
                            id={this.props.base + 'select-01'}
                            onChange={this.handleFromSelect}
                          >
                            <option>{this.props.base}</option>
                            <option>{this.props.currency[0]}</option>
                            <option>{this.props.currency[1]}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="slds-form-element__row">
                    <div className="slds-form-element slds-size_2-of-3">
                      <span className="slds-form-element__label">To</span>
                      <div className="slds-form-element__control slds-border_bottom">
                        <span className="slds-form-element__static">{valueTo}</span>
                      </div>
                    </div>

                    <div className="slds-form-element slds-size_1-of-3">
                      <label className="slds-form-element__label" htmlFor={this.props.title + 'select-02'}>
                        Currency
                      </label>
                      <div className="slds-form-element__control">
                        <div className="slds-select_container">
                          {/* To Select */}
                          <select
                            className="slds-select"
                            id={this.props.title + 'select-02'}
                            onChange={this.handleToSelect}
                          >
                            <option>CAD</option>
                            <option>USD</option>
                            <option>EUR</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <footer className="slds-card__footer">
            <Disclaimer />
          </footer>
        </article>
      </div>
    );
  }
}

export default Curcon;
