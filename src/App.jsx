import Locks from './pages/Locks';
import Loading from './components/Loading';
import LockDetail from './pages/LockDetail';
import Login from './pages/Login';

import { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/locks" element={<Locks />} />
          <Route path="/lock/:id" element={<LockDetail />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
