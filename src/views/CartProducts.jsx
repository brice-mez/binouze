import { useContext } from "react";
import { ShoppingCartContext } from "../App";

export default function CartProducts() {
  const context = useContext(ShoppingCartContext);
  const { updateCart, itemsInCart } = context;

  const groupedItems = itemsInCart.reduce((grouped, item) => {
    const groupedItem = grouped.find(
      (groupedItem) => groupedItem.item.id === item.id
    );
    if (groupedItem) {
      groupedItem.quantity = groupedItem.quantity + 1;
      groupedItem.amount = groupedItem.quantity * groupedItem.item.price;
      return grouped;
    } else {
      return [...grouped, { item, quantity: 1, amount: item.price }];
    }
  }, []);

  const hasItems = groupedItems && groupedItems.length > 0;

  const totalAmount = groupedItems.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  return (
    <div>
      <h1>ShoppingCart</h1>
      {hasItems ? (
        groupedItems.map(({ item, quantity }) => {
          return (
            <div>
              <p>
                <b>{item.name}</b>
              </p>
              <p>
                €{item.price} x {quantity} = €{item.price * quantity}
              </p>

              <button
                onClick={() => {
                  const remainingItems = itemsInCart.filter(
                    (cartItem) => cartItem.id !== item.id
                  );
                  updateCart(remainingItems);
                }}
              >
                Remove from cart
              </button>
            </div>
          );
        })
      ) : (
        <p>Empty</p>
      )}

      {hasItems && <h5>Total {itemsInCart.length} item(s)</h5>}
      {hasItems && <h5>Total Amount: {totalAmount}€ </h5>}
    </div>
  );
}
