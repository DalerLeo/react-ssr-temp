export default (price, discount = null) => {
  const hundred = 100
  return price * ((hundred - discount) / hundred)
}
