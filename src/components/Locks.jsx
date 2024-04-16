import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';
import { bateryDto } from '../utils/bateryFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <div className="locks-container">
      <h2>Cerraduras:</h2>
      {clientLocksData.length > 0 ? (
        clientLocksData.map((lock) => (
          <div key={lock.lockId} className="lock-item">
            <h3 className="lock-alias">{lock.lockAlias}</h3>
            <div className="battery-container">
              <FontAwesomeIcon icon={bateryDto.getBatteryIcon(lock.electricQuantity)} />
              <div className="battery">
                <div
                  className="level"
                  style={{ width: `${lock.electricQuantity}%`, backgroundColor: bateryDto.getBatteryColor(lock.electricQuantity) }}
                >
                  {lock.electricQuantity}%
                </div>
              </div>
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
