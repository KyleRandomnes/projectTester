import logo from './logo.svg';
import React, { useState } from 'react';
import Navbar from './navbar'; // Import the Navbar component
import './App.css';

function App() {

  // State to store selected sizes
  const [selectedSizes, setSelectedSizes] = useState([]);
  // Product-related state
  const [productImage, setProductImage] = useState('/planeWhiteT.png'); // Default image for the product

  // handles which sizes have been pressed
  const toggleSize = (size) => {
    setSelectedSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        // Remove size from selected sizes if already selected
        return prevSizes.filter((s) => s !== size);
      } else {
        // Add size to selected sizes if not already selected
        return [...prevSizes, size];
      }
    });
  };

  // handles side bar
  const [quantity, setQuantity] = useState(1);

  const handleSliderChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleInputChange = (e) => {
    const value = Math.max(0, Math.min(5, e.target.value)); // Ensures quantity stays between 1 and 5
    setQuantity(value);
  };

  // tracks items in cart
  const [cart, setCart] = useState([]);
  // Handles adding items to the cart

  const addToCart = () => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      selectedSizes.forEach((size) => {
        const existingItem = updatedCart.find((item) => item.size === size);
        if (existingItem) {
          existingItem.quantity += parseInt(quantity, 10);
        } else {
          updatedCart.push({ size, quantity: parseInt(quantity, 10), image: productImage });
        }
      });
      return updatedCart;
    });

    setSelectedSizes([]);
    setQuantity(1);
  };

  //tracking if shopping cart is press
  const [isCartOpen, setIsCartOpen] = useState(false);
 
  const toggleCartDropdown = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  return (
    <div className="App">
      <header className="App-header">

        {/* Navbar Component */}
        <Navbar cart={cart} isCartOpen={isCartOpen} toggleCartDropdown={toggleCartDropdown} />

        <div className="Product-container">
          {/* relative path to public folder "Settup"*/}
          <img src={process.env.PUBLIC_URL + '/planeWhiteT.png'} alt="Classic Tee" className="Product-image" />
          <div className="Product-info">
            <h1>Product: Classic Tee</h1>
            {/* Descriptor */}
            <p>
              The Classic Tee is made of high-quality cotton, designed to provide ultimate comfort and style.
              Available in multiple sizes (S, M, L) to suit every preference. Add it to your cart and enjoy a
              timeless, versatile addition to your wardrobe.
            </p>

            <p>Price: $75.00</p>

            {/* selecting sizes */}
            <p>Select a size:</p>
            <div className="Size-buttons">
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSizes.includes(size) ? 'selected' : ''}`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <p></p>

            {/* number of shirts to purchase */}
            <p>Quantity:</p>
            <div className="Quantity-container">
              <input type="range" min="0" max="5" value={quantity} onChange={handleSliderChange} className="Quantity-slider" />
              <input type="number" value={quantity} onChange={handleInputChange} className="Quantity-input" min="1" max="5" />
            </div>

            {/* add to shopping cart */}
            <button onClick={addToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
