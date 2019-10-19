const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'json/light.json',
  $('.products-container'),
  cart
);