import React from 'react';
import Panel from './components/panel';
import DataCollection from './collections/data';

let dataStore = new DataCollection();
dataStore.fetch();

React.render(<Panel dataStore={dataStore}/>, document.getElementById('main'));
