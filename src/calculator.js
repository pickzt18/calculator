import React, { Component } from 'react';
import * as math from 'mathjs';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      currentVal: ''
    };
    this.handleClickNumbers = this.handleClickNumbers.bind(this);
    this.handleClickActions = this.handleClickActions.bind(this);
    this.equals = this.equals.bind(this);
  }
  handleClickNumbers = e => {
    var temp = e.target.value;
    this.state.display === '0'
      ? this.setState({
          display: temp,
          currentVal: temp
        })
      : this.state.currentVal.includes('.') !== true
        ? this.setState(prevState => ({
            display: (prevState.display += temp),
            currentVal: (prevState.currentVal += temp)
          }))
        : e.target.value === '.'
          ? console.log('fail')
          : this.setState(prevState => ({
              display: (prevState.display += temp),
              currentVal: (prevState.currentVal += temp)
            }));
  };
  handleClickActions = e => {
    var temp = e.target.value;
    this.setState(prevState => ({
      display: (prevState.display += temp),
      currentVal: '0'
    }));
  };
  clear = () => {
    this.setState({
      display: '0',
      total: 0
    });
  };
  equals = () => {
    var regex = /[-+*/]+/g;
    var temp = this.state.display.match(regex);
    for (var i = 0; i < temp.length; i++) {
      var replaced = temp[i];
      replaced = this.state.display.replace(
        temp[i],
        replaced[replaced.length - 1]
      );
      this.setState(prevState => ({
        display: math.eval(replaced)
      }));
    }
  };
  render() {
    return (
      <div className="container">
        <div id="display">{this.state.display}</div>
        <div className="top-row buttons-row">
          <button className='btn' id="clear" onClick={this.clear}>
            clear
          </button>
          <button className='btn' id="multiply" value="*" onClick={this.handleClickActions}>
            *
          </button>
          <button className='btn' id="divide" value="/" onClick={this.handleClickActions}>
            /
          </button>
        </div>
        <div className="numbers">
          <div className="num-top buttons-row">
            <button className='btn' id="one" value="1" onClick={this.handleClickNumbers}>
              1
            </button>
            <button className='btn' id="two" value="2" onClick={this.handleClickNumbers}>
              2
            </button>
            <button className='btn' id="three" value="3" onClick={this.handleClickNumbers}>
              3
            </button>
            <button className='btn' id="add" value="+" onClick={this.handleClickActions}>
              +
            </button>
          </div>
          <div className="num-mid buttons-row">
            <button className='btn' id="four" value="4" onClick={this.handleClickNumbers}>
              4
            </button>
            <button className='btn' id="five" value="5" onClick={this.handleClickNumbers}>
              5
            </button>
            <button className='btn' id="six" value="6" onClick={this.handleClickNumbers}>
              6
            </button>
            <button className='btn' id="subtract" value="-" onClick={this.handleClickActions}>
              -
            </button>
          </div>
          <div className="num-bot buttons-row">
            <button className='btn' id="seven" value="7" onClick={this.handleClickNumbers}>
              7
            </button>
            <button className='btn' id="eight" value="8" onClick={this.handleClickNumbers}>
              8
            </button>
            <button className='btn' id="nine" value="9" onClick={this.handleClickNumbers}>
              9
            </button>
            <button className='btn' id="equals" value="=" onClick={this.equals}>
              =
            </button>
          </div>
          <div className="others buttons-row">
            <button className='btn' id="zero" value="0" onClick={this.handleClickNumbers}>
              0
            </button>
            <button className='btn' id="decimal" value="." onClick={this.handleClickNumbers}>
              .
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Calculator;
