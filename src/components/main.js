import React from 'react';
import StackedBarChart from './stacked-bar-chart';

export default React.createClass({
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <StackedBarChart />
        </div>
      </div>
    );
  }
});
