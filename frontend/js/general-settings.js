
document.addEventListener("DOMContentLoaded", () => {
  const logoUpload = document.getElementById("logoUpload");
  const logoPreview = document.getElementById("logoPreview");

  logoUpload.addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function() {
      logoPreview.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  });

  document.querySelector(".save-btn").addEventListener("click", () => {
    const siteName = document.getElementById("siteName").value;
    const siteDescription = document.getElementById("siteDescription").value;
    const primaryColor = document.getElementById("primaryColor").value;
    const language = document.getElementById("defaultLanguage").value;

    alert("✅ تم حفظ الإعدادات بنجاح!\n" +
      "اسم الموقع: " + siteName + "\n" +
      "الوصف: " + siteDescription + "\n" +
      "اللون: " + primaryColor + "\n" +
      "اللغة: " + language);
  });
});
