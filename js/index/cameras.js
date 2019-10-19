const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'json/cameras.json',
  $('.products-container'),
  cart
);