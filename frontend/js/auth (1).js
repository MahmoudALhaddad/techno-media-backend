
function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const result = await res.json();

  if (result.success) {
    if (result.role === "admin") location.href = "/admin-dashboard-REBUILT.html";
    else if (result.role === "employee") location.href = "/employee-dashboard.html";
    else if (result.role === "client") location.href = "/client-dashboard-FULL-REBUILT.html";
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

async function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const confirm = document.getElementById("regConfirm").value.trim();
  const phone = document.getElementById("regPhone").value.trim();

  if (!name || !email || !pass || !confirm || !phone || pass !== confirm) {
    document.getElementById("registerError").style.display = "block";
    return;
  }

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password: pass, phone })
  });

  const result = await res.json();
  if (result.success) {
    location.href = "/client-dashboard-FULL-REBUILT.html";
  } else {
    document.getElementById("registerError").style.display = "block";
  }
}
