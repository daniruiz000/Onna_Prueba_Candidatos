/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Gear = () => {
  return (
    <div className="gear">
      <FontAwesomeIcon icon="fa-solid fa-gear" className="gear__big" />
      <FontAwesomeIcon icon="fa-solid fa-gear" className="gear__small" />
    </div>
  );
};

export default Gear;
