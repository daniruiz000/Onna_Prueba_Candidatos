const StatusMessage = ({ message, type }) => {
  return (
    <div>
      <p className={`lock-detail__${type}`}>{message}</p>s{' '}
    </div>
  );
};

export default StatusMessage;
