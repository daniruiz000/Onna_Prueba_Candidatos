/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

import Battery from './Battery';
import Gear from './Gear';

const LockItem = ({ lock }) => {
  const navigate = useNavigate();

  const handleGearClick = () => {
    navigate(`/lock/${lock.lockId}`);
  };

  return (
    <div className="lock-item">
      <div className="lock-item__data-container">
        <h3 className="lock-item__alias">{lock.lockAlias}</h3>
        <Battery electricQuantity={lock.electricQuantity} />
      </div>
      <Gear onClick={handleGearClick} />
    </div>
  );
};

export default LockItem;
