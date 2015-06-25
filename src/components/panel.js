import React from 'react';
import StackedBarChart from './stacked-bar-chart';

let showErrorsOnly = false;

export default React.createClass({
  propTypes: {
    dataStore: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      data: this.fetchData()
    }
  },

  componentDidMount() {
    this.props.dataStore.on('sync', this._onDataSync);
  },

  componentWillUnmount() {
    this.props.dataStore.off();
  },

  fetchData() {
    let keys = showErrorsOnly ? ['errors'] : [];
    return this.props.dataStore.getData(...keys);
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <StackedBarChart data={this.state.data}/>
        </div>
        <div className="panel-footer">
          <button
            className="btn btn-primary"
            onClick={this._onButtonClick}>Toggle Data</button>
        </div>
      </div>
    );
  },

  _onButtonClick() {
    showErrorsOnly = !showErrorsOnly;
    this.setState({
      data: this.fetchData()
    });
  },

  _onDataSync() {
    this.setState({
      data: this.fetchData()
    });
  }
});
