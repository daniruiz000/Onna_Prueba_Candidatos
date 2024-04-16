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
    console.log(`${API_URL}?clientId=${CLIENT_ID}`);
    if (response.ok) {
      const data = await response.json();
      console.log('Data retrieved successfully:', data);
      return data;
    } else {
      const errorText = await response.text();
      console.error('Error in response:', errorText);
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchDto = {
  getAllLocksByClientId,
};
