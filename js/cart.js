const DEBUG_MODE = false;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " 已加入購物車！");
  showCartStorage();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function showCartStorage() {
  if (DEBUG_MODE) {
  let data = localStorage.getItem("cart");
  document.getElementById("debug").innerText = "LocalStorage cart: " + data;
  }
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    document.getElementById("cart").innerHTML = "<p>購物車是空的</p>";
    return;
  }

  let html = "<h3>購物車</h3><ul>";
  let total = 0;
  cart.forEach((item, index) => {
    let subtotal = item.price * item.quantity;
    html += `<li>${item.name} - HK$${item.price} × ${item.quantity} = HK$${subtotal}
             <button onclick="changeQuantity(${index},1)">+</button>
             <button onclick="changeQuantity(${index},-1)">−</button>
             <button onclick="removeItem(${index})">刪除</button></li>`;
    total += subtotal;
  });
  html += `</ul><p>總金額: HK$${total}</p>`;
  html += `<button onclick="checkout(${total})">結帳</button>`;
  document.getElementById("cart").innerHTML = html;
}

function checkout(amount) {
  alert("模擬結帳：總金額 HK$" + amount + "。正式版需呼叫後端 API。");
}
