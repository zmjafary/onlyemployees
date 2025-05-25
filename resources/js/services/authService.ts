
export const logout = async (): Promise<void> => {
  // Simulate logout - in real app this would call Laravel API
  await new Promise(resolve => setTimeout(resolve, 100));
};

export const login = async (email: string, password: string): Promise<void> => {
  // Simulate login - in real app this would call Laravel API
  await new Promise(resolve => setTimeout(resolve, 100));
};
