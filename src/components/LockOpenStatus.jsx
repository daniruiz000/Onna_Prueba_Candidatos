import { useState, useEffect } from 'react';
import { fetchDto } from '../utils/fetchFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LockOpenStatus = ({ lockId }) => {
  const [lockState, setLockState] = useState('unknown');

  useEffect(() => {
    const fetchLockState = async () => {
      const state = await fetchDto.getLockOpenStatus(lockId);
      setLockState(state);
    };

    fetchLockState();
  }, [lockId]);

  return (
    <div className={'lock-open-status__container'}>
      <FontAwesomeIcon icon="fa-solid fa-circle" className={`lock-open-status ${lockState}`} />
      <h1 className={'lock-open-status__text'}>{lockState !== 'unknown' ? lockState : 'cargando'}</h1>
    </div>
  );
};

export default LockOpenStatus;
