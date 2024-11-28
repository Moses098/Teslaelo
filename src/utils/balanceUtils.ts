export const calculateTotalAssetValue = (balance: Record<string, number>): number => {
  // Exclude tesla shares from the calculation
  const { tesla, ...cryptoBalances } = balance;
  return Object.values(cryptoBalances).reduce((sum, value) => sum + value, 0);
};

export const hasMinimumBalance = (balance: Record<string, number>): boolean => {
  const totalValue = calculateTotalAssetValue(balance);
  return totalValue > 0;
};