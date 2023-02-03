import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />} >
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
