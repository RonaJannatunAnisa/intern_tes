export default function Alert({ message, type = "error" }) {
  if (!message) return null;
  return <p className={`alert alert-${type}`}>{message}</p>;
}
