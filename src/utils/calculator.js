export const calculateLineItemTotal = (item, quantity) => {
  return (item.price * quantity) || 0;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

export const calculateGrandTotal = (lineItems, customItems, laborHours, shopRate, marginPercent) => {
  const materialsHardwareTotal = lineItems.reduce((acc, item) => acc + calculateLineItemTotal(item.item, item.qty), 0);
  const customItemsTotal = customItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  const laborTotal = (laborHours || 0) * (shopRate || 85);
  
  const subTotal = materialsHardwareTotal + customItemsTotal + laborTotal;
  const marginMultiplier = 1 + ((marginPercent || 0) / 100);
  
  const grandTotal = subTotal * marginMultiplier;
  
  return {
    materialsTotal: materialsHardwareTotal,
    customTotal: customItemsTotal,
    laborTotal: laborTotal,
    subTotal: subTotal,
    grandTotal: grandTotal,
    marginAmount: grandTotal - subTotal
  };
};
