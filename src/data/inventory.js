// Oshawa 2026 Industry Standards Inventory Database

export const inventoryData = {
  cabinets: [
    { id: 'cab-1', name: 'MDF', price: 60, unit: 'sheet', category: 'Cabinets' },
    { id: 'cab-2', name: 'Melamine', price: 85, unit: 'sheet', category: 'Cabinets' },
    { id: 'cab-3', name: 'Plywood', price: 95, unit: 'sheet', category: 'Cabinets' },
    { id: 'cab-4', name: 'Solid Wood', price: 180, unit: 'sheet', category: 'Cabinets' },
    { id: 'cab-5', name: 'White Oak', price: 250, unit: 'sheet', category: 'Cabinets' },
    { id: 'cab-6', name: 'Walnut', price: 320, unit: 'sheet', category: 'Cabinets' },
  ],
  surfaces: [
    { id: 'sur-1', name: 'Quartz', price: 95, unit: 'sqft', category: 'Stone & Surfaces' },
    { id: 'sur-2', name: 'Granite', price: 110, unit: 'sqft', category: 'Stone & Surfaces' },
    { id: 'sur-3', name: 'Porcelain Slab', price: 150, unit: 'sqft', category: 'Stone & Surfaces', note: 'High-tier specialized cutting' },
  ],
  backsplash: [
    { id: 'bks-1', name: 'Standard Tile', price: 30, unit: 'sqft', category: 'Backsplash' },
    { id: 'bks-2', name: 'Porcelain Tile', price: 40, unit: 'sqft', category: 'Backsplash' },
    { id: 'bks-3', name: 'Premium Mosaic', price: 55, unit: 'sqft', category: 'Backsplash' },
  ],
  hardware: [
    { id: 'hdw-1', name: 'Salice Silentia+ Hinges', price: 8.50, unit: 'ea', category: 'Hardware' },
    { id: 'hdw-2', name: 'Salice Futura Soft-Close Slides', price: 32, unit: 'pair', category: 'Hardware' },
  ],
  handles: [
    { id: 'hdl-1', name: 'Tier 1: Knobs', price: 5, unit: 'ea', category: 'Handles' },
    { id: 'hdl-2', name: 'Tier 2: Small', price: 8, unit: 'ea', category: 'Handles' },
    { id: 'hdl-3', name: 'Tier 3: Medium', price: 12, unit: 'ea', category: 'Handles' },
    { id: 'hdl-4', name: 'Tier 4: Large', price: 18, unit: 'ea', category: 'Handles' },
    { id: 'hdl-5', name: 'Tier 5: Custom Premium', price: 45, unit: 'ea', category: 'Handles' },
  ],
  appliances: [
    { id: 'app-1', name: 'Single Sink', price: 150, unit: 'ea', category: 'Appliances' },
    { id: 'app-2', name: 'Standard Faucets', price: 180, unit: 'ea', category: 'Appliances' },
    { id: 'app-3', name: 'Medium Sink', price: 275, unit: 'ea', category: 'Appliances' },
    { id: 'app-4', name: 'Double Sink', price: 450, unit: 'ea', category: 'Appliances' },
  ],
  finishes: [
    { id: 'fin-1', name: 'Base Paint', price: 5, unit: 'sqft', category: 'Finishes' },
    { id: 'fin-2', name: 'Custom/Premium Paint', price: 12, unit: 'sqft', category: 'Finishes' },
  ]
};

// Flatten all inventory for global search
export const allInventory = Object.values(inventoryData).flat();
