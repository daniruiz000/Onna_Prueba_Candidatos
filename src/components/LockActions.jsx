import { fetchDto } from '../utils/fetchFunctions';

const LockActions = ({ lockId, fetchData }) => {
  const handleUnlockLock = async () => {
    await fetchDto.unlockLockViaGateway(lockId);
    fetchData();
  };

  const handleLockLock = async () => {
    await fetchDto.lockLockViaGateway(lockId);
    fetchData();
  };

  const handleEmergencyLock = async () => {
    await fetchDto.emergencyLock(lockId);
    fetchData();
  };

  const handleEmergencyUnlock = async () => {
    await fetchDto.emergencyUnlock(lockId);
    fetchData();
  };

  return (
    <div className="lock-actions">
      <button className="lock-actions__button lock-actions__button--unlock" onClick={handleUnlockLock}>
        Abrir
      </button>
      <button className="lock-actions__button lock-actions__button--lock" onClick={handleLockLock}>
        Cerrar
      </button>
      <button className="lock-actions__button lock-actions__button--emergency-lock" onClick={handleEmergencyLock}>
        Cierre de emergencia
      </button>
      <button className="lock-actions__button lock-actions__button--emergency-unlock" onClick={handleEmergencyUnlock}>
        Apertura de emergencia
      </button>
    </div>
  );
};

export default LockActions;
