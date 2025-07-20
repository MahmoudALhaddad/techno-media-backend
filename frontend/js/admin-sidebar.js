document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const closeSidebar = document.getElementById("close-menu");
    const addPackageBtn = document.getElementById("add-package-btn");
    const modal = document.getElementById("add-package-modal");
    const closeModal = document.getElementById("close-modal");
    const packageForm = document.getElementById("package-form");
    const packagesTable = document.querySelector("#packages-table tbody");
    const searchInput = document.getElementById("search-input");
    const packageImageInput = document.getElementById("package-image");
    const packageOffer = document.getElementById("packages-offer");
    const offerDurationInput = document.getElementById("offer-duration");

    let packages = [];

    menuToggle.addEventListener("click", () => sidebar.classList.add("open"));
    closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));
       // إغلاق القائمة عند النقر خارجها
   document.addEventListener("click", (event) => {
    if (sidebar.classList.contains("open") && !sidebar.contains(event.target) && event.target !== menuToggle) {
        sidebar.classList.remove("open");
    }
});
});


// ✅ التنقل بين الصفحات عند النقر على عناصر القائمة
function navigate(page) {
    switch (page) {
        case 'admin-dashboard':
            window.location.href = "./admin-dashboard.html";
            break;
        case 'orders':
            window.location.href = "./order.html";
            break;
        case 'waiting-orders':
            window.location.href = "waiting-orders.html";
            break;
        case 'in-progress-orders':
            window.location.href = "in-progress-orders.html";
            break;
        case 'completed-orders':
            window.location.href = "completed-orders.html";
            break;
        case 'admin-employees':
            window.location.href = "./admin-employees.html";
            break;
        case 'clients':
            window.location.href = "./admin-clients.html";
            break;
            case 'packages':
            window.location.href = "./packages.html";
            break;
        case 'notifications':
            window.location.href = "./notification.html";
            break;
        case 'settings':
            window.location.href = "./settings.html";
            break;
        default:
            alert("الصفحة غير موجودة!");
    }
}

// ✅ ربط القائمة الجانبية بوظيفة التنقل
document.querySelectorAll("#sidebar ul li").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.getAttribute("data-page");
        navigate(page);
    });
});



