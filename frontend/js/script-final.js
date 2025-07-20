
document.addEventListener("DOMContentLoaded", () => {
  // ✅ القائمة الجانبية
  const toggleBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarBtn = document.getElementById("closeSidebar");

  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  closeSidebarBtn?.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });

  // ✅ زر ابدأ الآن
  const startButton = document.getElementById("startNow");
  if (startButton) {
  const targetSection = document.getElementById("services");
  startButton?.addEventListener("click", () => {
    targetSection.scrollIntoView({ behavior: "smooth" });
  });

    startButton.addEventListener("click", () => {
      
    });
  }

  /*** ✅ الاشتراك - نموذج الدفع ***/
  const modal = document.getElementById("subscriptionModal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const monthlyOptions = document.getElementById("monthlyOptions");
  const planDuration = document.getElementById("planDuration");
  const confirmBtn = document.getElementById("confirmBtn");

  const cardNumber = document.getElementById("cardNumber");
  const cardHolder = document.getElementById("cardHolder");
  const cardExpiry = document.getElementById("cardExpiry");
  const cardCvv = document.getElementById("cardCvv");
  const creditCard = document.getElementById("creditCard");

  const inputNumber = document.getElementById("inputCardNumber");
  const inputName = document.getElementById("inputCardHolder");
  const inputExpiry = document.getElementById("inputExpiry");
  const inputCvv = document.getElementById("inputCvv");

  let selectedPrice = "";

  document.querySelectorAll(".subscribe-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isLoggedIn = true;
      if (!isLoggedIn) {
        window.location.href = "/login.html";
        return;
      }
      const card = btn.closest(".package-slide");
      const name = card.querySelector("h3")?.innerText || "باقة";
      const description = card.querySelector("p")?.innerText || "";
      const type = card.dataset.type || "monthly";
      selectedPrice = card.dataset.price || "--";
      modalTitle.innerText = name;
      modalDescription.innerText = description;
      modalPrice.innerText = `السعر: ${selectedPrice}`;
      monthlyOptions.style.display = (type === "monthly") ? "block" : "none";
      modal.classList.remove("hidden");
    });
  });

  closeModal?.addEventListener("click", () => {
    modal.classList.add("hidden");
    resetForm();
  });

  inputNumber?.addEventListener("input", () => {
    const formatted = inputNumber.value.replace(/[^0-9]/g, "").replace(/(.{4})/g, "$1 ").trim();
    inputNumber.value = formatted.slice(0, 19);
    cardNumber.textContent = formatted || "•••• •••• •••• ••••";
    const logo = creditCard.querySelector(".logo");
    if (inputNumber.value.startsWith("4")) {
      logo.textContent = "Visa";
    } else if (inputNumber.value.startsWith("5")) {
      logo.textContent = "MasterCard";
    } else {
      logo.textContent = "بطاقة";
    }
    checkForm();
  });

  inputName?.addEventListener("input", () => {
    cardHolder.textContent = inputName.value || "اسم البطاقة";
    checkForm();
  });

  inputExpiry?.addEventListener("input", () => {
    let value = inputExpiry.value.replace(/[^0-9]/g, "");
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    inputExpiry.value = value.slice(0, 5);
    cardExpiry.textContent = value || "MM/YY";
    checkForm();
  });

  inputCvv?.addEventListener("input", () => {
    cardCvv.textContent = inputCvv.value || "•••";
    if (inputCvv.value.length > 0) {
      creditCard.classList.add("flipped");
    } else {
      creditCard.classList.remove("flipped");
    }
    checkForm();
  });

  function checkForm() {
    if (
      inputNumber.value.length === 19 &&
      inputName.value.length >= 3 &&
      inputExpiry.value.length === 5 &&
      inputCvv.value.length === 3
    ) {
      confirmBtn.disabled = false;
    } else {
      confirmBtn.disabled = true;
    }
  }

  function resetForm() {
    document.getElementById("paymentForm").reset();
    cardNumber.textContent = "•••• •••• •••• ••••";
    cardHolder.textContent = "اسم البطاقة";
    cardExpiry.textContent = "MM/YY";
    cardCvv.textContent = "•••";
    creditCard.classList.remove("flipped");
    confirmBtn.disabled = true;
  }

  document.getElementById("paymentForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`✅ تم الدفع بنجاح!
الباقة: ${modalTitle.innerText}
السعر: ${selectedPrice}`);
    modal.classList.add("hidden");
    resetForm();
  });
});

// ✅ انتهى السكربت المكتمل



// ✅ Loader & Toast & Fake Save
function showLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.style.position = "fixed";
  loader.style.inset = "0";
  loader.style.background = "rgba(0,0,0,0.6)";
  loader.style.display = "flex";
  loader.style.justifyContent = "center";
  loader.style.alignItems = "center";
  loader.innerHTML = "<div style='background:#fff;padding:20px;border-radius:10px'>🚀 جاري معالجة الدفع...</div>";
  document.body.appendChild(loader);
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.remove();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#00b894";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

document.getElementById("paymentForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  showLoader();

  setTimeout(() => {
    hideLoader();
    // ✅ حفظ البيانات مؤقتًا
    const paymentData = {
      cardNumber: inputNumber.value,
      cardHolder: inputName.value,
      expiry: inputExpiry.value,
      price: selectedPrice,
      package: modalTitle.innerText
    };
    console.log("✅ Payment Data:", paymentData);

    // ✅ عرض الفاتورة
    alert(`✅ تم الدفع بنجاح!\nالباقة: ${paymentData.package}\nالسعر: ${paymentData.price}\nالرقم: ${paymentData.cardNumber}`);

    // ✅ Toast
    showToast("✅ تمت عملية الدفع بنجاح!");

    modal.classList.add("hidden");
    resetForm();
  }, 2000);
});

// ✅ Apple Pay & Google Pay (واجهة وهمية للربط لاحقًا)
const paySection = document.createElement("div");
paySection.style.marginTop = "10px";
paySection.innerHTML = `
  <button style="background:#000;color:white;padding:10px 20px;border-radius:8px;margin:5px">Apple Pay</button>
  <button style="background:#4285F4;color:white;padding:10px 20px;border-radius:8px;margin:5px">Google Pay</button>
`;
document.querySelector(".modal-content")?.appendChild(paySection);



// ✅ FAQ Accordion Logic
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});



// ✅ تحديث السنة تلقائيًا في الحقوق
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});



// ✅ سنة الحقوق
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

// ✅ FAQ Accordion - واحد مفتوح فقط
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== btn.parentElement) {
        item.classList.remove("active");
      }
    });
    btn.parentElement.classList.toggle("active");
  });
});



// ✅ سنة الحقوق
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// ✅ FAQ Accordion - واحد مفتوح فقط
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== btn.parentElement) {
        item.classList.remove("active");
      }
    });
    btn.parentElement.classList.toggle("active");
  });
});




document.querySelectorAll('.subscribe-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.package-card, .package-slide');
    const title = card.querySelector('.plan-title, h3')?.innerText || "باقة";
    
    // تحديد السعر بشكل ذكي
    const newPriceEl = card.querySelector('.new-price');
    const fallbackPriceEl = card.querySelector('.plan-price, .price');
    const price = newPriceEl ? newPriceEl.innerText : (fallbackPriceEl?.innerText || "—");

    // نوع الباقة (once أو monthly)
    const type = card.dataset.type || "once";

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalPrice").textContent = `السعر: ${price}`;

    // إظهار أو إخفاء خيارات الاشتراك
    const subscriptionOptions = document.getElementById("monthlyOptions");
    if (subscriptionOptions) {
      subscriptionOptions.style.display = (type === "once") ? "none" : "block";
    }

    document.getElementById("subscriptionModal").classList.remove("hidden");
  });
});


// إغلاق المودال
document.getElementById("closeModal")?.addEventListener("click", () => {
  document.getElementById("subscriptionModal").classList.add("hidden");
});
