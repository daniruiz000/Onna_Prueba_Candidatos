import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { fetchDto } from '../utils/fetchFunctions';
import Battery from './Battery';

const LockDetail = () => {
  const { id } = useParams();
  const [actualLock, setActualLock] = useState(null);
  const [lockPasswords, setLockPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passwordType, setPasswordType] = useState('2'); // Default type: permanent
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [passwordName, setPasswordName] = useState(''); // Optional name for the password

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const lockDetails = await fetchDto.getLockDetailById(id);
      const passwordData = await fetchDto.getLockPasswords(id);
      setActualLock(lockDetails);
      setLockPasswords(passwordData.list || []);
      setLoading(false);
      setError('');
    } catch (err) {
      setError('Fallo al Recibir los datos: ' + err.message);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeletePassword = async (passID) => {
    try {
      const result = await fetchDto.deleteLockPassword(id, passID, 2);
      if (result.errcode === 0) {
        fetchData();
      } else {
        throw new Error('Fallo al Borrar la Contraseña: ' + result.errmsg);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreatePassword = async () => {
    if (!startDate || !endDate) {
      setError('Por favor, proporciona todos los campos requeridos correctamente.');
      return;
    }
    try {
      const result = await fetchDto.generateLockPassword(
        id,
        passwordType,
        passwordName,
        new Date(startDate).toISOString(),
        new Date(endDate).toISOString()
      );
      if (result.keyboardPwdId) {
        fetchData();
      } else {
        throw new Error('Fallo al Crear la Contraseña: ' + (result.errmsg || 'No error message'));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getTypeDescription = (type) => {
    switch (type) {
      case 1:
        return 'Una vez';
      case 2:
        return 'Permanente';
      case 3:
        return 'Por un período';

      default:
        return 'Desconocido';
    }
  };

  if (loading) return <p className="lock-detail__loading">Cargando detalles de la cerradura...</p>;
  if (error) return <p className="lock-detail__error">Error: {error}</p>;
  if (!actualLock) return <p className="lock-detail__not-found">No se encontraron detalles para la cerradura.</p>;

  return (
    <div className="lock-detail">
      <div className="lock-detail__container">
        <h3 className="lock-detail__alias">{actualLock.lockAlias}</h3>
        <p className="lock-detail__model">
          <strong>Modelo:</strong> {actualLock.modelNum}
        </p>
        <p className="lock-detail__battery">
          <strong>Batería:</strong> {actualLock.electricQuantity}%
        </p>
        <p className="lock-detail__privacy">
          <strong>Privacidad Activada:</strong> {actualLock.privacyLock ? 'Sí' : 'No'}
        </p>
        <p className="lock-detail__auto-lock">
          <strong>Auto-lock (segundos):</strong> {actualLock.autoLockTime}
        </p>
        <Battery electricQuantity={actualLock.electricQuantity} />
      </div>

      <div className="lock-detail__passwords-content">
        <h4 className="lock-detail__passwords-title">CONTRASEÑAS ASOCIADAS:</h4>
        <ul className="lock-detail__passwords-list">
          {lockPasswords.map((pwd) => (
            <li key={pwd.keyboardPwdId} className="lock-detail__password-item">
              <div className="lock-detail__password-property">
                Nombre:
                <span className="lock-detail__password-value">{pwd.keyboardPwdName || pwd.keyboardPwdId}</span>
              </div>
              <div className="lock-detail__password-property">
                Password:
                <span className="lock-detail__password-value">{pwd.keyboardPwd}</span>
              </div>
              <div className="lock-detail__password-property">
                Acceso:
                <span className="lock-detail__password-value">{getTypeDescription(pwd.keyboardPwdType)}</span>
              </div>
              <div className="lock-detail__password-property">
                Fecha de Activación:
                <span className="lock-detail__password-value">{fetchDto.formatTimestamp(pwd.startDate)}</span>
              </div>
              <div className="lock-detail__password-property">
                Fecha de Desactivación:
                <span className="lock-detail__password-value">{fetchDto.formatTimestamp(pwd.endDate)}</span>
              </div>
              <button onClick={() => handleDeletePassword(pwd.keyboardPwdId)} className="lock-detail__password-delete">
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        <div className="lock-detail__new-password">
          <h4 className="lock-detail__new-password-title">Crear Nueva Contraseña:</h4>
          <div className="lock-detail__new-password-inputs">
            <input
              type="text"
              value={passwordName}
              onChange={(e) => setPasswordName(e.target.value)}
              placeholder="Nombre de la contraseña (opcional)"
              className="lock-detail__new-password-name"
            />
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Fecha de inicio"
              className="lock-detail__new-password-start-date"
            />
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Fecha de fin"
              className="lock-detail__new-password-end-date"
            />
            <select
              value={passwordType}
              onChange={(event) => setPasswordType(event.target.value)}
              className="lock-detail__new-password-type"
            >
              <option value="1">Una vez</option>
              <option value="2">Permanente</option>
              <option value="3">Por un período</option>
            </select>
          </div>
          <button onClick={handleCreatePassword} className="lock-detail__new-password-create">
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockDetail;
