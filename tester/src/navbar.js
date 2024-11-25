import React from 'react';
import './navbar.css'; // For custom navbar styling

function Navbar({ cart, isCartOpen, toggleCartDropdown }) {
  return (
    <div className="Top-bar">
      <h1 className="App-title">Shop</h1>
      <div className="Cart-icon" onClick={toggleCartDropdown}>
      <img src={process.env.PUBLIC_URL + '/cart-icon.png'} alt="Cart" className="Cart-image" />
        {isCartOpen && (
          <div className="Cart-dropdown">
            <h3>Your Cart</h3>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <img
                    /* had this working with the image provided in app.js however on the 
                    *  server side it wouldn't load the image though the variable name, so had to hard code it in
                    */
                      src={process.env.PUBLIC_URL + '/planeWhiteT.png'}
                      alt={`${item.size} Shirt`}
                      className="Product-icon"
                    />
                    Size: {item.size}, Quantity: {item.quantity}, Total Price: ${item.quantity * 75.0}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
