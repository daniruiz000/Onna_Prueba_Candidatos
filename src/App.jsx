import { useState, useEffect } from 'react';
import { fetchDto } from './utils/fetchFunctions';
import { bateryDto } from './utils/bateryFunctions';

const App = () => {
  const [clientLocksData, setClientLocksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDto.getAllLocksByClientId();
      setClientLocksData(data.list || []);
    };

    fetchData();
  }, [clientLocksData]);

  return (
    <div>
      <h1>App Candidatos</h1>
      <div>
        <h2>Locks Data:</h2>
        {clientLocksData ? (
          <ul>
            {clientLocksData.map((lock) => (
              <li key={lock.lockId} style={{ marginBottom: '20px' }}>
                <h3>
                  {lock.lockAlias} - {lock.electricQuantity}%
                </h3>
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
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading locks...</p>
        )}
      </div>
    </div>
  );
};

export default App;
