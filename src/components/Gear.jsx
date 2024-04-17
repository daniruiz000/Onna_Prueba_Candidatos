import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Gear = () => {
  return (
    <button className="gear">
      <FontAwesomeIcon icon="fa-solid fa-gear" className="gear__big" />
      <FontAwesomeIcon icon="fa-solid fa-gear" className="gear__small" />
    </button>
  );
};

export default Gear;
