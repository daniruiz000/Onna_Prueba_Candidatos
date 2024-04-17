/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Gear = ({ onClick }) => {
  return (
    <button className="gear" onClick={onClick}>
      <FontAwesomeIcon icon="fa-solid fa-gear" className="gear__big" />
      <FontAwesomeIcon icon="fa-solid fa-gear" className="gear__small" />
    </button>
  );
};

export default Gear;
