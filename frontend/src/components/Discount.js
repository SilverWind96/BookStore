export default function Rating(props) {
  const { oldPrice, price } = props;
  return (
    <span className="discount-percent">
      &nbsp;-
      {(((oldPrice - price) / oldPrice) * 100).toFixed(0)}%
    </span>
  );
}
