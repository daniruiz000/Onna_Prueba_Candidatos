import Locks from './pages/Locks';
import LockDetail from './pages/LockDetail';
import Login from './pages/Login';

import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/locks" element={<Locks />} />
        <Route path="/lock/:id" element={<LockDetail />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
