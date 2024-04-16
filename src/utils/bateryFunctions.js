import { faBatteryFull, faBatteryThreeQuarters, faBatteryHalf, faBatteryQuarter, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';

export const getBatteryIconAndColor = (percentage) => {
  if (percentage > 75) {
    return { icon: faBatteryFull, color: 'green' };
  } else if (percentage > 50) {
    return { icon: faBatteryThreeQuarters, color: 'yellowgreen' };
  } else if (percentage > 25) {
    return { icon: faBatteryHalf, color: 'orange' };
  } else if (percentage > 10) {
    return { icon: faBatteryQuarter, color: 'red' };
  } else {
    return { icon: faBatteryEmpty, color: 'darkred' };
  }
};
