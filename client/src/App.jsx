import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserAuth from './pages/UserAuth';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<UserAuth />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
