(function () {

    let allProductsData;
    const content = document.querySelector('.content');
    const productListArray = document.querySelector('.product-list');
    const navMain = document.querySelector('.nav-main');
    const allCategories = document.querySelectorAll('.nav-main a');
    const categories = document.querySelector('.categories');
    let activeNavMenuLink = 1;
    const wrapperProductDescription = document.querySelector('.wrapper-product-description');
    let selectedSection;
    let cartAdd;
    let tempChartPrice;
    let cartPrice = document.querySelector('.cart-price span');

    getAjaxJsonProductData();

    function getAjaxJsonProductData() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const productsData = JSON.parse(xhr.response);
                creationProductStore(productsData);
            };
        };
        xhr.open('GET', 'product-data.json');
        xhr.send();
    };

    function creationProductStore(productsData) {
        allProductsData = productsData;
        creationproductlist(allProductsData);

        productListPage.addEventListener('click', function (event) {
            changePage(event, allProductsData);
        });

        navMain.querySelector('ul').addEventListener('click', function (event) {
            menuSectionChange(event)
        });
        calculatorCartPrice();
        slider();
        clickOnproduct();
    };

    function addproduct() {
        let addCart = document.querySelector('.description-button.green-btn');

        addCart.addEventListener('click', function () {
            if (localStorage.getItem("cart") != null) {
                cartAdd = JSON.parse(localStorage.getItem("cart"));
            } else {
                cartAdd = [];
            };

            let productDataId = document.querySelector('.product-description-info .data-id span');
            let productImg = document.querySelector('.description-img-price .product-img');
            let productBrand = document.querySelector('.product-description-info .product-Brand');
            let productName = document.querySelector('.product-description-info .product-name');
            let productModel = document.querySelector('.product-description-info .product-model');
            let productPrice = document.querySelector('.description-img-price .product-price');

            cartAdd.push({
                "data-id": productDataId.innerHTML,
                "url": productImg.src,
                "Brand": productBrand.innerHTML,
                "Model": productModel.innerHTML,
                "name": productName.innerHTML,
                "price": productPrice.innerHTML
            })

            localStorage.setItem("cart", JSON.stringify(cartAdd));
            calculatorCartPrice()
        });
    }

    function calculatorCartPrice() {
        if (localStorage.getItem("cart") != null) {
            cartAdd = JSON.parse(localStorage.getItem("cart"));
            tempChartPrice = 0;
            for (let i = 0; i < cartAdd.length; i++) {
                tempChartPrice += +cartAdd[i]["price"];
            }
            cartPrice.innerHTML = tempChartPrice.toFixed(2);
        } else if (localStorage.getItem("cart") != "[]") {
            cartPrice.innerHTML = (0).toFixed(2);
        } else {
            cartPrice.innerHTML = (0).toFixed(2);
        };
    };

    function closeproductDescription() {
        let = descriptionClose = document.querySelector('.close-description');
        let = descriptionButton = document.querySelector('.description-button');
        descriptionClose.addEventListener('click', function closeDescriptionWindow() {
            wrapperProductDescription.style.visibility = 'hidden';
        });

        descriptionButton.addEventListener('click', function () {
            wrapperProductDescription.style.visibility = 'hidden';
        });
    };

    function menuSectionChange(event) {
        let selectedMenu = '';
        if (event.srcElement.nodeName != 'UL' && event.target.attributes['data-list'].nodeValue === 'no-active') {
            if (event.target.textContent === 'All Categories') {
                categories.innerHTML = 'All Categories';
                event.target.setAttribute('data-list', 'active');
                allCategories[activeNavMenuLink - 1].setAttribute('data-list', 'no-active');
                activeNavMenuLink = event.target.attributes[2].value;
                creationproductlist(allProductsData);
            } else {
                categories.innerHTML = event.target.textContent;
                event.target.setAttribute('data-list', 'active');
                allCategories[activeNavMenuLink - 1].setAttribute('data-list', 'no-active');
                activeNavMenuLink = event.target.attributes[2].value;
                selectedMenu = event.target.textContent;
                selectedSection = {
                    "data-id": [],
                    "url": [],
                    "Brand": [],
                    "Model": [],
                    "name": [],
                    "description": [],
                    "section": [],
                    "price": []
                };
                allProductsData["section"].forEach((section, i) => {
                    if (section === selectedMenu) {
                        selectedSection["data-id"].push(i);
                        selectedSection["url"].push(allProductsData["url"][i]);
                        selectedSection["Brand"].push(allProductsData["Brand"][i]);
                        selectedSection["Model"].push(allProductsData["Model"][i]);
                        selectedSection["name"].push(allProductsData["name"][i]);
                        selectedSection["description"].push(allProductsData["description"][i]);
                        selectedSection["section"].push(section);
                        selectedSection["price"].push(allProductsData["price"][i]);
                    }
                });
                creationproductlist(selectedSection);
            };
        };
    };

})();