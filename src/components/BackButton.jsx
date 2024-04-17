import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/`);
  };

  return (
    <button className="lock-detail__back-button" onClick={handleNavigate}>
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
      Volver
    </button>
  );
};

export default BackButton;
