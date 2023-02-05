import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import ProtectedRoutes from './ProtectedRoutes';

let token = false;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoutes token={token}/>} >
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
