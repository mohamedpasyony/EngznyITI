//Start slider 
var nextBtn = document.getElementById("NextBtn");
var previousBtn = document.getElementById("PreviousBtn");
var image = document.getElementById("Slider");
var Count = 0;
nextBtn.addEventListener("click", function () {
    Count--;
    if (Count < 1) {
        Count = 3;
    }
    image.setAttribute("src", "imgs/" + Count + ".png");
})

previousBtn.addEventListener("click", function () {
    Count++;
    if (Count > 3) {
        Count = 1
    }
    image.setAttribute("src", "imgs/" + Count + ".png");
})
function play() {
    setInterval(function () {
        Count++;
        if (Count > 3) {
            Count = 1
        }
        image.setAttribute("src", "imgs/" + Count + ".png");
    }, 4000)
}

//End Slider

//Get all Product
function getAllProducts() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fakestoreapi.com/products", true); // true for asynchronous
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            var myDiv = document.getElementById("ProductSection");
            myDiv.innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                var product = response[i];
                myDiv.innerHTML += `
                <div class="col-md-6 col-lg-4">
                    <div class="card mb-3">
                        <img class="card-img-top" src="${product.image}" alt="Card image">
                        <div class="card-body">
                            <h4 class="card-title">${product.title}</h4>
                            <p class="card-text text-black-50">${product.category}</p>
                            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                            <p class="card-text">${generateStarRating(product.rating.rate)} <strong>: Rating</strong></p>
                            <a data-product-Quantity=1 data-product-image="${product.image}" data-product-price=${product.price} data-product-name="${product.title}"  data-product-id=${product.id} class="addToCart btn btn-success">
                                <i class="fa-solid fa-cart-shopping"></i> Add To Cart
                            </a>
                        </div>
                    </div>
                </div>`;
            }



        }
    };

}
getAllProducts();

//end get all product


// Staring Rating
function generateStarRating(rating) {
    const stars = '★'.repeat(Math.floor(rating)); // Full stars
    const halfStar = (rating % 1 !== 0) ? '★' : ''; // Half star if there's a remainder
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating)); // Remaining empty stars
    return `<span class="rating">${stars}${halfStar}${emptyStars}</span>`;
}
//end


//Filter By Category
function filterByCategory(category) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://fakestoreapi.com/products/category/${category}`, true); // true for asynchronous
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            var myDiv = document.getElementById("ProductSection");
            myDiv.innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                var product = response[i];
                myDiv.innerHTML += `
                <div class="col-md-6 col-lg-4">
                    <div class="card mb-3">
                        <img class="card-img-top" src="${product.image}" alt="Card image">
                        <div class="card-body">
                            <h4 class="card-title">${product.title}</h4>
                            <p class="card-text text-black-50">${product.category}</p>
                            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                            <p class="card-text">${generateStarRating(product.rating.rate)} <strong>: Rating</strong></p>
                            <a data-product-Quantity=1 data-product-image="${product.image}" data-product-price=${product.price} data-product-name="${product.title}" data-product-id=${product.id} class="addToCart btn btn-success">
                                <i class="fa-solid fa-cart-shopping"></i> Add To Cart
                            </a>
                        </div>
                    </div>
                </div>`;
            }

        }
    };
}

//end


// Start cart counter
var cartCounter = 0;
var addedProducts = [];

function addToCartClickHandler(event) {
    var product = {
        id: event.target.getAttribute("data-product-id"),
        name: event.target.getAttribute("data-product-name"),
        price: parseFloat(event.target.getAttribute("data-product-price")),
        image: event.target.getAttribute("data-product-image"),
        Quantity: event.target.getAttribute("data-product-Quantity"),
    };

    var existingProductIndex = addedProducts.findIndex(item => item.id === product.id);

    if (existingProductIndex === -1) {
        addedProducts.push(product);

        cartCounter++;

        document.getElementById("cartCounter").innerText = cartCounter;

        ;
    } else {
        alert("Product already in the cart");
    }
}

document.getElementById("ProductSection").addEventListener("click", function (event) {
    if (event.target.classList.contains("addToCart")) {
        addToCartClickHandler(event);
    }
});


function setCartCookie(productIds) {
    var serializedIds = JSON.stringify(productIds);
    document.cookie = "cart=" + encodeURIComponent(serializedIds);
}

var cartWindow = document.getElementById("Cart");
cartWindow.addEventListener("click", function (event) {
    setCartCookie(addedProducts);
    window.open("how.html");
    event.preventDefault();
});

//end


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










