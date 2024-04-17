const getAllLocksByClientId = async () => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;
  try {
    const response = await fetch(`${API_URL}/lock/list?clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const getLockDetailById = async (lockId) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;
  try {
    const response = await fetch(`${API_URL}/lock/detail?clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
const getLockPasswords = async (lockId, firstPage = 1, itemsPerPage = 20) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;

  try {
    const url = `${API_URL}/lock/passwords?clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}&firstPage=${firstPage}&itemsPerPage=${itemsPerPage}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch passwords: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to fetch passwords: ' + error.message);
  }
};
const generateLockPassword = async (lockId, type, name, startDate, endDate) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;
  const formattedStartDate = new Date(startDate).getTime(); // Ensuring the date is in milliseconds
  const formattedEndDate = new Date(endDate).getTime(); // Ensuring the date is in milliseconds

  try {
    const url = `${API_URL}/password?clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}&type=${type}&name=${name}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to generate password: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to generate password: ' + error.message);
  }
};
const deleteLockPassword = async (lockId, passID, type) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;

  try {
    const url = `${API_URL}/password`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}&passID=${passID}&type=${type}`,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to delete password: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to delete password: ' + error.message);
  }
};

const unlockLockViaGateway = async (lockId) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;

  try {
    const url = `${API_URL}/lock/unlock`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}`,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to unlock the lock: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to unlock the lock: ' + error.message);
  }
};

const lockLockViaGateway = async (lockId) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;

  try {
    const url = `${API_URL}/lock/lock`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}`,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to lock the lock: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to lock the lock: ' + error.message);
  }
};

const emergencyLock = async (lockId, autoLockTime = 0) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;

  try {
    const url = `${API_URL}/lock/emergencyLock`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}&autoLockTime=${autoLockTime}`,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to set emergency lock: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to set emergency lock: ' + error.message);
  }
};

const emergencyUnlock = async (lockId) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;

  try {
    const url = `${API_URL}/lock/emergencyUnlock`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: `clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}`,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to set emergency unlock: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to set emergency unlock: ' + error.message);
  }
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Madrid',
  };

  const formatter = new Intl.DateTimeFormat('es-ES', options);
  return formatter.format(date);
};

const getLockOpenStatus = async (lockId) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const CLIENT_TOKEN = import.meta.env.VITE_REACT_APP_CLIENT_TOKEN;

  try {
    const url = `${API_URL}/lock/openStatus?clientId=${CLIENT_ID}&token=${CLIENT_TOKEN}&ID=${lockId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.state === 0) {
        return 'closed';
      }
      if (data.state === 1) {
        return 'open';
      }
    } else {
      throw new Error('Failed to fetch lock open status: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Network error when attempting to fetch lock open status: ' + error.message);
  }
};

export const fetchDto = {
  getAllLocksByClientId,
  getLockDetailById,
  getLockPasswords,
  generateLockPassword,
  deleteLockPassword,
  unlockLockViaGateway,
  lockLockViaGateway,
  emergencyLock,
  emergencyUnlock,
  formatTimestamp,
  getLockOpenStatus,
};
