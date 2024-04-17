import Locks from './components/Locks';
import LockDetail from './components/LockDetail';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

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
