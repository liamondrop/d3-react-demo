import React from 'react';
import Chart from './chart';

const totalData = [];
const errorsOnlyData = [];

export default React.createClass({
  getInitialState() {
    return {
      errorsOnly: false
    }
  },

  aggregateAppropriateData() {
    if (this.state.errorsOnly) {
      return errorsOnlyData;
    }
    return totalData;
  },

  render() {
    return (
      <div>
        <Chart
          type='StackedBarChart'
          data={this.aggregateAppropriateData()}
          options={{
            height: 500,
            width: 960,
            margin: {
              left: 50,
              top: 20,
              right: 20,
              bottom: 30
            }
          }}
        />
      </div>
    );
  },

  _onToggleErrorsOnly() {
    this.setState({
      errorsOnly: !this.state.errorsOnly
    });
  }
});