/**
 * Debug script to inspect the itemRoutes module structure
 */
const itemRoutes = require('./itemRoutes');

console.log('Item routes module analysis:');
console.log('Type:', typeof itemRoutes);

if (typeof itemRoutes === 'function') {
  console.log('itemRoutes is a function, attempting to call it...');
  try {
    const result = itemRoutes();
    console.log('Function result type:', typeof result);
    console.log('Is Express router?', result && typeof result.use === 'function' && typeof result.handle === 'function');
    console.log('Available methods:', Object.keys(result).filter(key => typeof result[key] === 'function'));
  } catch (error) {
    console.error('Error calling itemRoutes function:', error);
  }
} else {
  console.log('itemRoutes is not a function');
  console.log('Is Express router?', itemRoutes && typeof itemRoutes.use === 'function' && typeof itemRoutes.handle === 'function');
  console.log('Available methods:', Object.keys(itemRoutes).filter(key => typeof itemRoutes[key] === 'function'));
}

// Try to inspect route handlers
try {
  const router = typeof itemRoutes === 'function' ? itemRoutes() : itemRoutes;
  console.log('\nRoute stack analysis:');
  if (router && router.stack) {
    router.stack.forEach((layer, index) => {
      console.log(`Route ${index}:`, {
        path: layer.route ? layer.route.path : 'middleware',
        methods: layer.route ? Object.keys(layer.route.methods) : 'n/a'
      });
    });
  } else {
    console.log('No route stack found');
  }
} catch (error) {
  console.error('Error analyzing route stack:', error);
}
