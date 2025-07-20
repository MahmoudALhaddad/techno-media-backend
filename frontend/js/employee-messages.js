// ✅ فتح وإغلاق القائمة الجانبية
document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.add("open");
});
document.getElementById("closeSidebar")?.addEventListener("click", () => {
  document.getElementById("sidebar")?.classList.remove("open");
});

// ✅ بيانات العملاء
const clients = {
  client1: {
    name: "محمد علي",
    messages: [
      { side: "left", text: "مرحبًا، هل تم البدء في الطلب؟" },
      { side: "right", text: "نعم، نحن نعمل عليه الآن ✅" }
    ]
  },
  client2: {
    name: "نور الدين",
    messages: [
      { side: "left", text: "تم إرسال الملفات المطلوبة." },
      { side: "right", text: "شكرًا، تم الاستلام." }
    ]
  },
  client3: {
    name: "سارة الكيلاني",
    messages: [
      { side: "left", text: "متى سيتم التسليم؟" },
      { side: "right", text: "غدًا مساءً بإذن الله." }
    ]
  }
};

// ✅ تحميل الرسائل عند اختيار العميل
const chatListItems = document.querySelectorAll("#clientsList li");
const chatMessages = document.getElementById("chatMessages");
const chatTitle = document.getElementById("chatTitle");

chatListItems.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll("#clientsList li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    const clientKey = item.dataset.client;
    const client = clients[clientKey];

    chatTitle.textContent = `المحادثة مع: ${client.name}`;
    chatMessages.innerHTML = "";

    client.messages.forEach(msg => {
      const div = document.createElement("div");
      div.className = "msg " + msg.side;
      div.textContent = msg.text;
      chatMessages.appendChild(div);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // إغلاق قائمة العملاء في الجوال
    document.querySelector(".chat-list").classList.remove("show");
  });
});

// ✅ زر العودة في الجوال
const backBtn = document.getElementById("backToList");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    document.getElementById("chatList").scrollIntoView({ behavior: "smooth" });
  });
}

// ✅ إرسال الرسالة
const sendBtn = document.getElementById("sendMessage");
const messageInput = document.getElementById("messageInput");

if (sendBtn && messageInput) {
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });
}

function sendMessage() {
  const message = messageInput.value.trim();
  if (message === "") return;

  const div = document.createElement("div");
  div.className = "msg right";
  div.textContent = message;
  chatMessages.appendChild(div);

  messageInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ✅ زر إظهار قائمة العملاء في الجوال
const toggleBtn = document.getElementById("toggleClients");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.querySelector(".chat-list").classList.toggle("show");
  });
}

  
  
  
  