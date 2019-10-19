const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'json/alarms.json',
  $('.products-container'),
  cart
);