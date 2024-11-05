// Cart functionality
let cart = [];

function addToCart(item) {
    cart.push(item);
    updateCartCount();
    updateCartModal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartModal();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += parseFloat(item.price);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: button.dataset.price
            };
            addToCart(item);
        });
    });

    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close');

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        alert('Thank you for your order!');
        cart = [];
        updateCartCount();
        updateCartModal();
        cartModal.style.display = 'none';
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
});