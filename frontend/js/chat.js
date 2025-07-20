
document.addEventListener("DOMContentLoaded", () => {
  const chatList = document.getElementById("chatList");
  const chatMessages = document.getElementById("chatMessages");
  const chatHeader = document.getElementById("chatHeader");
  const chatUser = document.getElementById("chatUser");
  const chatInput = document.getElementById("chatInput");
  const sendMessageBtn = document.getElementById("sendMessageBtn");
  const downloadBtn = document.getElementById("downloadChatBtn");

  let currentConversation = null;

  // جلب المحادثات من السيرفر (قائمة المستخدمين فقط)
  fetch("/api/clients-with-messages")
    .then(res => res.json())
    .then(clients => {
      clients.forEach(client => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${client.name}</strong>
          <small style="display:block">${client.lastMessage}</small>
          <span style="color: ${client.replied ? 'green' : 'red'}">
            ${client.replied ? '✔ تم الرد' : '⏳ بانتظار الرد'}
          </span>
        `;
        li.addEventListener("click", () => openChat(client));
        chatList.appendChild(li);
      });
    });

  function openChat(client) {
    currentConversation = client;
    chatUser.textContent = client.name;
    chatInput.disabled = false;
    sendMessageBtn.disabled = false;
    chatMessages.innerHTML = "";

    fetch(`/api/messages?client_id=${client.id}`)
      .then(res => res.json())
      .then(messages => {
        messages.forEach(msg => {
          const div = document.createElement("div");
          div.className = "chat-message " + msg.sender;
          div.innerHTML = `${msg.text}<time>${formatTime(msg.timestamp)}</time>`;
          chatMessages.appendChild(div);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });

    sendMessageBtn.onclick = () => {
      const text = chatInput.value.trim();
      if (text && currentConversation) {
        const messageData = {
          client_id: currentConversation.id,
          text: text
        };

        fetch("/api/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const div = document.createElement("div");
            div.className = "chat-message admin";
            div.innerHTML = `${text}<time>${formatTime(new Date())}</time>`;
            chatMessages.appendChild(div);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }
        });
      }
    };

    downloadBtn.onclick = () => {
      fetch(`/api/messages?client_id=${client.id}`)
        .then(res => res.json())
        .then(messages => {
          let allText = "";
          messages.forEach(m => {
            allText += `${m.sender === "admin" ? "الموظف" : "العميل"}: ${m.text} (${formatTime(m.timestamp)})\n`;
          });
          const blob = new Blob([allText], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${client.name}-chat.txt`;
          a.click();
        });
    };
  }

  function formatTime(dateStr) {
    const date = new Date(dateStr);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
});
