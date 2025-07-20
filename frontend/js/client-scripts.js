// ✅ تحسين إظهار وإخفاء الإشعارات
function toggleNotifications() {
    let panel = document.querySelector(".notifications-panel");
    let icon = document.querySelector(".notification-icon");

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";

        // ضبط موقع الإشعارات بحيث تظهر أسفل أيقونة الجرس مباشرة
        let rect = icon.getBoundingClientRect();
        panel.style.top = rect.bottom + 10 + "px";
        panel.style.right = "50%";
        panel.style.transform = "translateX(50%)";
    }
}

// ✅ تحسين إظهار وإخفاء القائمة الجانبية
function toggleSidebar() {
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.right = sidebar.style.right === "0px" ? "-250px" : "0px";
}

// ✅ عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {

// ✅ عناصر الدردشة
let chatBox = document.querySelector(".chat-box");
let chatToggleBtn = document.querySelector(".chat-btn");
let closeChatBtn = document.querySelector(".close-chat");
let chatMessages = document.querySelector(".chat-messages");
let chatInput = document.getElementById("chatMessage");
let sendBtn = document.querySelector(".send-btn");
let attachBtn = document.querySelector(".attach-btn");
let fileInput = document.getElementById("chatFile");
let chatTitle = document.getElementById("chat-title");

// ✅ فتح وإغلاق نافذة الدردشة
function toggleChat(forceOpen = false) {
    if (forceOpen) {
        chatBox.style.display = "block"; // إبقاء الدردشة مفتوحة عند اختيار ملف
    } else {
        chatBox.style.display = (chatBox.style.display === "block") ? "none" : "block";
    }
}

chatToggleBtn.addEventListener("click", function () {
    toggleChat();
});

closeChatBtn.addEventListener("click", function () {
    chatBox.style.display = "none";
});

// ✅ منع إغلاق الدردشة عند اختيار ملف
fileInput.addEventListener("click", function (event) {
    event.stopPropagation();
});

// ✅ إرسال رسالة نصية
function sendMessage(message, sender) {
    if (message.trim() === "") return;

    let messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender === "user" ? "user-message" : "support-message");
    messageElement.innerHTML = `<span class="sender-name">${sender === "user" ? "أنت" : "الدعم"}:</span> ${message}`;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener("click", function () {
    sendMessage(chatInput.value, "user");
    chatInput.value = "";
});

chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage(chatInput.value, "user");
        chatInput.value = "";
    }
});

// ✅ إرسال الملفات مع عرض الصور المصغرة قبل الإرسال
attachBtn.addEventListener("click", function () {
    fileInput.click();
});

fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];

        if (file.type.startsWith("image/")) {
            // ✅ عرض الصورة المصغرة قبل الإرسال
            let reader = new FileReader();
            reader.onload = function (e) {
                let previewElement = document.createElement("div");
                previewElement.classList.add("chat-message", "user-message");

                let img = document.createElement("img");
                img.src = e.target.result;
                img.alt = "صورة مرسلة";
                img.style.maxWidth = "120px";
                img.style.borderRadius = "5px";
                img.style.marginTop = "5px";
                img.style.cursor = "pointer";
                img.onclick = function () {
                    window.open(e.target.result, "_blank");
                };

                previewElement.innerHTML = `<span class="sender-name">أنت:</span>`;
                previewElement.appendChild(img);

                chatMessages.appendChild(previewElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            };
            reader.readAsDataURL(file);
        } else {
            sendFile(file, "user");
        }

        toggleChat(true);
    }
});

// ✅ تحسين إرسال الملفات غير الصور (PDF - Word - مستندات أخرى)
function sendFile(file, sender) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender === "user" ? "user-message" : "support-message");

    let fileLink = document.createElement("a");
    fileLink.href = URL.createObjectURL(file);
    fileLink.target = "_blank";
    fileLink.textContent = `📎 ${file.name}`;

    messageElement.innerHTML = `<span class="sender-name">${sender === "user" ? "أنت" : "الدعم"}:</span> `;
    messageElement.appendChild(fileLink);

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ✅ تحويل الدردشة إلى الموظف المسؤول عند وجود طلب قيد التنفيذ
function checkActiveOrder() {
    let activeOrder = document.querySelector(".order-card.in-progress");
    if (activeOrder) {
        let employeeName = "الموظف أحمد"; // يجب جلب اسم الموظف من قاعدة البيانات
        chatToggleBtn.innerHTML = `💬 تحدث مع ${employeeName}`;
        chatTitle.innerText = `دردشة مع ${employeeName}`;
    } else {
        chatToggleBtn.innerHTML = "💬 تحدث معنا";
        chatTitle.innerText = "دردشة الدعم";
    }
}

checkActiveOrder(); // فحص الطلبات عند تحميل الصفحة


    // ✅ تشغيل العداد التنازلي للطلبات قيد التنفيذ
    let countdownElements = document.querySelectorAll(".in-progress .countdown");

    countdownElements.forEach(function (element) {
        let timeLeft = 48 * 60 * 60; // 48 ساعة بالثواني

        function updateCountdown() {
            let hours = Math.floor(timeLeft / 3600);
            let minutes = Math.floor((timeLeft % 3600) / 60);
            let seconds = timeLeft % 60;

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            element.textContent = `⏳ ${hours}:${minutes}:${seconds}`;

            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateCountdown, 1000);
            } else {
                element.textContent = "⏳ انتهى الوقت!";
            }
        }

        if (element.closest(".in-progress")) {
            updateCountdown();
        }
    });

    // ✅ تشغيل حدث رفع الملفات
    document.querySelector("#fileUpload").addEventListener("change", function (event) {
        let fileList = document.querySelector("#fileList");
        fileList.innerHTML = "";

        for (let i = 0; i < event.target.files.length; i++) {
            let file = event.target.files[i];

            let fileItem = document.createElement("div");
            fileItem.classList.add("file-item");

            let fileName = document.createElement("span");
            fileName.textContent = file.name;

            let removeBtn = document.createElement("button");
            removeBtn.textContent = "❌";
            removeBtn.addEventListener("click", function () {
                fileItem.remove();
            });

            fileItem.appendChild(fileName);
            fileItem.appendChild(removeBtn);
            fileList.appendChild(fileItem);
        }
    });

    // ✅ إرسال الطلب بعد التحقق من البيانات
    document.querySelector("#serviceRequestForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let service = document.querySelector("#service").value;
        let description = document.querySelector("#description").value;
        let files = document.querySelector("#fileUpload").files;

        if (service.trim() === "" || description.trim() === "") {
            alert("⚠ يرجى تعبئة جميع الحقول المطلوبة!");
            return;
        }

        alert("✅ تم إرسال طلبك بنجاح!");
    });
// ✅ فتح النافذة عند الضغط على "تعديل البيانات"
document.querySelector(".edit-btn").addEventListener("click", function () {
    document.querySelector(".edit-profile-modal").style.display = "block";
});

// ✅ إغلاق النافذة عند الضغط على زر ✖
document.querySelector(".close-modal").addEventListener("click", function () {
    document.querySelector(".edit-profile-modal").style.display = "none";
});

// ✅ إغلاق النافذة عند النقر خارجها
window.addEventListener("click", function (event) {
    let modal = document.querySelector(".edit-profile-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
    // ✅ حفظ التعديلات (محاكاة)
    document.querySelector("#editProfileForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("✅ تم حفظ التعديلات بنجاح!");
        closeModal();
    });
});