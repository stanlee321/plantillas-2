import React from 'react';
import {HelloComp} from './hello';
import './App.css';

import { Button } from 'antd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hi</h1>
        <HelloComp/>
        <Button type="primary">Button</Button>
      </header>
    </div>
  );
}

export default App;
