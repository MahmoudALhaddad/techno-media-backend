document.addEventListener("DOMContentLoaded", function () {
    let sidebar = document.getElementById("sidebar");
    let notificationsPanel = document.getElementById("notificationsPanel");


      // ✅ فتح وإغلاق نافذة الإشعارات
    window.toggleNotifications = function () {
        if (notificationsPanel.style.display === "block") {
            notificationsPanel.style.display = "none";
        } else {
            notificationsPanel.style.display = "block";
            let bellIcon = document.querySelector(".notifications");
            let rect = bellIcon.getBoundingClientRect();
            notificationsPanel.style.top = `${rect.bottom + 5}px`;
            notificationsPanel.style.right = `604px`;
        }
    };

   
    // ✅ إغلاق نافذة الإشعارات عند النقر خارجها
    document.addEventListener("click", function (event) {
        if (!notificationsPanel.contains(event.target) && !event.target.closest(".notifications")) {
            notificationsPanel.style.display = "none";
        }
    });

   




    // ✅ تحديث الإحصائيات عند تغيير حالة الطلب
    function updateStatistics() {
        document.getElementById("new-orders-count").innerText = document.querySelectorAll("#new-orders .order-card").length;
        document.getElementById("waiting-orders-count").innerText = document.querySelectorAll("#waiting-orders .order-card").length;
        document.getElementById("in-progress-orders-count").innerText = document.querySelectorAll("#in-progress-orders .order-card").length;
        document.getElementById("completed-orders-count").innerText = document.querySelectorAll("#completed-orders .order-card").length;
    }

    // ✅ قبول الطلب وتحريكه إلى "انتظار قبول الموظف"
    document.querySelectorAll(".accept-order").forEach(button => {
        button.addEventListener("click", function () {
            let orderCard = this.closest(".order-card");

            if (orderCard.querySelector(".employee-select")) return;

            let employees = ["أحمد", "ليلى", "خالد", "محمود"];
            let selectEmployee = document.createElement("select");
            selectEmployee.classList.add("employee-select");
            selectEmployee.innerHTML = employees.map(emp => `<option value="${emp}">${emp}</option>`).join("");

            let confirmBtn = document.createElement("button");
            confirmBtn.textContent = "📩 إرسال الطلب للموظف";
            confirmBtn.classList.add("confirm-employee");

            orderCard.appendChild(selectEmployee);
            orderCard.appendChild(confirmBtn);

            confirmBtn.addEventListener("click", function () {
                let assignedEmployee = selectEmployee.value;

                orderCard.classList.remove("new-order");
                orderCard.classList.add("waiting-for-approval");

                let waitingOrders = document.getElementById("waiting-orders");
                waitingOrders.appendChild(orderCard);

                selectEmployee.remove();
                confirmBtn.remove();

                let statusText = document.createElement("p");
                statusText.innerHTML = `⌛ **في انتظار قبول ${assignedEmployee}...**`;
                statusText.classList.add("waiting-status");
                orderCard.appendChild(statusText);

                let changeEmployeeBtn = document.createElement("button");
                changeEmployeeBtn.textContent = "🔄 تغيير الموظف";
                changeEmployeeBtn.classList.add("change-employee");
                orderCard.appendChild(changeEmployeeBtn);

                let approveBtn = document.createElement("button");
                approveBtn.textContent = "✅ قبول الطلب";
                approveBtn.classList.add("approve-order");
                orderCard.appendChild(approveBtn);

                alert(`📩 تم إرسال الطلب إلى ${assignedEmployee} بانتظار قبوله.`);
                updateStatistics();

                changeEmployeeBtn.addEventListener("click", function () {
                    let newSelectEmployee = document.createElement("select");
                    newSelectEmployee.classList.add("employee-select");
                    newSelectEmployee.innerHTML = employees.map(emp => `<option value="${emp}">${emp}</option>`).join("");

                    let saveChangeBtn = document.createElement("button");
                    saveChangeBtn.textContent = "حفظ التغيير";
                    saveChangeBtn.classList.add("save-change");

                    orderCard.appendChild(newSelectEmployee);
                    orderCard.appendChild(saveChangeBtn);

                    saveChangeBtn.addEventListener("click", function () {
                        let newAssignedEmployee = newSelectEmployee.value;
                        statusText.innerHTML = `⌛ **في انتظار قبول ${newAssignedEmployee}...**`;
                        newSelectEmployee.remove();
                        saveChangeBtn.remove();
                        alert(`✅ تم تغيير الموظف إلى ${newAssignedEmployee}`);
                    });
                });

                approveBtn.addEventListener("click", function () {
                    orderCard.classList.remove("waiting-for-approval");
                    orderCard.classList.add("in-progress");

                    let inProgressOrders = document.getElementById("in-progress-orders");
                    inProgressOrders.appendChild(orderCard);

                    statusText.innerHTML = `👨‍💼 **الموظف المسؤول:** ${assignedEmployee}`;
                    approveBtn.remove();
                    changeEmployeeBtn.remove();

                    let countdownText = document.createElement("p");
                    countdownText.innerHTML = `⏳ الوقت المتبقي: <span class="countdown">48:00:00</span>`;
                    orderCard.appendChild(countdownText);

                    let completeBtn = document.createElement("button");
                    completeBtn.classList.add("complete-order");
                    completeBtn.innerHTML = "✅ إنهاء الطلب";
                    orderCard.appendChild(completeBtn);

                    let chatBtn = document.createElement("button");
                    chatBtn.classList.add("open-chat");
                    chatBtn.innerHTML = "💬 تواصل مع العميل";
                    orderCard.appendChild(chatBtn);

                    startTimer(orderCard.querySelector(".countdown"));

                    completeBtn.addEventListener("click", function () {
                        completeOrder(orderCard);
                    });

                    chatBtn.addEventListener("click", function () {
                        openChat();
                    });

                    alert(`✅ ${assignedEmployee} قبل الطلب! بدأ العد التنازلي.`);
                    updateStatistics();
                });
            });
        });
    });
    // ✅ زر رفض الطلب
    document.querySelectorAll(".reject-order").forEach(button => {
        button.addEventListener("click", function () {
            let orderCard = this.closest(".order-card");
            orderCard.remove();
            alert("❌ تم رفض الطلب!");
            updateStatistics();
        });
    });

    // ✅ دالة لإنهاء الطلب
function completeOrder(orderCard) {
    orderCard.classList.remove("in-progress");
    orderCard.classList.add("completed");

    // ✅ نقل الطلب إلى قسم الطلبات المكتملة
    document.getElementById("completed-orders").appendChild(orderCard);

    // ✅ إزالة جميع الأزرار غير الضرورية بعد الإنهاء
    orderCard.querySelectorAll("button").forEach(btn => btn.remove());

    // ✅ إزالة العداد الزمني إذا كان موجودًا
    let countdown = orderCard.querySelector(".countdown");
    if (countdown) {
        countdown.remove();
    }

    // ✅ التحقق من عدم تكرار عبارة "تم إنهاء الطلب بنجاح"
    if (!orderCard.querySelector(".completed-text")) {
        let completedText = document.createElement("p");
        completedText.innerHTML = "✅ <strong>تم إنهاء الطلب بنجاح</strong>";
        completedText.classList.add("completed-text");
        orderCard.appendChild(completedText);
    }

    // ✅ إضافة زر "تفاصيل الطلب" مرة واحدة فقط
    if (!orderCard.querySelector(".view-details")) {
        let detailsBtn = document.createElement("button");
        detailsBtn.textContent = "🔍 تفاصيل الطلب";
        detailsBtn.classList.add("view-details");
        detailsBtn.addEventListener("click", function () {
            openOrderDetails(orderCard);
        });
        orderCard.appendChild(detailsBtn);
    }

    alert("✅ تم إنهاء الطلب بنجاح!");
    updateStatistics();
}

// ✅ دالة لفتح نافذة تفاصيل الطلب
function openOrderDetails(orderCard) {
    let modal = document.getElementById("orderDetailsModal");
    let modalContent = document.getElementById("order-details-content");

    // ✅ جلب بيانات الطلب لعرضها في النافذة
    modalContent.innerHTML = orderCard.innerHTML;
    
    // ✅ إظهار النافذة
    modal.style.display = "block";
}

// ✅ إضافة الحدث لزر "إغلاق تفاصيل الطلب"
document.querySelector(".close-modal").addEventListener("click", function () {
    document.getElementById("orderDetailsModal").style.display = "none";
});

// ✅ إضافة الحدث إلى زر "إنهاء الطلب" ليقوم باستدعاء `completeOrder`
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("complete-order")) {
        let orderCard = event.target.closest(".order-card");
        completeOrder(orderCard);
    }
});

// ✅ إضافة الحدث إلى زر "تفاصيل الطلب"
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("view-details")) {
        let orderCard = event.target.closest(".order-card");
        openOrderDetails(orderCard);
    }
});


    // ✅ تشغيل العداد التنازلي
    function startTimer(countdownElement) {
        let timeLeft = 48 * 60 * 60;

        function updateCountdown() {
            let hours = Math.floor(timeLeft / 3600);
            let minutes = Math.floor((timeLeft % 3600) / 60);
            let seconds = timeLeft % 60;

            countdownElement.innerHTML = `${hours}:${minutes}:${seconds}`;

            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateCountdown, 1000);
            } else {
                countdownElement.innerHTML = "⏳ انتهى الوقت!";
            }
        }

        updateCountdown();
    }

    // ✅ فتح نافذة التفاصيل
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("orderDetailsModal").style.display = "block";
        });
    });

    // ✅ إغلاق نافذة التفاصيل
    document.querySelector(".close-modal").addEventListener("click", function () {
        document.getElementById("orderDetailsModal").style.display = "none";
    });

    // ✅ فتح وإغلاق الدردشة
    let chatBox = document.getElementById("chatBox");
    let chatMessages = document.getElementById("chatMessages");
    let chatInput = document.getElementById("chatMessage");

    window.toggleChat = function () {
    let chatBox = document.getElementById("chatBox");
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "block";
    } else {
        chatBox.style.display = "none";
    }
};

    document.addEventListener("click", function (event) {
    if (event.target.classList.contains("open-chat")) {
        console.log("✅ فتح الدردشة");
        toggleChat();
    }
});

    document.querySelector(".close-chat").addEventListener("click", function () {
        toggleChat();
    });

    window.sendMessage = function () {
        let message = chatInput.value.trim();
        if (message === "") return;

        let messageElement = document.createElement("div");
        messageElement.classList.add("message", "sent");
        messageElement.innerHTML = `<strong>👤 أنت:</strong> ${message}`;
        chatMessages.appendChild(messageElement);

        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            let responseElement = document.createElement("div");
            responseElement.classList.add("message", "received");
            responseElement.innerHTML = `<strong>💼 الموظف:</strong> تم استلام الرسالة`;
            chatMessages.appendChild(responseElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    };
});