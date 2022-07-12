import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './components/layout/Home'
import About from './components/layout/About'
import Gallery from './components/layout/Gallery'
import Contact from './components/layout/Contact'
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/my_portfolio" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
