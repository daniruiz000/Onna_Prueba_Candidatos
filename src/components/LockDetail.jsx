import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDto } from '../utils/fetchFunctions';
import BackButton from './BackButton';
import LockDetails from './LockDetails';
import StatusMessage from './StatusMessage';
import PasswordList from './PasswordList';
import NewPasswordForm from './NewPasswordForm';

const LockDetail = () => {
  const { id } = useParams();
  const [actualLock, setActualLock] = useState(null);
  const [lockPasswords, setLockPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passwordType, setPasswordType] = useState('2');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [passwordName, setPasswordName] = useState('');

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

  if (loading) return <StatusMessage message="Cargando detalles de la cerradura..." type="loading" />;
  if (error) return <StatusMessage message={`Error: ${error}`} type="error" />;
  if (!actualLock) return <StatusMessage message="No se encontraron detalles para la cerradura." type="not-found" />;

  return (
    <div className="lock-detail">
      <BackButton />
      <LockDetails actualLock={actualLock} />
      <div className="lock-detail__passwords-content">
        <PasswordList lockPasswords={lockPasswords} handleDeletePassword={handleDeletePassword} />
        <NewPasswordForm
          passwordName={passwordName}
          startDate={startDate}
          endDate={endDate}
          passwordType={passwordType}
          setPasswordName={setPasswordName}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setPasswordType={setPasswordType}
          handleCreatePassword={handleCreatePassword}
        />
      </div>
    </div>
  );
};

export default LockDetail;