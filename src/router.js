import Router from 'ampersand-router';
import React from 'react';
import Main from './components/main';

export default Router.extend({
  routes: {
    '': 'chart',
    '*notFound': 'notFound'
  },

  renderPage(props={}) {
    React.render(<Main {...props}/>, document.getElementById('main'));
  },

  chart() {
    this.renderPage({chart: 'StackedBarChart'});
  },

  notFound() {
    console.log('NOT FOUND');
  }
});
