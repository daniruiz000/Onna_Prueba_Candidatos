const getBatteryColor = (percentage) => {
  if (percentage > 75) return 'green';
  if (percentage > 50) return 'yellow';
  if (percentage > 25) return 'orange';
  return 'red';
};

export const bateryDto = {
  getBatteryColor,
};
