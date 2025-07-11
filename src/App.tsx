import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './components/layout/Home'
import About from './components/layout/About'
import Gallery from './components/layout/Gallery'
import Contact from './components/layout/Contact'
import Comments from './components/layout/Comments/Comments'
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/my_portfolio/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/my_portfolio/about" element={<About />} />
          <Route path="/my_portfolio/gallery" element={<Gallery />} />
          <Route path="/my_portfolio/contact" element={<Contact />} />
          <Route path="/my_portfolio/comments" element={<Comments />} />
        </Route>
      </Routes>
  );
}

export default App;
