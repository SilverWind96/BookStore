export default function CurrencyFormat(props) {
  const { number } = props;
  return (
    <span>
      {new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "vnd",
      }).format(number)}
    </span>
  );
}
