

function openTab(event, tabId) {
    // إزالة التفعيل عن جميع الأزرار
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    // إخفاء جميع المحتويات
    document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

    // تفعيل الزر المحدد
    event.currentTarget.classList.add("active");
    // إظهار المحتوى الخاص بالتبويب المحدد
    document.getElementById(tabId).classList.add("active");
}

// تحسين تجربة التمرير في التبويبات مع التأكد من عدم كسر `click event`
const tabsContainer = document.getElementById("tabs");
if (tabsContainer) {
    tabsContainer.addEventListener("wheel", (event) => {
        event.preventDefault();
        tabsContainer.scrollLeft += event.deltaY;
    });
}

// التأكد من أن جميع أزرار التبويبات تستجيب للنقر
document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", function(event) {
        openTab(event, this.getAttribute("onclick").split("'")[1]);
    });
});

