// Modal handling (existing code)
const modal = document.getElementById("bookModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".book-card").forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalDescription.textContent = card.getAttribute("data-description");
        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// ===== Want to Read functionality =====
let wantToReadCount = 0;
const cartIcon = document.querySelector(".cart");

document.querySelectorAll(".want-to-read").forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent triggering modal
        wantToReadCount++;
        updateCartCount();
    });
});

function updateCartCount() {
    let badge = document.querySelector(".cart-badge");
    if (!badge) {
        badge = document.createElement("span");
        badge.classList.add("cart-badge");
        cartIcon.appendChild(badge);
    }
    badge.textContent = wantToReadCount;
}
