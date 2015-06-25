import React from 'react';
import Chart from './chart';

export default React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div className="chart">
        <Chart
          type="StackedBarChart"
          data={this.props.data}
          options={{
            height: 500,
            width: 960,
            margin: {
              left: 50,
              top: 20,
              right: 20,
              bottom: 30
            },
            yaxis: {
              orientation: 'right'
            },
            allTypes: ['errors', 'successes']
          }}
        />
      </div>
    );
  }
});