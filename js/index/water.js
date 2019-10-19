const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'json/water.json',
  $('.products-container'),
  cart
);