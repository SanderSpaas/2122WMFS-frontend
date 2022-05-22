export default (value) => {
  const date = new Date(value);
  let options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("nl-BE", options);
};
