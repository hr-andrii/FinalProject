class ProductList {
  constructor(productsUrl, renderContainer, cart) {
    this.cart = cart;
    fetch(productsUrl)
      .then(result => result.json())
      .then(products => {
        products.sort( (a, b) => a.price - b.price );
        this.products = products;
        this.renderProducts(renderContainer, products);
        this.addEventListeners();
        document.querySelector('.filter').addEventListener('keydown',
            () => this.renderProducts(renderContainer, products));
      });
  }
  getProductById(id) {
    return this.products.find(el => el.id === id);
  }
  renderProducts(container, products) {
    let productListDomString = '';
    products
        .filter( product => product.brand.toLowerCase().includes(
                document.querySelector('.filter').value.toLowerCase()))
        .forEach(product => {
            if(product.category === 5){
      productListDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/water/${
                      product.image
                    }"
                        alt="${product.model}">
                    <div class="card-body">
                      <h4 class="card-model">${product.brand} ${product.model}</h4>
                      <p class="card-text">${product.description}</p>
                      <button class="btn btn-info" data-toggle="modal"
                        data-target="#productInfoModal" data-id="${
                          product.id
                        }">Info
                      </button>
                      <button class="btn btn-primary buy" data-id="${
                        product.id
                      }">
                        $${product.price} - Buy
                      </button>
                    </div>
                  </div>
                </div>`;
            }
    });
    container.html(productListDomString);
  }
  addEventListeners() {
    $('#productInfoModal').on('show.bs.modal', event => {
      const button = $(event.relatedTarget); // Button that triggered the modal
      const id = String(button.data('id')); // Extract info from data-* attributes
      const product = this.getProductById(id);
      const modal = $('#productInfoModal');
      modal
        .find('.modal-body .card-img-top')
        .attr('src', 'img/products/water/' + product.image)
        .attr('alt', product.model);
      modal.find('.modal-body .card-model').text(product.model);
      modal.find('.modal-body .card-text').text(product.description);
      modal
        .find('button.buy')
        .text(`${product.price} - Buy`)
        .data('id', id);
    });
    $('.card.product button.buy, #productInfoModal button.buy').click(event => {
      const button = $(event.target);
      const id = button.data('id');
      this.cart.addProduct(id);
      window.showAlert('Product added to cart');
    });
  }
}
