import React, { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../api/api';
import '../styles/Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      if (response.data.success) {
        setWishlistItems(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      setWishlistItems(wishlistItems.filter(item => item.id !== wishlistId));
      alert('Removed from wishlist');
    } catch (error) {
      alert('Failed to remove from wishlist');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>No items in your wishlist</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              {item.image && <img src={item.image} alt={item.name} />}
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price}</p>
              </div>
              <button
                className="btn-danger"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
