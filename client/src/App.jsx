import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserAuth from './pages/UserAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
