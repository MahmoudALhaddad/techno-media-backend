// ✅ فتح وإغلاق القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.add("open");
});
document.getElementById("closeSidebar")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.remove("open");
});


document.addEventListener("DOMContentLoaded", () => {
    const filesList = document.querySelector(".files-list");
  
    // ⚠️ لاحقًا: سيتم جلب هذا من قاعدة بيانات
    const uploadedFiles = [
      {
        name: "الشعار النهائي.pdf",
        orderTitle: "تصميم شعار",
        date: "2025-06-12",
        url: "#",
        type: "pdf"
      },
      {
        name: "واجهة-رئيسية.png",
        orderTitle: "موقع الكتروني",
        date: "2025-06-11",
        url: "#",
        type: "image"
      },
      {
        name: "مجلد.zip",
        orderTitle: "تصميم كتيب",
        date: "2025-06-10",
        url: "#",
        type: "zip"
      }
    ];
  
    uploadedFiles.forEach(file => {
      const card = document.createElement("div");
      card.className = "file-card";
  
      const icon = file.type === "pdf" ? "fa-file-pdf" :
                   file.type === "image" ? "fa-image" :
                   file.type === "zip" ? "fa-file-archive" : "fa-file";
  
      card.innerHTML = `
        <div class="file-icon"><i class="fas ${icon}"></i></div>
        <div class="file-info">
          <h3>${file.name}</h3>
          <p><strong>الطلب:</strong> ${file.orderTitle}</p>
          <p><strong>تاريخ الرفع:</strong> ${file.date}</p>
        </div>
        <div class="file-actions">
          <a href="${file.url}" class="download-btn" download><i class="fas fa-download"></i> تحميل</a>
        </div>
      `;
  
      filesList.appendChild(card);
    });
  });
  