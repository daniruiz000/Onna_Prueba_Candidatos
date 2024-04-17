/* eslint-disable react/prop-types */

import Battery from './Battery';

const LockDetails = ({ actualLock }) => {
  return (
    <div className="lock-detail__container">
      <h3 className="lock-detail__alias">{actualLock.lockAlias}</h3>
      <p className="lock-detail__model">
        <strong>Modelo:</strong> {actualLock.modelNum}
      </p>
      <p className="lock-detail__battery">
        <strong>Batería:</strong> {actualLock.electricQuantity}%
      </p>
      <p className="lock-detail__privacy">
        <strong>Privacidad Activada:</strong> {actualLock.privacyLock ? 'Sí' : 'No'}
      </p>
      <p className="lock-detail__auto-lock">
        <strong>Auto-lock (segundos):</strong> {actualLock.autoLockTime}
      </p>
      <Battery electricQuantity={actualLock.electricQuantity} />
    </div>
  );
};

export default LockDetails;
