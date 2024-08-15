const images = {
    "Product1.png": require('../assets/Product1.png'),
    "Product2.png": require('../assets/Product2.png'),
    "Product3.png": require('../assets/Product3.png'),
  };
  
  export default function getImage(name) {
    return images[name]// Fallback image if needed
  }
  