import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';

import LockItem from '../components/lock/LockItem';
import Separator from '../components/Separator';
import Header from '../components/Header';

const Locks = () => {
  const username = import.meta.env.VITE_REACT_APP_USERNAME;

  const [clientLocksData, setClientLocksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDto.getAllLocksByClientId();
      setClientLocksData(data.list);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />

      <div className="locks-container__text-box">
        <h2 className="locks-container__wellcome">Bienvenido</h2>
        <h2 className="locks-container__user-name">{username}</h2>
      </div>

      <Separator />

      <h2 className="locks-container__title">Tus Cerraduras Asociadas:</h2>
      <div className="locks-container">{clientLocksData && clientLocksData.map((lock) => <LockItem key={lock.lockId} lock={lock} />)}</div>
    </div>
  );
};

export default Locks;
