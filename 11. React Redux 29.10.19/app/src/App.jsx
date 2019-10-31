import React from 'react';
import './App.css';
import { sortBy } from './utils';

import data from './data';
import Input from './components/Input'
import Tr from './components/Tr'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data,
      searchValue: ''
    }
  }


  onChange = (e) => {
    this.setState({
      searchValue: e.target.value,
      data: sortBy(data.filter((item) => item.name.toLowerCase().startsWith(e.target.value.toLowerCase()), 'height'))
    })
  } 

  render() {
    return (
      <div className="App">
        <Input value={this.state.searchValue} onChange={this.onChange} />
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {sortBy(this.state.data, 'height').map((item, index) => <Tr key={item.name} data={item} color={index === 0 ? 'red' : ''} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
