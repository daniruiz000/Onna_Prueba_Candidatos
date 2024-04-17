/* eslint-disable react/prop-types */

import { getBatteryIconAndColor } from '../utils/bateryFunctions';
import Battery from './Battery';
import Gear from './Gear';

const LockItem = ({ lock }) => {
  const { icon, color } = getBatteryIconAndColor(lock.electricQuantity);
  return (
    <div className="lock-item">
      <div className="lock-item__data-container">
        <h3 className="lock-item__alias">{lock.lockAlias}</h3>
        <Battery icon={icon} color={color} electricQuantity={lock.electricQuantity} />
      </div>
      <Gear />
    </div>
  );
};

export default LockItem;
