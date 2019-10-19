const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'json/fire.json',
  $('.products-container'),
  cart
);