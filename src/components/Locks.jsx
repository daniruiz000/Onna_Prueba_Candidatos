import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';

import LockItem from './LockItem';
import Separator from './Separator';

const Locks = () => {
  const [clientLocksData, setClientLocksData] = useState([]);
  const storedUsername = import.meta.env.VITE_REACT_APP_USERNAME;
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDto.getAllLocksByClientId();
      setClientLocksData(data.list);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="locks-container__text-box">
        <h2 className="locks-container__wellcome">Bienvenido</h2>
        <h2 className="locks-container__user-name">{storedUsername}</h2>
      </div>

      <Separator />
      <h2 className="locks-container__title">Tus Cerraduras Asociadas:</h2>
      <div className="locks-container">{clientLocksData && clientLocksData.map((lock) => <LockItem key={lock.lockId} lock={lock} />)}</div>
    </div>
  );
};

export default Locks;
