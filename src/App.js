import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Error from "./pages/Error";

import TransIndex from "./components/TransIndex";
import TransShow from './components/TransShow';
import TransEdit from './components/TransEdit';
import TransNew from './components/TransNew';

function App() {

  const [total, setTotal] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        Transaction Trackr
      </header>
      <NavBar total={total} setTotal={setTotal} />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/transactions' element={<TransIndex total={total} setTotal={setTotal} />} />
          <Route path='/transactions/:index' element={<TransShow />} />
          <Route path='/transactions/new' element={<TransNew />} />
          <Route path='/transactions/:index/edit' element={<TransEdit />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
