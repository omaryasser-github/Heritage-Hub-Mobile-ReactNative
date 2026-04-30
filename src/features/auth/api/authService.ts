export const login = async (data: any) => {
  // Mock API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'test@test.com' && data.password === 'password123') {
        resolve({ token: 'mock-jwt-token', user: { id: '1', name: 'Test User', email: data.email } });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

export const register = async (data: any) => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'mock-jwt-token-new', user: { id: '2', name: data.name || 'New User', email: data.email } });
    }, 1000);
  });
};
