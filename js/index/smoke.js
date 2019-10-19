const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'json/smoke.json',
  $('.products-container'),
  cart
);