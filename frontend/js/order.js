
// ✅ فتح القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.add("open");
});
document.getElementById("closeSidebar")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.remove("open");
});

const countdownData = new Map();

// ✅ تعيين الموظف
document.querySelectorAll(".assign-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document.getElementById("assignModal").classList.remove("hidden");
    document.getElementById("assignModal").dataset.row = index;
  });
});

document.getElementById("confirmAssignBtn").addEventListener("click", () => {
  const employee = document.getElementById("employeeSelect").value;
  const index = document.getElementById("assignModal").dataset.row;
  const row = document.querySelectorAll(".orders-table tbody tr")[index];
  if (!employee || !row) return;

  row.querySelector(".assigned-cell").textContent = employee;
  const badge = row.querySelector(".badge");
  badge.textContent = "قيد التنفيذ";
  badge.className = "badge active";

  const countdownCell = row.querySelector(".countdown");
  const deadline = Date.now() + 48 * 60 * 60 * 1000;

  countdownData.set(row, {
    deadline,
    paused: false,
    remaining: null
  });

  countdownCell.dataset.active = "true";
  document.getElementById("assignModal").classList.add("hidden");
});

// ✅ إيقاف مؤقت
document.querySelectorAll(".pause-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    const badge = row.querySelector(".badge");
    badge.textContent = "موقوف مؤقتًا";
    badge.className = "badge paused";

    if (countdownData.has(row)) {
      const data = countdownData.get(row);
      data.remaining = data.deadline - Date.now();
      data.paused = true;
      countdownData.set(row, data);
    }
  });
});

// ✅ استئناف
document.querySelectorAll(".resume-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const row = btn.closest("tr");
    const badge = row.querySelector(".badge");
    badge.textContent = "قيد التنفيذ";
    badge.className = "badge active";

    if (countdownData.has(row)) {
      const data = countdownData.get(row);
      if (data.paused && data.remaining) {
        data.deadline = Date.now() + data.remaining;
        data.paused = false;
        data.remaining = null;
        countdownData.set(row, data);
      }
    }
  });
});

// ✅ عداد تنازلي ديناميكي
setInterval(() => {
  document.querySelectorAll(".orders-table tbody tr").forEach(row => {
    const countdownCell = row.querySelector(".countdown");

    if (countdownData.has(row)) {
      const data = countdownData.get(row);
      if (data.paused) {
        countdownCell.textContent = "⏸ مؤقتًا";
        countdownCell.style.color = "#999";
        return;
      }

      const now = Date.now();
      const diff = data.deadline - now;
      if (diff <= 0) {
        countdownCell.textContent = "⏰ انتهى الوقت";
        countdownCell.style.color = "red";
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        countdownCell.textContent = `⏳ ${h}س ${m}د ${s}ث`;
        countdownCell.style.color = "";
      }
    }
  });
}, 1000);

// ✅ مودالات التفاصيل والتتبع
document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("detailsModal").classList.remove("hidden");
  });
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("detailsModal").classList.add("hidden");
});

document.querySelectorAll(".track-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("trackModal").classList.remove("hidden");
  });
});

document.getElementById("closeTrack").addEventListener("click", () => {
  document.getElementById("trackModal").classList.add("hidden");
});

const steps = document.querySelectorAll("#trackModal .tracking-steps .step");
let currentStepIndex = 2;
document.getElementById("advanceStepBtn").addEventListener("click", () => {
  if (currentStepIndex < steps.length) {
    steps[currentStepIndex].classList.remove("pending");
    steps[currentStepIndex].classList.add("done");
    currentStepIndex++;
  }
  if (currentStepIndex === steps.length) {
    document.getElementById("advanceStepBtn").disabled = true;
    document.getElementById("advanceStepBtn").textContent = "تم الوصول للنهاية ✅";
  }
});
