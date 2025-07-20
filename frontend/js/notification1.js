
const modal = document.getElementById("notifyModal");
const sendNotifyBtn = document.getElementById("sendNotifyBtn");
const closeNotifyModal = document.getElementById("closeNotifyModal");
const sendNotifyConfirm = document.getElementById("sendNotifyConfirm");

sendNotifyBtn?.addEventListener("click", () => modal.classList.remove("hidden"));
closeNotifyModal?.addEventListener("click", () => modal.classList.add("hidden"));

sendNotifyConfirm?.addEventListener("click", () => {
  const titleInput = document.getElementById("notifyTitle");
  const bodyInput = document.getElementById("notifyBody");
  const targetInput = document.getElementById("notifyTarget");

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const target = targetInput.value;

  if (!title || !body) return alert("يرجى إدخال العنوان والمحتوى");

  const table = document.querySelector(".orders-table tbody");
  const now = new Date().toLocaleString("ar-EG");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${title}</td>
    <td>${body}</td>
    <td>${target}</td>
    <td>${now}</td>
    <td><button class="pause-btn delete-btn"><i class="fas fa-trash-alt"></i></button></td>
  `;
  table.prepend(row);

  modal.classList.add("hidden");
  titleInput.value = "";
  bodyInput.value = "";
  targetInput.value = "الجميع";

  showToast("✅ تم إرسال الإشعار بنجاح");
});

// ✅ حذف إشعار
document.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    const row = e.target.closest("tr");
    if (confirm("هل تريد حذف هذا الإشعار؟")) row.remove();
  }
});

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast-global";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("hide"), 3000);
  setTimeout(() => toast.remove(), 4000);
}
