import { faBatteryFull, faBatteryThreeQuarters, faBatteryHalf, faBatteryQuarter, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';

const getBatteryColor = (percentage) => {
  if (percentage > 75) return 'green';
  if (percentage > 50) return 'yellow';
  if (percentage > 25) return 'orange';
  return 'red';
};

const getBatteryIcon = (percentage) => {
  if (percentage > 75) return faBatteryFull;
  if (percentage > 50) return faBatteryThreeQuarters;
  if (percentage > 25) return faBatteryHalf;
  if (percentage > 10) return faBatteryQuarter;
  return faBatteryEmpty;
};

export const bateryDto = {
  getBatteryColor,
  getBatteryIcon,
};
