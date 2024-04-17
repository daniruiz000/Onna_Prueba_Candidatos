import { fetchDto } from '../../utils/fetchFunctions';

const LockActions = ({ lockId, fetchData }) => {
  const handleUnlockLock = async () => {
    await fetchDto.unlockLockViaGateway(lockId);
    fetchData();
  };

  const handleLockLock = async () => {
    await fetchDto.lockLockViaGateway(lockId);
    fetchData();
  };

  return (
    <div className="lock-actions">
      <button className="lock-actions__button lock-actions__button--unlock" onClick={handleUnlockLock}>
        Open
      </button>
      <button className="lock-actions__button lock-actions__button--lock" onClick={handleLockLock}>
        Close
      </button>
    </div>
  );
};

export default LockActions;
