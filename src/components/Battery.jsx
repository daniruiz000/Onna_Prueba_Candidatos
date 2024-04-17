/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Battery = ({ icon, color, electricQuantity }) => {
  return (
    <div className="battery">
      <FontAwesomeIcon className="battery__icon" icon={icon} style={{ color: color }} />
      <h2 className="battery__charge">{electricQuantity}%</h2>
    </div>
  );
};

export default Battery;
