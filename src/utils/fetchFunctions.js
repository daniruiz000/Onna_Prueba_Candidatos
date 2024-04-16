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

const getLocksById = async (lockId) => {
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

export const fetchDto = {
  getAllLocksByClientId,
  getLocksById,
};
