import { useNavigate } from 'react-router-dom';

import Battery from './Battery';
import Gear from './Gear';

const LockItem = ({ lock }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/lock/${lock.lockId}`);
  };

  return (
    <button className="lock-item" onClick={handleNavigate}>
      <div className="lock-item__data-container">
        <h3 className="lock-item__alias">{lock.lockAlias}</h3>
        <Battery electricQuantity={lock.electricQuantity} />
      </div>
      <Gear />
    </button>
  );
};

export default LockItem;
