


// Array to store user data
const users = [
    { username: "admin", password: "admin"},
    { username: "denmark", password: "bensing" },
    { username: "rex", password: "tolentino" },
    { username: "arden", password: "deocampo" }
];

// Function to handle user login
function LogIn() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    // Find the user in the users array
    const foundUser = users.find(u => u.username === user && u.password === pass);

    if (foundUser) {
        // Store the logged-in user in local storage
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        alert("Login successful!");
        window.location.href = "shop.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Function to handle user signup
function SignUp() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var conPass = document.getElementById("conpassword").value;

    if (pass === conPass) {
        // Add the new user to the users array
        users.push({ username: user, password: pass });
        alert("Sign up successful! You can now log in.");
        window.location.href = "login.html";
    } else {
        alert("Passwords do not match. Please try again.");
    }
}

// Function to toggle password visibility
function ShowPass() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function ScrollRight1() {  
    document.getElementById('container4a').scrollLeft += 400;  // Scroll right by increasing scrollLeft
  }
  
  function ScrollLeft1() {  
    document.getElementById('container4a').scrollLeft -= 400;  // Scroll left by decreasing scrollLeft
  }

function ScrollRight2() {  
  document.getElementById('container4b').scrollLeft += 400;  // Scroll right by increasing scrollLeft
}

function ScrollLeft2() {  
  document.getElementById('container4b').scrollLeft -= 400;  // Scroll left by decreasing scrollLeft
}


// Function to handle cart operations
let cart = [];

// Function to open cart sidebar
function openNav() {
    document.getElementById("mySidebar").style.width = "550px";
}

// Function to close cart sidebar
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Function to show product details
function showProductDetails(name, price, imageUrl) {
    document.getElementById("itemDetails").style.display = "block";
    document.getElementById("productImage").src = imageUrl;
    document.getElementById("productName").innerText = name;
    document.getElementById("productPrice").innerText = price;
}

// Function to handle cart checkout
function checkout() {
    // Convert cart to JSON string and encode it for URL
    const cartJson = encodeURIComponent(JSON.stringify(cart));

    // Redirect to checkout page with cart data
    window.location.href = `cart.html?cart=${cartJson}`;
}

// Function to initialize cart items from local storage
document.addEventListener("DOMContentLoaded", function() {
    // Get the cart data from local storage
    const checkoutForm = document.getElementById("checkout-form");

    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        alert("Your order has been successfully submitted!");
        checkoutPopup.style.display = "none";

    });
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
});

// Function to add product to cart
function addToCart() {
    const name = document.getElementById("productName").innerText;
    const price = parseInt(document.getElementById("productPrice").innerText);
    const quantity = parseInt(document.getElementById("quantity").value);
    const imageUrl = document.getElementById("productImage").src;

    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        // If the item already exists, update its quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // If the item does not exist, add it to the cart
        const product = { name, price, quantity, imageUrl };
        cart.push(product);
    }

    // Update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart();
}

// Function to update cart UI
function updateCart() {
    updateCartBadge();
    const cartItemsDiv = document.getElementById("cartItems");
    const totalDiv = document.getElementById("total");
    cartItemsDiv.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cartItem";

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemDiv.innerHTML = `
            <div class="itemImage"><img src="${item.imageUrl}" alt="${item.name}"></div>
            <div class="itemName">${item.name}</div>
            <div class="itemQuantity"><div class=itemPrice>PHP ${item.price}.00 </div> <br>Quantity: ${item.quantity}</div>
            <div class="removeButton"><button onclick="removeFromCart(${index})">Remove</button></div>
        `;

        cartItemsDiv.appendChild(cartItemDiv);
       
    });

    totalDiv.innerText = ` PHP ${total.toFixed(2)}`;
}

// Function to remove product from cart
function removeFromCart(index) {
    cart.splice(index, 1);

    // Update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart();
}

// Function to close product details modal
function closeItemDetails() {
    document.getElementById("itemDetails").style.display = "none";
}
window.onload = function() {
    closeNav();
};

function updateCartBadge() {
    const cartBadge = document.getElementById("cartBadge");
    let totalQuantity = 0;

    if (cart.length > 0) {
        cartBadge.style.display = 'block';
        cartBadge.innerText = cart.length;
    } else {
        cartBadge.style.display = 'none';
    }
    // Calculate total quantity
    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    // Update the badge with the total quantity
    cartBadge.textContent = totalQuantity;
}
// Array of image URLs for the slideshow
const imageUrls = [
    "images/bg_2.jpg",
    "images/bg_3.jpg",
    "images/guitar_bg.jpg",
    // Add more image URLs as needed
];

// Function to change the hero image
function changeHeroImage() {
    const heroImg = document.getElementById('hero-img');
    // Get a random index to select a new image URL
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    // Set the src attribute of the hero image to a new random image URL
    heroImg.src = imageUrls[randomIndex];
}

// Change hero image every 5 seconds (5000 milliseconds)
setInterval(changeHeroImage, 4000);

const openCheckoutButton = document.getElementById('open-checkout-button');
const checkoutPopup = document.getElementById('checkout-popup');
const closeCheckoutButton = document.getElementById('close-checkout-button');

openCheckoutButton.addEventListener('click', () => {
  checkoutPopup.style.display = 'block';
});

closeCheckoutButton.addEventListener('click', () => {
  checkoutPopup.style.display = 'none';
});