
const employeeModal = document.getElementById("employeeModal");
const openBtn = document.getElementById("addEmployeeBtn");
const closeBtn = document.getElementById("closeEmployeeModal");
const confirmBtn = employeeModal.querySelector(".confirm-btn");
let editingRow = null;

// ✅ فتح المودال
openBtn.addEventListener("click", () => {
  employeeModal.classList.remove("hidden");
  editingRow = null;
  clearInputs();
});

// ✅ إغلاق المودال
closeBtn.addEventListener("click", () => {
  employeeModal.classList.add("hidden");
});

// ✅ تعديل موظف
document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    editingRow = btn.closest("tr");
    const cells = editingRow.querySelectorAll("td");
    const inputs = employeeModal.querySelectorAll(".input-field");
    inputs[0].value = cells[0].textContent;
    inputs[1].value = cells[1].textContent;
    inputs[2].value = cells[2].textContent;
    inputs[3].value = cells[3].textContent;
    employeeModal.classList.remove("hidden");
  });
});

// ✅ حفظ (إضافة أو تعديل)
confirmBtn.addEventListener("click", () => {
  const inputs = employeeModal.querySelectorAll(".input-field");
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
      <td>0</td>
      <td>
        <button class="details-btn"><i class="fas fa-pen"></i></button>
        <button class="pause-btn"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    table.appendChild(newRow);
  }

  employeeModal.classList.add("hidden");
  clearInputs();
  window.location.reload();
});

// ✅ حذف موظف
document.querySelectorAll(".pause-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (confirm("هل أنت متأكد من حذف الموظف؟")) {
      btn.closest("tr").remove();
    }
  });
});

function clearInputs() {
  employeeModal.querySelectorAll(".input-field").forEach(input => input.value = "");
}


// ✅ فتح القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.add("open");
});
document.getElementById("closeSidebar")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.remove("open");
});