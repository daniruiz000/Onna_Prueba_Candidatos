import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';
import LockItem from './LockItem';

const Locks = () => {
  const [clientLocksData, setClientLocksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDto.getAllLocksByClientId();
      setClientLocksData(data.list);
    };

    fetchData();
  }, []);

  return (
    <div className="locks-container">
      <h2 className="locks-container__title">Cerraduras:</h2>
      {clientLocksData ? clientLocksData.map((lock) => <LockItem key={lock.lockId} lock={lock} />) : <p>Loading locks...</p>}
    </div>
  );
};

export default Locks;
