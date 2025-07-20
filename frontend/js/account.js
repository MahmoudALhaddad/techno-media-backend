// ✅ تحميل صورة جديدة واستعراضها مع أنيميشن عالمي
const uploadInput = document.getElementById("uploadImage");
const profileImage = document.getElementById("profileImage");

uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    profileImage.src = reader.result;
    profileImage.classList.add("img-animate-glow");
    setTimeout(() => profileImage.classList.remove("img-animate-glow"), 1000);
    console.log("📸 تم تحديث الصورة محليًا — جهز للإرسال للسيرفر لاحقًا");
  };
  reader.readAsDataURL(file);
});

// ✅ حفظ التغييرات (جاهز للربط مع الباك-إند لاحقًا)
const accountForm = document.getElementById("accountForm");

accountForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  const updatedData = {
    fullName,
    email,
    password: newPassword !== "" ? newPassword : null,
    profileImage: profileImage.src
  };

  console.log("📤 البيانات الجاهزة للإرسال:", updatedData);
  showAnimatedToast("✅ تم حفظ التغييرات بنجاح");
});

// ✅ إشعار حفظ احترافي
function showAnimatedToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-global";
  toast.innerHTML = `<i class='fas fa-check-circle'></i> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("hide"), 2500);
  setTimeout(() => toast.remove(), 3000);
}



// ✅ فتح وإغلاق القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.add("open");
  });
  document.getElementById("closeSidebar")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.remove("open");
  });

