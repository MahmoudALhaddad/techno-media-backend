// ✅ القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("open");
});

document.getElementById("closeSidebar")?.addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("open");
});

// ✅ تغيير الصورة الشخصية تلقائيًا عند اختيار صورة
const avatarUpload = document.getElementById("avatarUpload");
const profileImage = document.getElementById("profileImage");

avatarUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// ✅ حفظ البيانات
document.querySelector(".settings-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // جمع القيم (لاحقًا ترسل للباك-إند)
  const data = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    status: document.getElementById("status").value
  };

  console.log("✅ تم حفظ البيانات:", data);

  // ✅ عرض إشعار
  showToast("✅ تم حفظ التغييرات بنجاح!");
});

// ✅ دالة لإظهار إشعار
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-global";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}