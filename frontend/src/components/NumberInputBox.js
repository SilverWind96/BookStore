import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItem } from "../actions/cartActions";

export default function NumberInputBox(props) {
  const dispatch = useDispatch();
  const { item, userInfo } = props;
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div>
      <button
        onClick={(e) => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(
              updateItem(
                userInfo,
                item.id,
                item.productId,
                Number(quantity - 1)
              )
            );
          }
        }}
      >
        -
      </button>
      <input
        disabled
        type="number"
        min="1"
        max={item.countInStock}
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
          dispatch(
            updateItem(
              userInfo,
              item.id,
              item.productId,
              Number(e.target.value)
            )
          );
        }}
      />
      <button
        onClick={(e) => {
          if (quantity < item.countInStock) {
            setQuantity(quantity + 1);
            dispatch(
              updateItem(
                userInfo,
                item.id,
                item.productId,
                Number(quantity + 1)
              )
            );
          }
        }}
      >
        +
      </button>
    </div>
  );
}
