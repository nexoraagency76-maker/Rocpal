export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);

export const calculateGrandTotal = (lineItems, customItems, laborHours, shopRate, marginPercent) => {
  const materialsTotal = lineItems.reduce((acc, item) => acc + item.item.price * item.qty, 0);
  const customTotal = customItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const laborTotal = (laborHours || 0) * (shopRate || 85);
  const subTotal = materialsTotal + customTotal + laborTotal;
  const grandTotal = subTotal * (1 + (marginPercent || 0) / 100);
  return { materialsTotal, customTotal, laborTotal, subTotal, grandTotal, marginAmount: grandTotal - subTotal };
};
