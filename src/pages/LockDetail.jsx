import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDto } from '../utils/fetchFunctions';

import BackButton from '../components/BackButton';
import LockDetails from '../components/lock/LockDetails';
import StatusMessage from '../components/lock/StatusMessage';
import PasswordList from '../components/password/PasswordList';
import NewPasswordForm from '../components/password/NewPasswordForm';
import LockActions from '../components/lock/LockActions';
import Separator from '../components/Separator';
import Header from '../components/Header';

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
  const [activeTab, setActiveTab] = useState('passwords');

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
        handleTabChange('passwords');
      } else {
        throw new Error('Fallo al Crear la Contraseña: ' + (result.errmsg || 'No error message'));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <StatusMessage message="Cargando cerradura..." type="loading" />;
  if (error) return <StatusMessage message={`Error: ${error}`} type="error" />;
  if (!actualLock) return <StatusMessage message="No se encontraron detalles para la cerradura." type="not-found" />;

  return (
    <>
      <Header />
      <div className="lock-detail">
        <BackButton />
        <LockDetails actualLock={actualLock} lockId={actualLock.lockId} />
        <Separator />
        <div className="lock-detail__tabs">
          <button className={`lock-detail__tab ${activeTab === 'passwords' ? 'active' : ''}`} onClick={() => handleTabChange('passwords')}>
            PASSWORDS
          </button>
          <button className={`lock-detail__tab ${activeTab === 'actions' ? 'active' : ''}`} onClick={() => handleTabChange('actions')}>
            ACTIONS
          </button>
        </div>

        {activeTab === 'passwords' && (
          <div>
            <PasswordList lockPasswords={lockPasswords} handleDeletePassword={handleDeletePassword} />
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="lock-detail__actions">
            <LockActions lockId={actualLock.lockId} fetchData={fetchData} />
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
        )}
      </div>
    </>
  );
};

export default LockDetail;
