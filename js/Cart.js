var cartItems = getCartCookie();
var cartItemsContainer = document.getElementById('cartItems');
var cartTotalContainer = document.getElementById('cartTotal');
var cartEmptyContainer = document.getElementById('cartEmpty');

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    if (cartItems.length > 0) {
        cartItems.forEach(function (item) {
            var cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item', 'mb-3', 'p-3', 'border-bottom');

            var productImage = document.createElement('img');
            productImage.src = item.image;
            productImage.classList.add('img-thumbnail');
            cartItemElement.appendChild(productImage);

            var productDetails = document.createElement('div');
            productDetails.classList.add('product-details', 'ms-3');
            productDetails.innerHTML = `
                <div class="product-name">${item.name}</div>
                <div class="product-quantity">
                    Quantity: 
                    <input class="quantity-input" type="number" value="${item.Quantity}" min="1"
                        oninput="updateQuantity(${item.id}, this.value)">
                </div>
                <div class="product-price">$${item.price.toFixed(2)}</div>
                <div class="remove-btn" onclick="removeCartItem(${item.id})">Remove</div>`;
            cartItemElement.appendChild(productDetails);

            cartItemsContainer.appendChild(cartItemElement);
        });

        var updatedTotal = cartItems.reduce(function (acc, item) {
            return acc + item.price * Number(item.Quantity);
        }, 0);

        cartTotalContainer.innerHTML = `<div class="cart-total text-end">Total: $${updatedTotal.toFixed(2)}</div>`;
    } else {
        cartTotalContainer.innerHTML = '';
        cartEmptyContainer.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';

    }
}

function updateQuantity(id, newQuantity) {
    var item = cartItems.find(item => Number(item.id) === id);
    if (item) {
        item.Quantity = newQuantity;
        updateCartDisplay();
    }
}

function removeCartItem(id) {
    cartItems = cartItems.filter(item => Number(item.id) !== id);
    updateCartDisplay();
    setCartCookie(cartItems);
}

updateCartDisplay(); 



function getCartCookie() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    var productIds = JSON.parse(decodeURIComponent(cookieValue));

    return Array.isArray(productIds) ? productIds : [];
}

function setCartCookie(productIds) {
    var serializedIds = JSON.stringify(productIds);

    document.cookie = "cart=" + encodeURIComponent(serializedIds);
}



var mybutton = document.getElementById("scrollToTopBtn");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrollToTop() {
    document.documentElement.scrollTop = 0;
}
