import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AmazonCart from './components/AmazonCart';
import WishList from './components/WishList';

import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<WishList />}></Route>
        <Route path={'/cart'} element={<AmazonCart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
