document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartContainer = document.querySelector('.carrito-items');
    const totalDisplay = document.getElementById('total');
    const openCartLink = document.getElementById('open-cart-link');
    const carritoModal = document.getElementById('carrito-modal');
    const closeModalButton = document.getElementById('close-modal');

    // Mostrar la notificación
    function showNotification(message) {
        const notification = document.createElement('div'); 
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '10px';
        notification.style.right = '10px';
        notification.style.backgroundColor = '#28a745';
        notification.style.color = 'white';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.fontSize = '16px';
        notification.style.zIndex = '1000';

        document.body.appendChild(notification); // Añadir la notificación 

        // Después de 3 segundos, ocultar la notificación
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Actualiza el carrito
    function updateCart() {
        cartContainer.innerHTML = ''; 
        let total = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Precio: $${item.price}</p>
                <p>Cantidad: ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalDisplay.textContent = total;
    }

    openCartLink.addEventListener('click', () => {
        carritoModal.style.display = 'block';
        updateCart(); 
    });

    closeModalButton.addEventListener('click', () => {
        carritoModal.style.display = 'none';
    });

    // Añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card');
            const id = productCard.getAttribute('data-id');
            const name = productCard.querySelector('h5').textContent;
            const price = parseInt(productCard.querySelector('p').textContent.replace('$', ''), 10);

            const existingItem = cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ id, name, price, quantity: 1 });
            }

            updateCart(); 
            showNotification(`${name} ha sido añadido al carrito`); 
        });
    });

    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemId = e.target.getAttribute('data-id');
            const index = cartItems.findIndex(item => item.id === itemId);
            if (index !== -1) {
                cartItems.splice(index, 1); 
                updateCart(); 
            }
        }
    });
});
