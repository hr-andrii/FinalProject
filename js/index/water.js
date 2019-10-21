const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'json/products.json',
  $('.products-container'),
  cart
);