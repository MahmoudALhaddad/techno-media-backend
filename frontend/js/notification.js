document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const addNotificationBtn = document.getElementById("add-notification-btn");
    const modal = document.getElementById("notification-modal");
    const closeModal = document.getElementById("close-modal");
    const notificationForm = document.getElementById("notification-form");
    const notificationsTable = document.querySelector("#notifications-table tbody");
    const searchInput = document.getElementById("search-notifications");

    let notifications = [];
    let editIndex = null;

    
    // ✅ فتح نافذة إضافة إشعار
    addNotificationBtn.addEventListener("click", () => {
        modal.classList.add("active");
        notificationForm.reset();
        editIndex = null;
    });

    // ✅ إغلاق النافذة
    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // ✅ حفظ الإشعار
    notificationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("notification-title").value.trim();
        const content = document.getElementById("notification-content").value.trim();
        const target = document.getElementById("notification-target").value;
        const date = new Date().toLocaleString();

        if (title === "" || content === "") {
            alert("يجب إدخال جميع الحقول!");
            return;
        }

        if (editIndex !== null) {
            notifications[editIndex] = { title, content, target, date };
        } else {
            notifications.push({ title, content, target, date });
        }

        updateTable();
        modal.classList.remove("active");
    });

    // ✅ تحديث الجدول
    function updateTable() {
        notificationsTable.innerHTML = "";
        notifications.forEach((notification, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>"${notification.title}"</td>
                <td>${notification.content}</td>
                <td>${notification.target}</td>
                <td>${notification.date}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">✏ تعديل</button>
                    <button class="delete-btn" data-index="${index}">🗑 حذف</button>
                </td>
            `;
            notificationsTable.appendChild(row);
        });

        // ✅ تفعيل زر التعديل
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                const notification = notifications[index];

                document.getElementById("notification-title").value = notification.title;
                document.getElementById("notification-content").value = notification.content;
                document.getElementById("notification-target").value = notification.target;

                editIndex = index;
                modal.classList.add("active");
            });
        });

        // ✅ تفعيل زر الحذف
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                notifications.splice(index, 1);
                updateTable();
            });
        });
    }

    // ✅ البحث داخل الإشعارات
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();
        document.querySelectorAll("#notifications-table tbody tr").forEach(row => {
            const rowText = row.innerText.toLowerCase();
            row.style.display = rowText.includes(searchValue) ? "" : "none";
        });
    });
});