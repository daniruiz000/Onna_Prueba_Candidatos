import { useState, useEffect } from 'react';
import { fetchDto } from './utils/fetchFunctions';

const App = () => {
  const [clientLocksData, setClientLocksData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDto.getAllLocksByClientId();
        // Asegúrate de establecer el estado con la propiedad 'list' de la respuesta
        setClientLocksData(data.list || []); // Usamos || [] para manejar casos donde 'list' no está disponible
      } catch (error) {
        setError(error.message);
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

  const getBatteryColor = (percentage) => {
    if (percentage > 75) return 'green';
    if (percentage > 50) return 'yellow';
    if (percentage > 25) return 'orange';
    return 'red';
  };

  return (
    <div>
      <h1>App Candidatos</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
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
                      backgroundColor: getBatteryColor(lock.electricQuantity),
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
      )}
    </div>
  );
};

export default App;
