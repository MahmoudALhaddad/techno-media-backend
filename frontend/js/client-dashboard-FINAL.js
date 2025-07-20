
// ✅ فتح وإغلاق القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.add("open");
});
document.getElementById("closeSidebar")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.remove("open");
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".show-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const desc = btn.previousElementSibling;
      desc.classList.toggle("expanded");
      btn.textContent = desc.classList.contains("expanded") ? "إخفاء" : "عرض المزيد";
    });
  });
});

function openTracking() {
  toggleTrackingModal();
}

function toggleTrackingModal() {
  const modal = document.getElementById("trackingModal");
  modal.classList.toggle("show");
}


function openTracking(type, step = 2, paused = false) {
  const steps = getTrackingSteps(type);
  const list = document.getElementById("trackingSteps");
  const progressFill = document.getElementById("progressFill");

  list.innerHTML = "";
  const stepCount = paused ? step + 1 : steps.length;

  steps.forEach((stepData, index) => {
    const li = document.createElement("li");
  
    if (paused && index === step) {
      li.className = "paused";
      li.innerHTML = `
        <div class="circle"><i class="fas fa-pause-circle"></i></div>
        <p>
          <strong>⚠️ الطلب متوقف مؤقتًا</strong><br>
          <span>بانتظار تواصلك معنا لإكمال التنفيذ</span><br>
          <small><i class="fas fa-comment-dots"></i> يرجى التواصل مع الدعم الفني أو الموظف المسؤول</small>
        </p>
      `;
      list.appendChild(li);
      return;
    }
  
    if (index < step) li.className = "done";
    else if (index === step) li.className = "current";
  
    let content = `
      <div class="circle ${index === step ? "pulse" : ""}">
        <i class="${stepData.icon}"></i>
      </div>
      <p>
        <strong>${stepData.label}</strong><br>
    `;
  
    // ✅ فقط إذا المرحلة منفذة أو حالية
    if (index <= step) {
      content += `
        <span>${stepData.time}</span><br>
        <small><i class="fas fa-user"></i> بواسطة: ${stepData.by}</small>
      `;
    }
  
    content += "</p>";
    li.innerHTML = content;
    list.appendChild(li);
  });
  

  progressFill.style.width = ((step / (steps.length - 1)) * 100) + "%";
  toggleTrackingModal();
  playProgressSound();
}

function toggleTrackingModal() {
  document.getElementById("trackingModal").classList.toggle("show");
}

function playProgressSound() {
  const audio = new Audio("/sounds/progress.mp3"); // تأكد من وجود هذا الملف
  audio.play();
}

function getTrackingSteps(type) {
  const icons = {
    design: ["fas fa-check", "fas fa-palette", "fas fa-pen-ruler", "fas fa-check-double"],
    development: ["fas fa-check", "fas fa-cogs", "fas fa-laptop-code", "fas fa-check-double"],
    video: ["fas fa-check", "fas fa-video", "fas fa-film", "fas fa-check-double"]
  };

  const labels = ["تم استلام الطلب", "المرحلة الأولى", "المرحلة الثانية", "تم التسليم"];
  const team = ["نظام تلقائي", "محمد الزعبي", "ياسر الحسن", "فريق الدعم"];
  const times = ["2024-04-11 10:15", "2024-04-12 14:00", "2024-04-13 11:30", "2024-04-14 16:00"];

  return labels.map((label, i) => ({
    label,
    icon: icons[type]?.[i] || "fas fa-circle",
    time: i === 3 ? "تم التسليم بنجاح ✅" : times[i],
    by: team[i]
  }));
}



function openDetails(title, type, desc, status, date, employee) {
  document.getElementById("detail-title").textContent = title;
  document.getElementById("detail-type").textContent = getTypeLabel(type);
  document.getElementById("detail-desc").innerHTML = desc;
  document.getElementById("detail-status").textContent = status;
  document.getElementById("detail-date").textContent = date;
  document.getElementById("detail-employee").textContent = employee;
  toggleDetailsModal();
}

function toggleDetailsModal() {
  document.getElementById("detailsModal").classList.toggle("show");
}

function getTypeLabel(type) {
  switch (type) {
    case "design": return "تصميم";
    case "development": return "برمجة";
    case "video": return "مونتاج";
    default: return "غير محدد";
  }
}




function openFiles(files = []) {
  const container = document.getElementById("filesList");
  container.innerHTML = "";

  if (files.length === 0) {
    container.innerHTML = "<p style='color:#ccc;text-align:center;'>لا توجد ملفات مرفقة.</p>";
  } else {
    files.forEach(file => {
      const fileIcon = getFileIcon(file.type);
      const fileItem = `
        <div class="file-item">
          <i class="${fileIcon}"></i>
          <div class="file-name">${file.name}</div>
          <a href="${file.url}" target="_blank">📥 تحميل</a>
        </div>
      `;
      container.innerHTML += fileItem;
    });
  }

  toggleFilesModal();
}

function toggleFilesModal() {
  document.getElementById("filesModal").classList.toggle("show");
}

function getFileIcon(type) {
  if (type.includes("image")) return "fas fa-file-image";
  if (type.includes("pdf")) return "fas fa-file-pdf";
  if (type.includes("zip") || type.includes("rar")) return "fas fa-file-archive";
  if (type.includes("word")) return "fas fa-file-word";
  if (type.includes("video")) return "fas fa-file-video";
  return "fas fa-file";
}



function setupSpecialPlanButton(plan) {
  const btn = document.getElementById("planActionBtn");

  if (!btn) return;

  if (plan === "none") {
    btn.innerHTML = `<i class="fas fa-rocket"></i> جرّب الباقة المميزة`;
    btn.disabled = false;
    btn.onclick = () => openSubscribeModal();
  } else if (plan === "basic") {
    btn.innerHTML = `<i class="fas fa-level-up-alt"></i> ترقية للباقة المميزة`;
    btn.disabled = false;
    btn.onclick = () => openUpgradeModal();
  } else if (plan === "premium") {
    btn.innerHTML = `<i class="fas fa-check-circle"></i> أنت تستخدم الباقة المميزة ✅`;
    btn.disabled = true;
  }
}

function openSubscribeModal() {
  alert("📦 سيتم فتح نافذة الاشتراك...");
  // هنا تفتح مودال التسجيل أو تنقل لصفحة الاشتراك
}

function openUpgradeModal() {
  alert("⚡ سيتم فتح نافذة ترقية الباقة...");
  // هنا تفتح مودال الترقية أو صفحة مقارنة الباقات
}

document.addEventListener("DOMContentLoaded", () => {
  // 👇 بدل القيمة حسب اشتراك العميل الحقيقي
  const userPlan = "basic"; // "none", "basic", or "premium"
  setupSpecialPlanButton(userPlan);
});


















// ✅ تحديث السنة تلقائيًا في الحقوق
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});



// ✅ سنة الحقوق
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});
