const StatusMessage = ({ message, type }) => {
  return <p className={`lock-detail__${type}`}>{message}</p>;
};

export default StatusMessage;
