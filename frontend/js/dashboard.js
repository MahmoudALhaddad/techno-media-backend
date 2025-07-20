document.addEventListener("DOMContentLoaded", () => {
    // ✅ المتغيرات العامة
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const addEmployeeBtn = document.getElementById("add-employee-btn");
    const modal = document.getElementById("add-employee-modal");
    const closeModal = document.getElementById("close-modal");
    const employeeForm = document.getElementById("employee-form");
    const employeeTable = document.querySelector("#employee-table tbody");
    const searchInput = document.getElementById("search-input");

    let employees = []; // قائمة الموظفين

   

    // ✅ فتح نافذة إضافة الموظف
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener("click", () => {
            modal.classList.add("active");
            employeeForm.reset();
            employeeForm.dataset.editing = "";
        });
    }

    // ✅ إغلاق النافذة
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // ✅ إضافة موظف جديد أو تعديل موظف موجود
    if (employeeForm) {
        employeeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("full-name").value;
            const email = document.getElementById("email").value;
            const whatsapp = document.getElementById("whatsapp").value;
            const joinDate = document.getElementById("join-date").value;
            const specialty = document.getElementById("specialty").value;
            const role = document.getElementById("role").value;
            const password = document.getElementById("password") ? document.getElementById("password").value : "********";
            const status = document.getElementById("status").checked ? "نشط" : "غير نشط";

            // استخراج الصلاحيات المحددة
            const permissions = Array.from(document.querySelectorAll("#permissions-container input:checked"))
                                     .map(perm => perm.value);

            if (employeeForm.dataset.editing !== "") {
                employees[employeeForm.dataset.editing] = { name, email, whatsapp, joinDate, specialty, role, password, permissions, status };
            } else {
                employees.push({ name, email, whatsapp, joinDate, specialty, role, password, permissions, status });
            }

            updateTable();
            modal.classList.remove("active");
        });
    }

    // ✅ تحديث الجدول
    function updateTable() {
        employeeTable.innerHTML = "";
        employees.forEach((employee, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td><a href="https://wa.me/${employee.whatsapp}" target="_blank">📱 محادثة</a></td>
                <td>${employee.joinDate}</td>
                <td>${employee.specialty}</td>
                <td>${employee.role}</td>
                <td>${employee.permissions.join(", ")}</td>
                <td>${employee.status}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">✏ تعديل</button>
                    <button class="delete-btn" data-index="${index}">🗑 حذف</button>
                </td>
            `;
            employeeTable.appendChild(row);
        });

        // ✅ تفعيل زر الحذف
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                employees.splice(index, 1);
                updateTable();
            });
        });

        // ✅ تفعيل زر التعديل
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                const employee = employees[index];

                document.getElementById("full-name").value = employee.name;
                document.getElementById("email").value = employee.email;
                document.getElementById("whatsapp").value = employee.whatsapp;
                document.getElementById("join-date").value = employee.joinDate;
                document.getElementById("specialty").value = employee.specialty;
                document.getElementById("role").value = employee.role;
                document.getElementById("password").value = employee.password;
                document.getElementById("status").checked = employee.status === "نشط";

                employeeForm.dataset.editing = index;
                modal.classList.add("active");
            });
        });
    }

    // ✅ تفعيل البحث داخل الجدول
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchValue = searchInput.value.toLowerCase();
            document.querySelectorAll("#employee-table tbody tr").forEach(row => {
                const rowText = row.innerText.toLowerCase();
                row.style.display = rowText.includes(searchValue) ? "" : "none";
            });
        });
    }
});
