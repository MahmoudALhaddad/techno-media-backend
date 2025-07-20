
const clientModal = document.getElementById("clientModal");
const closeBtn = document.getElementById("closeClientModal");
const addClientBtn = document.getElementById("addClientBtn");
const confirmBtn = clientModal.querySelector(".confirm-btn");
let editingRow = null;

// ✅ فتح المودال للإضافة
addClientBtn?.addEventListener("click", () => {
  clientModal.classList.remove("hidden");
  editingRow = null;
  clearInputs();
});

// ✅ إغلاق المودال
closeBtn?.addEventListener("click", () => {
  clientModal.classList.add("hidden");
});

// ✅ تفعيل تعديل عميل
document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    editingRow = btn.closest("tr");
    const cells = editingRow.querySelectorAll("td");
    const inputs = clientModal.querySelectorAll(".input-field");
    inputs[0].value = cells[0].textContent;
    inputs[1].value = cells[1].textContent;
    inputs[2].value = cells[2].textContent;
    inputs[3].value = cells[3].textContent;
    clientModal.classList.remove("hidden");
  });
});

// ✅ حفظ (إضافة أو تعديل)
confirmBtn?.addEventListener("click", () => {
  const inputs = clientModal.querySelectorAll(".input-field");
  const values = [...inputs].map(input => input.value.trim());
  if (values.some(v => v === "")) return alert("يرجى تعبئة جميع الحقول");

  if (editingRow) {
    const cells = editingRow.querySelectorAll("td");
    cells[0].textContent = values[0];
    cells[1].textContent = values[1];
    cells[2].textContent = values[2];
    cells[3].textContent = values[3];
  } else {
    const table = document.querySelector(".orders-table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${values[0]}</td>
      <td>${values[1]}</td>
      <td>${values[2]}</td>
      <td>${values[3]}</td>
      <td>شهرية</td>
      <td><span class="badge active">مفعل</span></td>
      <td>0</td>
      <td>3</td>
      <td>
        <button class="details-btn"><i class="fas fa-pen"></i></button>
        <button class="pause-btn"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    table.appendChild(newRow);
  }

  clientModal.classList.add("hidden");
  clearInputs();
  window.location.reload();
});

// ✅ حذف عميل
document.querySelectorAll(".pause-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (confirm("هل أنت متأكد من حذف العميل؟")) {
      btn.closest("tr").remove();
    }
  });
});

function clearInputs() {
  clientModal.querySelectorAll(".input-field").forEach(input => input.value = "");
}

// ✅ تصفية وبحث
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const filterStatus = document.getElementById("filterStatus");

function filterTable() {
  const rows = document.querySelectorAll(".orders-table tbody tr");
  const keyword = searchInput.value.toLowerCase();
  const selectedType = filterType.value;
  const selectedStatus = filterStatus.value;

  rows.forEach(row => {
    const [name, email, whatsapp, , type, statusCell] = row.querySelectorAll("td");
    const status = statusCell.querySelector(".badge")?.textContent || "";

    const matchesKeyword =
      name.textContent.toLowerCase().includes(keyword) ||
      email.textContent.toLowerCase().includes(keyword) ||
      whatsapp.textContent.toLowerCase().includes(keyword);

    const matchesType = selectedType === "" || type.textContent === selectedType;
    const matchesStatus = selectedStatus === "" || status === selectedStatus;

    row.style.display = matchesKeyword && matchesType && matchesStatus ? "" : "none";
  });
}

searchInput?.addEventListener("input", filterTable);
filterType?.addEventListener("change", filterTable);
filterStatus?.addEventListener("change", filterTable);


// ✅ فتح القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.add("open");
});
document.getElementById("closeSidebar")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.remove("open");
});