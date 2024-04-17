import Locks from './components/Locks';
import LockDetail from './components/LockDetail';

import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Locks />} />
        <Route path="/lock/:id" element={<LockDetail />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
