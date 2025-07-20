// ✅ تشغيل مودال الاشتراك
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("subscriptionModal");
  const closeBtn = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const monthlyOptions = document.getElementById("monthlyOptions");

  document.querySelectorAll(".subscribe-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isLoggedIn = false; // ← غير مسجل دخول (حالة تجريبية)

      if (!isLoggedIn) {
        window.location.href = "/login.html";
        return;
      }

      const card = btn.closest(".package-slide");
      const name = card.querySelector("h3")?.innerText || "باقة";
      const description = card.querySelector("p")?.innerText || "";

      const type = card.dataset.type || "monthly"; // data-type="one-time"

      modalTitle.innerText = name;
      modalDescription.innerText = description;
      monthlyOptions.style.display = (type === "monthly") ? "block" : "none";

      modal.classList.remove("hidden");
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});