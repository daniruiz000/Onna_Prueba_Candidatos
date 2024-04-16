import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';
import { bateryDto } from '../utils/bateryFunctions';

const Locks = () => {
  const [clientLocksData, setClientLocksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDto.getAllLocksByClientId();
      setClientLocksData(data.list || []);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h2>Cerraduras:</h2>
      {clientLocksData ? (
        clientLocksData.map((lock) => (
          <div key={lock.lockId}>
            <h3>{lock.lockAlias}</h3>
            <div
              style={{
                height: '20px',
                width: `${lock.electricQuantity}%`,
                backgroundColor: bateryDto.getBatteryColor(lock.electricQuantity),
                color: 'white',
                textAlign: 'center',
              }}
            >
              {lock.electricQuantity}%
            </div>
          </div>
        ))
      ) : (
        <p>Loading locks...</p>
      )}
    </div>
  );
};

export default Locks;
