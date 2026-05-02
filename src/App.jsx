import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Impact from './pages/Impact';
import Navbar from './components/Navbar';
import Background from './components/Background';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <Background /> 
      <Navbar /> 
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impact" element={<Impact />} />
      </Routes>
    </Router>
  );
}

export default App;