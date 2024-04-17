import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBatteryIconAndColor } from '../utils/bateryFunctions';

const Battery = ({ electricQuantity }) => {
  const { icon, color } = getBatteryIconAndColor(electricQuantity);

  return (
    <div className="battery">
      <FontAwesomeIcon className="battery__icon" icon={icon} style={{ color: color }} />
      <h2 className="battery__charge">{electricQuantity}%</h2>
    </div>
  );
};

export default Battery;
