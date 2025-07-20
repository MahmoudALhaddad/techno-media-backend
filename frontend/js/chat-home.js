const toggleBtn = document.getElementById("chat-toggle");
const chatWindow = document.querySelector(".chat-window");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatBody = document.getElementById("chat-body");
const sendSound = document.getElementById("send-sound");
const receiveSound = document.getElementById("receive-sound");

function playReceiveSound() {
  receiveSound.play();
}



let receiverId = "support"; // افتراضي

function determineReceiver() {
  const isClientPage = window.location.pathname.includes("client");

  if (!isClientPage) {
    receiverId = "support";
  } else {
    const activeOrder = getActiveOrder(); // لاحقًا من قاعدة البيانات
    receiverId = activeOrder ? activeOrder.assignedToId : "support";
  }
}


toggleBtn.addEventListener("click", () => {
  determineReceiver();
  chatWindow.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("input", () => {
  sendBtn.disabled = chatInput.value.trim() === "";
});
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (message === "") return;

  // عرض الرسالة في الواجهة
  const msgDiv = document.createElement("div");
  msgDiv.className = "message";
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  msgDiv.innerHTML = `<span class="sender">أنت:</span><span class="time">${time}</span> ${message}`;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  chatInput.value = "";
  sendBtn.disabled = true;
  sendSound.play();

  // إرسال للباك-إند لاحقًا (جاهز للربط)
  sendMessageToWhatsApp({
    to: getWhatsAppNumber(receiverId),
    text: message
  });
}

function receiveMessage({ from, text, time }) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message support"; // رسالة واردة
  msgDiv.innerHTML = `
    <span class="sender">${getDisplayName(from)}:</span>
    <span class="time">${time}</span>
    ${text}
  `;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  receiveSound.play();
}



function sendMessageToWhatsApp({ to, text }) {
  console.log("📨 سيتم إرسال الرسالة إلى واتساب:", to, text);

  // ✅ هذا هو مكان الربط لاحقًا مع API حقيقي
  // fetch('/api/send-whatsapp', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ to, text })
  // });
}

function getWhatsAppNumber(receiverId) {
  const map = {
    support: "9627XXXXXXXX",
    emp_4783: "9627YYYYYYY",
    emp_9021: "9627ZZZZZZZ"
  };
  return map[receiverId] || map.support;
}

function getActiveOrder() {
  // مستقبلًا بنجلب من قاعدة البيانات أو API
  return {
    id: 25,
    assignedToId: "emp_4783"
  };
}

function getDisplayName(senderId) {
  const nameMap = {
    support: "الدعم الفني",
    emp_4783: "محمد الزعبي",
    emp_9021: "ياسر الحسن"
  };

  return senderId === "client" ? "أنت" : nameMap[senderId] || "موظف غير معروف";
}



function receiveMessage({ from, text, time }) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message support"; // الدعم أو الموظف
  msgDiv.innerHTML = `
    <span class="sender">${getDisplayName(from)}:</span>
    <span class="time">${time}</span>
    ${text}
  `;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  receiveSound.play();
}

setTimeout(() => {
  receiveMessage({
    from: "emp_4783",
    text: "تم استلام الطلب وسأبدأ التنفيذ حالاً ✅",
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  });
}, 2000);



