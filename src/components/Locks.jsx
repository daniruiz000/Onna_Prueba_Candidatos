import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';
import { getBatteryIconAndColor } from '../utils/bateryFunctions';
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
        clientLocksData.map((lock) => {
          const { icon, color } = getBatteryIconAndColor(lock.electricQuantity);
          return (
            <div key={lock.lockId} className="lock-item">
              <h3 className="lock-alias">{lock.lockAlias}</h3>
              <div className="battery-container">
                <FontAwesomeIcon icon={icon} style={{ color: color, fontSize: '50px' }} />
                {lock.electricQuantity}%
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading locks...</p>
      )}
    </div>
  );
};

export default Locks;
