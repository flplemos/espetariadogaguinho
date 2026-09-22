// Mock Data updated with AI Generated Images
const menuData = [
    {
        id: "tradicionais",
        title: "Espetos Tradicionais",
        items: [
            { id: 1, name: "Espeto de Carne", desc: "Alcatra macia e suculenta, temperada com sal grosso.", price: 10.00, image: "carne.jpg" },
            { id: 2, name: "Espeto de Frango", desc: "Peito de frango em cubos com tempero especial da casa.", price: 9.00, image: "frango.jpg" },
            { id: 3, name: "Espeto Misto", desc: "Intercalado de carne, frango e calabresa.", price: 11.00, image: "carne.jpg" },
            { id: 4, name: "Coraçãozinho", desc: "Coração de frango assado no ponto perfeito.", price: 9.50, image: "frango.jpg" }
        ]
    },
    {
        id: "premium",
        title: "Espetos Premium",
        items: [
            { id: 5, name: "Picanha", desc: "Corte nobre, extremamente macio com capa de gordura.", price: 18.00, image: "carne.jpg" },
            { id: 6, name: "Medalhão de Frango", desc: "Cubos de frango envoltos em bacon crocante.", price: 14.00, image: "frango.jpg" },
            { id: 7, name: "Queijo Coalho", desc: "Queijo coalho tostado com melado de cana.", price: 12.00, image: "pao_alho.jpg" }
        ]
    },
    {
        id: "acompanhamentos",
        title: "Acompanhamentos",
        items: [
            { id: 8, name: "Pão de Alho", desc: "Pão baguete recheado com pasta de alho e queijo.", price: 8.00, image: "pao_alho.jpg" },
            { id: 9, name: "Farofa da Casa", desc: "Farofa crocante com bacon e cebola na manteiga.", price: 5.00, image: "https://placehold.co/200x200/2c2c2c/ff4500?text=Farofa" },
            { id: 10, name: "Vinagrete", desc: "Tomate, cebola e pimentão picados com azeite.", price: 4.00, image: "https://placehold.co/200x200/2c2c2c/ff4500?text=Vinagrete" }
        ]
    },
    {
        id: "bebidas",
        title: "Bebidas",
        items: [
            { id: 11, name: "Coca-Cola Lata", desc: "Lata 350ml gelada.", price: 6.00, image: "https://placehold.co/200x200/2c2c2c/ff4500?text=Coca" },
            { id: 12, name: "Cerveja Heineken", desc: "Long Neck 330ml.", price: 10.00, image: "cerveja.jpg" },
            { id: 13, name: "Água com Gás", desc: "Garrafa 500ml.", price: 4.00, image: "https://placehold.co/200x200/2c2c2c/ff4500?text=Água" }
        ]
    }
];

// State
let cart = [];
let addressData = null;
let freightValue = 0;
let deliveryType = 'delivery';
let taxAmount = 0;

// User Auth Logic
let userProfile = { name: '', phone: '' };

const loadUserData = () => {
    const savedUser = localStorage.getItem('gaguinho_user');
    const savedAddress = localStorage.getItem('gaguinho_address');
    const btnOpenLogin = document.getElementById('btn-open-login');

    if (savedUser) {
        userProfile = JSON.parse(savedUser);
        btnOpenLogin.innerHTML = `<ion-icon name="person-circle"></ion-icon> <span>Olá, ${userProfile.name.split(' ')[0]}</span>`;
        btnOpenLogin.classList.add('logged');
        
        if (savedAddress) {
            addressData = JSON.parse(savedAddress);
            document.getElementById('cep').value = addressData.cep;
            document.getElementById('rua').value = addressData.logradouro;
            document.getElementById('bairro').value = addressData.bairro;
            document.getElementById('cidade').value = addressData.localidade;
            document.getElementById('numero').value = addressData.numero || '';
            document.getElementById('complemento').value = addressData.complemento || '';
            document.getElementById('address-fields').classList.add('active');
            calculateFreight(addressData);
        }
    }
};

// Generic Info Modal
const showInfoModal = (title, message, isSuccess = false) => {
    document.getElementById('info-title').textContent = title;
    document.getElementById('info-title').style.color = isSuccess ? 'var(--success)' : 'white';
    document.getElementById('info-message').textContent = message;
    document.getElementById('info-overlay').classList.add('active');
};

document.getElementById('btn-close-info').addEventListener('click', () => {
    document.getElementById('info-overlay').classList.remove('active');
});

document.getElementById('btn-login').addEventListener('click', () => {
    const name = document.getElementById('user-name').value.trim();
    const phone = document.getElementById('user-phone').value.trim();

    if (!name) {
        showInfoModal('Atenção', 'Preencha seu nome para continuar.');
        return;
    }
    
    const numericPhone = phone.replace(/\D/g, '');
    if (numericPhone.length < 10) {
        showInfoModal('Telefone Inválido', 'Por favor, digite um número de WhatsApp válido com DDD.');
        return;
    }

    userProfile = { name, phone };
    localStorage.setItem('gaguinho_user', JSON.stringify(userProfile));
    
    const btnOpenLogin = document.getElementById('btn-open-login');
    btnOpenLogin.innerHTML = `<ion-icon name="person-circle"></ion-icon> <span>Olá, ${userProfile.name.split(' ')[0]}</span>`;
    btnOpenLogin.classList.add('logged');
    
    document.getElementById('login-overlay').classList.remove('active');
});

document.getElementById('btn-open-login').addEventListener('click', () => {
    document.getElementById('user-name').value = userProfile.name || '';
    document.getElementById('user-phone').value = userProfile.phone || '';
    document.getElementById('login-overlay').classList.add('active');
});

document.getElementById('close-login').addEventListener('click', () => {
    document.getElementById('login-overlay').classList.remove('active');
});

// Reviews Logic
const mockReviews = [
    { name: "Maria Silva", text: "Melhor espeto da região! A carne é super macia e o pão de alho é divino.", rating: 5 },
    { name: "Carlos Eduardo", text: "Entrega super rápida e comida chegou quentinha. Recomendo muito!", rating: 5 },
    { name: "Ana Clara", text: "O ambiente novo tá lindo, mas pelo delivery a qualidade se manteve impecável.", rating: 5 },
    { name: "Roberto", text: "Excelente atendimento. Ganharam um cliente fiel.", rating: 5 }
];

const renderReviews = () => {
    const list = document.getElementById('reviews-list');
    list.innerHTML = mockReviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-name">${r.name}</span>
                <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
            </div>
            <div class="review-text">${r.text}</div>
        </div>
    `).join('');
};

document.getElementById('btn-open-reviews').addEventListener('click', () => {
    renderReviews();
    document.getElementById('reviews-overlay').classList.add('active');
    document.getElementById('review-input-area').style.display = 'none';
    document.getElementById('btn-rate-here').style.display = 'block';
});

document.getElementById('close-reviews').addEventListener('click', () => {
    document.getElementById('reviews-overlay').classList.remove('active');
});

let selectedRating = 5;

const updateStars = (value) => {
    const stars = document.querySelectorAll('#star-rating-select ion-icon');
    stars.forEach(s => {
        if (parseInt(s.getAttribute('data-value')) <= value) {
            s.style.color = '#FBBF24';
        } else {
            s.style.color = 'var(--border)';
        }
    });
};

document.querySelectorAll('#star-rating-select ion-icon').forEach(star => {
    star.addEventListener('click', (e) => {
        selectedRating = parseInt(e.target.getAttribute('data-value'));
        updateStars(selectedRating);
    });
});

document.getElementById('btn-rate-here').addEventListener('click', () => {
    if (!userProfile.name) {
        document.getElementById('reviews-overlay').classList.remove('active');
        document.getElementById('login-overlay').classList.add('active');
    } else {
        selectedRating = 5;
        updateStars(5);
        document.getElementById('btn-rate-here').style.display = 'none';
        document.getElementById('review-input-area').style.display = 'block';
        document.getElementById('review-text').focus();
    }
});

document.getElementById('btn-submit-review').addEventListener('click', () => {
    const text = document.getElementById('review-text').value.trim();
    if (!text) return;
    
    mockReviews.unshift({
        name: userProfile.name.split(' ')[0],
        text: text,
        rating: selectedRating
    });
    
    document.getElementById('review-text').value = '';
    renderReviews();
    document.getElementById('review-input-area').style.display = 'none';
    document.getElementById('btn-rate-here').style.display = 'block';
    
    showInfoModal('Avaliação Enviada!', 'Muito obrigado pelo seu feedback.', true);
});

// Format Currency
const formatMoney = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Render Menu
const renderMenu = () => {
    const nav = document.getElementById('category-nav');
    const container = document.getElementById('menu-container');

    menuData.forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = `cat-btn ${index === 0 ? 'active' : ''}`;
        btn.textContent = category.title;
        btn.onclick = () => {
            const section = document.getElementById(`section-${category.id}`);
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = section.getBoundingClientRect().top;
            window.scrollTo({ top: (elementRect - bodyRect) - offset, behavior: "smooth" });
        };
        nav.appendChild(btn);

        const section = document.createElement('section');
        section.className = 'category-section';
        section.id = `section-${category.id}`;
        
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = category.title;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-img">
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${item.name}</h3>
                        <p class="product-desc">${item.desc}</p>
                    </div>
                    <div class="product-footer">
                        <span class="product-price">${formatMoney(item.price)}</span>
                        <button class="btn-add" onclick="addToCart(${item.id})">
                            <ion-icon name="add"></ion-icon>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        section.appendChild(grid);
        container.appendChild(section);
    });
};

const setupScrollSpy = () => {
    const sections = document.querySelectorAll('.category-section');
    const navButtons = document.querySelectorAll('.cat-btn');
    const navContainer = document.getElementById('category-nav');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id.replace('section-', '');
                navButtons.forEach(btn => {
                    const isActive = btn.textContent === menuData.find(c => c.id === id).title;
                    btn.classList.toggle('active', isActive);
                    if (isActive) {
                        const btnRect = btn.getBoundingClientRect();
                        const navRect = navContainer.getBoundingClientRect();
                        navContainer.scrollBy({ left: btnRect.left - navRect.left + (btnRect.width / 2) - (navRect.width / 2), behavior: 'smooth' });
                    }
                });
            }
        });
    }, { threshold: 0.1, rootMargin: "-90px 0px -60% 0px" });
    sections.forEach(sec => observer.observe(sec));
};

// Cart Logic
const findItemById = (id) => {
    for (const cat of menuData) {
        const item = cat.items.find(i => i.id === id);
        if (item) return item;
    }
    return null;
};

const addToCart = (id) => {
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...findItemById(id), qty: 1 });
    }
    updateCartUI();
    const fab = document.getElementById('cart-fab');
    fab.classList.add('pulse');
    setTimeout(() => fab.classList.remove('pulse'), 200);
};

const clearCart = () => {
    document.getElementById('confirm-overlay').classList.add('active');
};
window.clearCart = clearCart;

document.getElementById('btn-cancel-clear').addEventListener('click', () => {
    document.getElementById('confirm-overlay').classList.remove('active');
});

document.getElementById('btn-confirm-clear').addEventListener('click', () => {
    cart = [];
    updateCartUI();
    document.getElementById('confirm-overlay').classList.remove('active');
});

const updateQty = (id, delta) => {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].qty += delta;
        if (cart[itemIndex].qty <= 0) cart.splice(itemIndex, 1);
        updateCartUI();
    }
};

window.updateQty = updateQty;
window.addToCart = addToCart;

const getCartSubtotal = () => cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

const updateCartUI = () => {
    const fab = document.getElementById('cart-fab');
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    document.getElementById('cart-badge').textContent = totalItems;
    document.getElementById('cart-fab-total').textContent = formatMoney(getCartSubtotal());

    if (totalItems > 0) {
        fab.classList.add('visible');
    } else {
        fab.classList.remove('visible');
        closeCart();
    }
    renderCartItems();
    updateCheckoutSummary();
};

const renderCartItems = () => {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty-state">Seu carrinho está vazio.</p>';
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.qty}x ${item.name}</div>
                <div class="cart-item-price">${formatMoney(item.price * item.qty)}</div>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)"><ion-icon name="remove-circle-outline"></ion-icon></button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)"><ion-icon name="add-circle-outline"></ion-icon></button>
            </div>
        </div>
    `).join('');
};

// Checkout & Total calculations
const updateCheckoutSummary = () => {
    const subtotal = getCartSubtotal();
    
    // Freight visibility
    let appliedFreight = deliveryType === 'retirada' ? 0 : freightValue;
    
    // Check payment method for 5% tax
    const paymentSelect = document.getElementById('payment-select');
    const isCredit = paymentSelect.options[paymentSelect.selectedIndex].text.includes('+5%');
    
    taxAmount = isCredit ? (subtotal + appliedFreight) * 0.05 : 0;
    const total = subtotal + appliedFreight + taxAmount;
    
    document.getElementById('subtotal').textContent = formatMoney(subtotal);
    document.getElementById('freight-line').style.display = deliveryType === 'retirada' ? 'none' : 'flex';
    document.getElementById('freight').textContent = addressData ? (appliedFreight > 0 ? formatMoney(appliedFreight) : "Grátis") : "Calcular...";
    
    document.getElementById('tax-line').style.display = isCredit ? 'flex' : 'none';
    document.getElementById('tax-amount').textContent = formatMoney(taxAmount);
    
    document.getElementById('total-geral').textContent = formatMoney(total);

    const checkoutBtn = document.getElementById('btn-checkout');
    const numero = document.getElementById('numero').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    
    const cepInput = document.getElementById('cep');
    const numInput = document.getElementById('numero');
    const compInput = document.getElementById('complemento');

    if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = '<ion-icon name="cart-outline"></ion-icon> Carrinho Vazio';
        cepInput.style.borderColor = '';
        numInput.style.borderColor = '';
        compInput.style.borderColor = '';
    } else if (deliveryType === 'delivery' && (!addressData || !numero || !complemento)) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon> Faltam Dados de Entrega';
        
        cepInput.style.borderColor = !addressData ? 'var(--danger)' : '';
        numInput.style.borderColor = (addressData && !numero) ? 'var(--danger)' : '';
        compInput.style.borderColor = (addressData && !complemento) ? 'var(--danger)' : '';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = '<ion-icon name="logo-whatsapp"></ion-icon> Finalizar Pedido';
        cepInput.style.borderColor = '';
        numInput.style.borderColor = '';
        compInput.style.borderColor = '';
    }
};

// Events for Checkout Elements
document.getElementById('payment-select').addEventListener('change', updateCheckoutSummary);
document.querySelectorAll('input[name="delivery_type"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        deliveryType = e.target.value;
        document.getElementById('delivery-form').style.display = deliveryType === 'retirada' ? 'none' : 'block';
        
        const paymentSelect = document.getElementById('payment-select');
        if (deliveryType === 'retirada') {
            paymentSelect.innerHTML = `
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
            `;
        } else {
            paymentSelect.innerHTML = `
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix - Trazer máquina">Pix - Trazer máquina</option>
                <option value="Cartão de Débito - Maquininha">Cartão de Débito - Maquininha</option>
                <option value="Cartão de Crédito - Maquininha">Cartão de Crédito - Maquininha (+5%)</option>
            `;
        }
        
        updateCheckoutSummary();
    });
});

// ViaCEP logic
const calculateFreight = (data) => {
    const bairro = data.bairro.toLowerCase();
    if (data.localidade !== 'Natal') freightValue = 15.00;
    else if (bairro.includes('felipe camarão')) freightValue = 0.00;
    else if (bairro.includes('cidade da esperança') || bairro.includes('bom pastor')) freightValue = 5.00;
    else freightValue = 8.00;
    updateCheckoutSummary();
};

document.getElementById('btn-cep').addEventListener('click', async () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) { alert('Digite um CEP válido com 8 números.'); return; }

    const btn = document.getElementById('btn-cep');
    btn.innerHTML = '<ion-icon name="sync-outline" class="spin"></ion-icon>';
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) throw new Error();

        addressData = data;
        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = `${data.localidade} - ${data.uf}`;
        document.getElementById('address-fields').classList.add('active');
        calculateFreight(data);
    } catch {
        alert('CEP não encontrado. Verifique e tente novamente.');
    } finally {
        btn.textContent = 'Buscar';
    }
});

document.getElementById('numero').addEventListener('input', updateCheckoutSummary);
document.getElementById('complemento').addEventListener('input', updateCheckoutSummary);

// WhatsApp Checkout
document.getElementById('btn-checkout').addEventListener('click', () => {
    if (cart.length === 0) return;

    if (!isStoreOpen()) {
        document.getElementById('closed-overlay').classList.add('active');
        return;
    }

    if (!userProfile.name || !userProfile.phone) {
        showInfoModal('Login Necessário', 'Por favor, clique em Login e informe seus dados antes de finalizar o pedido.');
        document.getElementById('login-overlay').classList.add('active');
        return;
    }

    const numero = document.getElementById('numero').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    const paymentMethod = document.getElementById('payment-select').value;

    if (deliveryType === 'delivery' && (!numero || !complemento)) {
        showInfoModal('Endereço Incompleto', 'Preencha o número e o complemento do endereço para entrega.');
        document.getElementById(!numero ? 'numero' : 'complemento').focus();
        return;
    }

    // Save Address
    if (deliveryType === 'delivery' && addressData) {
        addressData.numero = numero;
        addressData.complemento = complemento;
        localStorage.setItem('gaguinho_address', JSON.stringify(addressData));
    }

    const subtotal = getCartSubtotal();
    const appliedFreight = deliveryType === 'retirada' ? 0 : freightValue;
    const total = subtotal + appliedFreight + taxAmount;

    let text = `🥩 *NOVO PEDIDO | ESPETARIA DO GAGUINHO* 🥩%0A`;
    text += `----------------------------------------%0A`;
    text += `👤 *Cliente:* ${userProfile.name}%0A`;
    text += `📱 *Contato:* ${userProfile.phone}%0A%0A`;
    
    text += `🛒 *RESUMO DO PEDIDO:*%0A`;
    text += `----------------------------------------%0A`;
    cart.forEach(item => { 
        text += `👉 ${item.qty}x ${item.name} (${formatMoney(item.price * item.qty)})%0A`; 
    });
    
    text += `%0A💰 *VALORES:*%0A`;
    text += `----------------------------------------%0A`;
    text += `Subtotal: ${formatMoney(subtotal)}%0A`;
    if (deliveryType === 'delivery') {
        text += `Frete: ${appliedFreight > 0 ? formatMoney(appliedFreight) : "Grátis"}%0A`;
    }
    if (taxAmount > 0) {
        text += `Acréscimo Cartão (5%): ${formatMoney(taxAmount)}%0A`;
    }
    text += `*TOTAL GERAL: ${formatMoney(total)}*%0A%0A`;
    
    text += `💳 *FORMA DE PAGAMENTO:*%0A`;
    text += `----------------------------------------%0A`;
    text += `${paymentMethod}%0A%0A`;

    text += `🛵 *MODO DE ENTREGA:*%0A`;
    text += `----------------------------------------%0A`;
    if (deliveryType === 'retirada') {
        text += `*🤝 RETIRADA NO LOCAL*`;
    } else {
        text += `*🛵 DELIVERY*%0A`;
        text += `📍 ${addressData.logradouro}, ${numero}%0A`;
        if (complemento) text += `Complemento: ${complemento}%0A`;
        text += `Bairro: ${addressData.bairro}%0A`;
        text += `Cidade: ${addressData.localidade} - ${addressData.uf}%0A`;
    }

    window.open(`https://api.whatsapp.com/send?phone=558494733381&text=${text}`, '_blank');
});

// Modals
document.getElementById('cart-fab').addEventListener('click', () => {
    document.getElementById('cart-overlay').classList.add('active');
    document.getElementById('cart-modal').classList.add('active');
});
const closeCart = () => {
    document.getElementById('cart-overlay').classList.remove('active');
    document.getElementById('cart-modal').classList.remove('active');
};
document.getElementById('close-cart').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

document.getElementById('btn-close-closed').addEventListener('click', () => {
    document.getElementById('closed-overlay').classList.remove('active');
});

// Store Status Logic
const isStoreOpen = () => {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Fortaleza" }));
    const day = now.getDay();
    const hour = now.getHours();

    // Qua(3) a Sex(5): 17 as 00
    if (day >= 3 && day <= 5) {
        if (hour >= 17) return true;
    } 
    // Sab(6) e Dom(0): 12 as 00
    else if (day === 6 || day === 0) {
        if (hour >= 12) return true;
    }
    return false;
};

const checkStoreStatus = () => {
    const isOpen = isStoreOpen();
    const badge = document.getElementById('store-status');
    const text = document.getElementById('store-status-text');

    if (isOpen) {
        badge.classList.remove('closed');
        badge.classList.add('open');
        text.textContent = 'Aberto';
    } else {
        badge.classList.remove('open');
        badge.classList.add('closed');
        text.textContent = 'Fechado';
    }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    checkStoreStatus();
    setInterval(checkStoreStatus, 60000); // Check every minute
    
    loadUserData();
    renderMenu();
    setupScrollSpy();
});
