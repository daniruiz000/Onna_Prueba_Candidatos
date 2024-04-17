/* eslint-disable react/prop-types */
import { fetchDto } from '../utils/fetchFunctions';

const PasswordList = ({ lockPasswords, handleDeletePassword }) => {
  const getTypeDescription = (type) => {
    switch (type) {
      case 1:
        return 'Una vez';
      case 2:
        return 'Permanente';
      case 3:
        return 'Por un período';
      default:
        return 'Desconocido';
    }
  };

  return (
    <>
      <h4 className="lock-detail__passwords-title">CONTRASEÑAS ASOCIADAS:</h4>
      <ul className="lock-detail__passwords-list">
        {lockPasswords.map((password) => (
          <li key={password.keyboardPwdId} className="lock-detail__password-item">
            <div className="lock-detail__password-property">
              <span className="lock-detail__password-name">Nombre:</span>
              <span className="lock-detail__password-value">{password.keyboardPwdName || password.keyboardPwdId}</span>
            </div>
            <div className="lock-detail__password-property">
              <span className="lock-detail__password-name">Password:</span>
              <span className="lock-detail__password-value">{password.keyboardPwd}</span>
            </div>
            <div className="lock-detail__password-property">
              <span className="lock-detail__password-name">Acceso:</span>
              <span className="lock-detail__password-value">{getTypeDescription(password.keyboardPwdType)}</span>
            </div>
            <div className="lock-detail__password-property">
              <span className="lock-detail__password-name">Fecha de Activación:</span>
              <span className="lock-detail__password-value">{fetchDto.formatTimestamp(password.startDate)}</span>
            </div>
            <div className="lock-detail__password-property">
              <span className="lock-detail__password-name">Fecha de Desactivación:</span>
              <span className="lock-detail__password-value">{fetchDto.formatTimestamp(password.endDate)}</span>
            </div>
            <button onClick={() => handleDeletePassword(password.keyboardPwdId)} className="lock-detail__password-delete">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PasswordList;
