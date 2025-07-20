document.addEventListener("DOMContentLoaded", async () => {
    let data = {};
  
    try {
      const response = await fetch("/api/statistics");
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("البيانات المستلمة ليست JSON");
      }
      data = await response.json();
    } catch (error) {
      console.warn("⚠️ لا يوجد اتصال بقاعدة البيانات - يتم استخدام بيانات تجريبية");
      data = {
        clientsCount: 320,
        completedOrders: 40,
        activeOrders: 10,
        rejectedOrders: 5,
        monthlyRevenue: 900,
        yearlyRevenue: 10800,
        totalProfit: 9800,
        satisfaction: 91,
        topService: "تصميم شعار",
        months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
        ordersPerMonth: [10, 15, 8, 20, 12, 18],
        revenuePerMonth: [1000, 1800, 1300, 2100, 1900, 2200]
      };
    }
  
    // ✅ تحديث الواجهة
    document.getElementById("clientsCount").textContent = data.clientsCount ?? "—";
    document.getElementById("completedOrders").textContent = data.completedOrders ?? "—";
    document.getElementById("activeOrders").textContent = data.activeOrders ?? "—";
    document.getElementById("rejectedOrders").textContent = data.rejectedOrders ?? "—";
    document.getElementById("monthlyRevenue").textContent = `$${(data.monthlyRevenue ?? 0).toLocaleString()}`;
    document.getElementById("yearlyRevenue").textContent = `$${(data.yearlyRevenue ?? 0).toLocaleString()}`;
    document.getElementById("totalProfit").textContent = `$${(data.totalProfit ?? 0).toLocaleString()}`;
    document.getElementById("satisfaction").textContent = `${data.satisfaction ?? "—"}%`;
    document.getElementById("topService").textContent = data.topService ?? "—";
  
    // 🟦 رسم مخطط الطلبات
    const ordersCtx = document.getElementById("ordersChart").getContext("2d");
    new Chart(ordersCtx, {
      type: 'bar',
      data: {
        labels: data.months,
        datasets: [{
          label: "عدد الطلبات",
          data: data.ordersPerMonth,
          backgroundColor: "#00cec9"
        }]
      },
      options: { responsive: true }
    });
  
    // 🟩 رسم مخطط الإيرادات
    const revenueCtx = document.getElementById("revenueChart").getContext("2d");
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: data.months,
        datasets: [{
          label: "الإيرادات ($)",
          data: data.revenuePerMonth,
          borderColor: "#00b894",
          backgroundColor: "rgba(0, 184, 148, 0.1)",
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true }
    });
  });
  
  
  
  