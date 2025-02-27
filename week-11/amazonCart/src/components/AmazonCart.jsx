import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../AmazonCart.module.css';
import {
  faCircleCheck,
  faMinus,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItems, totalPrice } from '../store/cartItemsState';
import { useState } from 'react';

export default function AmazonCart() {
  const [cItems, setCItems] = useRecoilState(cartItems);
  const totalCartPrice = useRecoilValue(totalPrice);
  const [showOverLay, setShowOverLay] = useState(false);

  const handleDecrease = (index) => {
    setCItems((prevItems) => {
      const updatedItems = [...prevItems];

      if (updatedItems[index].quantity > 1) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity - 1,
        };
      }

      return updatedItems;
    });
  };

  const handleIncrease = (index) => {
    setCItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: (updatedItems[index].quantity || 1) + 1,
      };
      return updatedItems;
    });
  };

  const handleDelete = (index) => {
    setCItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleProceedToBuy = () => {
    setShowOverLay(true);
    setTimeout(() => {
      setCItems([]);
      setShowOverLay(false);
    }, 3000);
  };

  return (
    <div className={style.main}>
      {showOverLay && (
        <div className={style.overlay}>
          <div className={style.overlayContent}>
            <h1>Purchase Successfull!</h1>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: '#63E6BE' }}
            />
            <p>
              Thank you for ur purchase. Your order has been placed
              successfully!
            </p>
            <strong>Total Amount: ${totalCartPrice}.00</strong>
            <button onClick={() => setShowOverLay(false)}>Close</button>
          </div>
        </div>
      )}
      <div className={style.cartSummary}>
        <h2>Shopping Cart</h2>
        <div className={style.cartContents}>
          {cItems.map((item, index) => (
            <div key={index} className={style.cartItem}>
              <div className={style.item}>
                <img src={item.src} className={style.itemImg} alt={item.name} />
                <div className={style.itemDetails}>
                  <h3>{item.name}</h3>
                  <span>In Stock</span>
                  <div className={style.itemButtons}>
                    <button onClick={() => handleDecrease(index)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => handleIncrease(index)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <p onClick={() => handleDelete(index)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.divider}></div>
              <h3 className={style.itemPrice}>
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </h3>
            </div>
          ))}

          {cItems.length === 0 && (
            <div className={style.emptyCart}>
              <h3>Your Amazon Cart is empty</h3>
              <p>
                Your shopping cart is waiting. Give it purpose – fill it with
                groceries, clothing, household supplies, electronics, and more.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={style.orderSummary}>
        <h2>Order Summary</h2>
        <div className={`${style.flex} ${style.orderDetail}`}>
          <p>
            Items (
            {cItems.reduce((total, item) => total + (item.quantity || 1), 0)}):
          </p>
          <p>${totalCartPrice.toFixed(2)}</p>
        </div>
        <div className={style.divider}></div>
        <div className={`${style.flex} ${style.orderDetailSummary}`}>
          <p>Order Total:</p>
          <p>${totalCartPrice.toFixed(2)}</p>
        </div>
        <button onClick={handleProceedToBuy} disabled={cItems.length === 0}>
          Proceed To Buy
        </button>
      </div>
    </div>
  );
}
