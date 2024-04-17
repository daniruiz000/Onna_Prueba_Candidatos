/* eslint-disable react/prop-types */

const NewPasswordForm = ({
  passwordName,
  startDate,
  endDate,
  passwordType,
  setPasswordName,
  setStartDate,
  setEndDate,
  setPasswordType,
  handleCreatePassword,
}) => {
  return (
    <div className="lock-detail__new-password">
      <h4 className="lock-detail__new-password-title">Crear Nueva Contraseña:</h4>
      <div className="lock-detail__new-password-inputs">
        <input
          type="text"
          value={passwordName}
          onChange={(event) => setPasswordName(event.target.value)}
          placeholder="Nombre de la contraseña (opcional)"
          className="lock-detail__new-password-name"
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          placeholder="Fecha de inicio"
          className="lock-detail__new-password-start-date"
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          placeholder="Fecha de fin"
          className="lock-detail__new-password-end-date"
        />
        <select value={passwordType} onChange={(event) => setPasswordType(event.target.value)} className="lock-detail__new-password-type">
          <option value="1">Una vez</option>
          <option value="2">Permanente</option>
          <option value="3">Por un período</option>
        </select>
      </div>
      <button onClick={handleCreatePassword} className="lock-detail__new-password-create">
        Crear
      </button>
    </div>
  );
};

export default NewPasswordForm;
