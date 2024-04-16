/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { getBatteryIconAndColor } from '../utils/bateryFunctions';

const LockItem = ({ lock }) => {
  const { icon, color } = getBatteryIconAndColor(lock.electricQuantity);
  return (
    <div className="lock-item">
      <div className="lock-item__data-container">
        <h3 className="lock-item__alias">{lock.lockAlias}</h3>
        <div className="battery-container">
          <FontAwesomeIcon icon={icon} style={{ color: color, fontSize: '50px', marginRight: '10px' }} />
          <h2 className="battery-container__charge">{lock.electricQuantity}%</h2>
        </div>
      </div>
      <div className="lock-item__gear-container">
        <FontAwesomeIcon icon={faGear} className="lock-item__gear-big" />
        <FontAwesomeIcon icon={faGear} className="lock-item__gear-small" />
      </div>
    </div>
  );
};

export default LockItem;
