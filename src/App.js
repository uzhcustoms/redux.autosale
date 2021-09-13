import React from 'react';
import { useSelector } from 'react-redux';
import { selectHidden, selectAutoHidden } from './reducers/autoSlice';

import { Autos } from './components/Autos';
import { Filter } from './components/Filter';
import { EditAuto } from './components/EditAuto';
import { AddAuto } from './components/AddAuto';

import './App.css';
import logo from './img/car.png';

function App() {
   const hidden = useSelector(selectHidden);
   const autoHidden= useSelector(selectAutoHidden);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="60px%"/>
        <h2>AutoSale</h2>
      </header>
      <main>
           <AddAuto/>
        <div className="container">
          {autoHidden ? "" : <Filter />}
          {!hidden ? autoHidden ? "" : <Autos /> : autoHidden ? "" : <EditAuto />}
         
        </div>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
