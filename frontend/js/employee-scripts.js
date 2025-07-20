// ✅ فتح وإغلاق القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.add("open");
});
document.getElementById("closeSidebar")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.remove("open");
});

// ✅ عرض اسم الموظف
const employeeName = "أحمد الساعدي"; // لاحقًا من قاعدة البيانات
document.getElementById("employeeTitle").textContent = `مرحبًا بك، ${employeeName}!`;

// ✅ قبول الطلب وتحريكه إلى التنفيذ
document.querySelectorAll(".accept-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".order-card");
        const activeSection = document.querySelector("#activeOrders .orders-list");

        card.classList.remove("waiting");
        card.classList.add("active");
        card.querySelector("p").innerHTML = "<strong>الحالة:</strong> قيد التنفيذ";
        card.innerHTML += `<p><strong>الوقت المتبقي:</strong> 48 ساعة</p>`;

        const actions = card.querySelector(".order-actions");
        actions.innerHTML = `
      <button class="track-btn">تتبع الطلب</button>
      <button class="pause-btn">إيقاف مؤقت</button>
      <button class="view-btn">عرض التفاصيل</button>
    `;

        activeSection.appendChild(card);

        initializeTrackingEvents(); // إعادة تفعيل تتبع الطلب
    });
});

// ✅ فتح/إغلاق مودال تتبع الطلب + زر المرحلة التالية
function initializeTrackingEvents() {
    document.querySelectorAll(".track-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("trackingModal").classList.remove("hidden");
        });
    });

    document.getElementById("closeTracking")?.addEventListener("click", () => {
        document.getElementById("trackingModal").classList.add("hidden");
    });

    const steps = document.querySelectorAll(".tracking-steps .step");
    const nextBtn = document.getElementById("nextStepBtn");
    let currentStepIndex = Array.from(steps).findIndex(step => step.classList.contains("pending"));

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentStepIndex < steps.length) {
                steps[currentStepIndex].classList.remove("pending");
                steps[currentStepIndex].classList.add("done");
                currentStepIndex++;

                if (currentStepIndex === steps.length) {
                    nextBtn.disabled = true;
                    nextBtn.textContent = "تم الوصول للنهاية ✅";

                    // ✅ نقل البطاقة إلى قسم الطلبات المكتملة
                    const orderCard = document.querySelector(".order-card.active");
                    const completedSection = document.querySelector("#completedOrders .orders-list");

                    if (orderCard && completedSection) {
                        orderCard.classList.remove("active");
                        orderCard.classList.add("completed");
                        orderCard.querySelector("p").innerHTML = "<strong>الحالة:</strong> مكتمل";

                        const remaining = orderCard.querySelector("p:nth-of-type(2)");
                        if (remaining) remaining.remove();

                        const actions = orderCard.querySelector(".order-actions");
                        actions.innerHTML = `<button class="view-btn">عرض</button>`;

                        completedSection.appendChild(orderCard);
                        document.getElementById("trackingModal").classList.add("hidden");
                    }

                }
            }
        });
    }
}

// ✅ تفعيل تتبع الطلب عند التحميل
initializeTrackingEvents();


// ✅ فتح المودال عند الضغط على "عرض التفاصيل"
document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("detailsModal").classList.remove("hidden");
    });
  });
  
  // ✅ إغلاق المودال
  document.getElementById("closeDetailsModal").addEventListener("click", () => {
    document.getElementById("detailsModal").classList.add("hidden");
  });
  
  // ✅ عرض أسماء الملفات بعد الاختيار
  document.getElementById("fileUpload").addEventListener("change", function () {
    const fileList = this.files;
    const preview = document.getElementById("uploadedFiles");
    preview.innerHTML = ""; // امسح المحتوى السابق
  
    Array.from(fileList).forEach(file => {
        const fileDiv = document.createElement("div");
      
        if (file.type.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(file);
          img.style.maxWidth = "80px";
          img.style.margin = "5px";
          img.style.borderRadius = "6px";
          fileDiv.appendChild(img);
        }
      
        const name = document.createElement("div");
        name.textContent = `📎 ${file.name}`;
        fileDiv.appendChild(name);
      
        preview.appendChild(fileDiv);
      });
      
  });
  
  
  // ✅ زر إرسال (جاهز للربط لاحقًا)
  document.querySelector(".send-btn").addEventListener("click", () => {
    const files = document.getElementById("fileUpload").files;
    const notes = document.getElementById("notes").value;
  
    console.log("📤 الملفات المختارة:", files);
    console.log("📝 الملاحظات:", notes);
  
    // 🔁 هنا سيتم لاحقًا إرسال البيانات إلى السيرفر باستخدام API
    // sendToAPI(files, notes, orderId)
  
    // إشعار مؤقت
    alert("✅ تم رفع الملفات والملاحظات بنجاح (اختبار)");
  
    // إغلاق المودال
    document.getElementById("detailsModal").classList.add("hidden");
  
    // تفريغ المحتوى
    document.getElementById("fileUpload").value = "";
    document.getElementById("uploadedFiles").innerHTML = "";
    document.getElementById("notes").value = "";
  });

  document.querySelectorAll(".pause-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const card = this.closest(".order-card");
      const statusEl = card.querySelector("p");
      let pausedNote = card.querySelector(".pause-note");
  
      if (this.classList.contains("paused")) {
        // ✅ استئناف الطلب
        if (statusEl) statusEl.innerHTML = "<strong>الحالة:</strong> قيد التنفيذ";
        if (pausedNote) pausedNote.remove();
        this.textContent = "إيقاف مؤقت";
        this.classList.remove("paused");
        console.log("✅ تم استئناف الطلب");
      } else {
        // 🛑 إيقاف مؤقت
        if (statusEl) statusEl.innerHTML = "<strong>الحالة:</strong> متوقف مؤقتًا";
        pausedNote = document.createElement("p");
        pausedNote.className = "pause-note";
        pausedNote.style.color = "#e17055";
        pausedNote.style.fontWeight = "bold";
        pausedNote.textContent = "🛑 تم إيقاف هذا الطلب مؤقتًا. الرجاء التواصل.";
        card.appendChild(pausedNote);
        this.textContent = "استئناف الطلب";
        this.classList.add("paused");
        console.log("🛑 تم إيقاف الطلب مؤقتًا");
      }
  
      // ✅ جاهز للربط مع الباك-إند لاحقًا
    });
  });


  function startCountdown(card, hours = 48) {
    const timerEl = card.querySelector(".timer");
    if (!timerEl) return;
  
    const deadline = Date.now() + hours * 60 * 60 * 1000;
  
    function updateTimer() {
      const now = Date.now();
      const diff = deadline - now;
  
      if (diff <= 0) {
        timerEl.textContent = "00:00:00";
        timerEl.style.color = "#e74c3c";
        timerEl.parentElement.innerHTML += " ⏰ <span style='color:#e74c3c;'>انتهى الوقت – الطلب متأخر</span>";
        clearInterval(intervalId);
        return;
      }
  
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
  
      timerEl.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  
    updateTimer(); // أول عرض مباشر
    const intervalId = setInterval(updateTimer, 1000);
  }
  startCountdown(card);
  
  
  
  
