import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';

const LockDetail = () => {
  const { id } = useParams();
  const [actualLock, setActualLock] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDto.getLockDetailById(id);
      setActualLock(data);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Detalles de la Cerradura:</h2>
      <h2>{actualLock.lockAlias}</h2>
      {actualLock ? (
        <div>
          <p>
            <strong>ID:</strong> {actualLock.lockId}
          </p>
          <p>
            <strong>Alias:</strong> {actualLock.lockAlias}
          </p>
          <p>
            <strong>MAC Address:</strong> {actualLock.lockMac}
          </p>
          <p>
            <strong>Modelo:</strong> {actualLock.modelNum}
          </p>
          <p>
            <strong>Batería:</strong> {actualLock.electricQuantity}%
          </p>
          <p>
            <strong>Firmware:</strong> {actualLock.firmwareRevision}
          </p>
          <p>
            <strong>Revisión Hardware:</strong> {actualLock.hardwareRevision}
          </p>
          <p>
            <strong>Privacidad Activada:</strong> {actualLock.privacyLock ? 'Sí' : 'No'}
          </p>
          <p>
            <strong>Auto-lock (segundos):</strong> {actualLock.autoLockTime}
          </p>
        </div>
      ) : (
        <p>Cargando detalles de la cerradura...</p>
      )}
    </div>
  );
};

export default LockDetail;
