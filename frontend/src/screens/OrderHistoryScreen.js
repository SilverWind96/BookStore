import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderHistory,
  getOrderHistoryDetails,
} from "../actions/orderActions";
import CurrencyFormat from "../components/CurrencyFormat";

export default function OrderHistoryScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderHistory(userInfo));
  }, [dispatch, userInfo]);
  const viewDetailHandler = (e) => {
    dispatch(getOrderHistoryDetails(userInfo, e));
    props.history.push("/orderHistory/" + e);
  };
  const orderHistory = useSelector((state) => state.orderHistory);
  return (
    <div>
      <h1>Order History</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th>PAYMENT METHOD</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory
            ? orderHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.createdAt.split("T").slice(0, 1).join(" ")}</td>
                  <td>
                    <CurrencyFormat number={item.totalPrice} />
                  </td>
                  <td>{item.orderStatus === 0 ? "Shipping" : "Done"}</td>
                  <td>{item.payment === 1 ? "COD" : "PayPal"}</td>
                  <td>
                    <button onClick={(e) => viewDetailHandler(item.id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
