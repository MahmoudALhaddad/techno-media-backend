// ✅ فتح وإغلاق القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.add("open");
  });
  document.getElementById("closeSidebar")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.remove("open");
  });

  document.addEventListener("DOMContentLoaded", () => {
    const renewBtn = document.querySelector(".renew-btn");
  
    // مثال: بيانات الباقة الحالية (من قاعدة البيانات لاحقًا)
    const currentPlan = {
      name: "الباقة المميزة",
      status: "active", // "active", "expired", "trial"
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      features: [
        "عدد طلبات شهري: 10",
        "أولوية دعم فني",
        "تسليم خلال 24-48 ساعة",
        "ملفات مفتوحة التصميم"
      ]
    };
  
    // ✅ تحديث الحالة بصريًا (لو احتجت لاحقًا)
    const statusElement = document.querySelector(".plan-status");
    statusElement.className = "plan-status " + currentPlan.status;
  
    // ✅ عند الضغط على زر التجديد
    renewBtn.addEventListener("click", () => {
      console.log("📦 يتم الآن تحضير عملية التجديد...");
      console.log("🔹 الباقة:", currentPlan.name);
      console.log("🔹 من:", currentPlan.startDate);
      console.log("🔹 إلى:", currentPlan.endDate);
      console.log("🔹 الميزات:", currentPlan.features);
  
      // لاحقًا:
      // redirectToPayment(currentPlan)
      // أو openRenewModal(currentPlan)
      alert("✅ جاهز لربط الدفع! (اختبار فقط)");
    });
  });
  