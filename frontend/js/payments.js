
document.addEventListener("DOMContentLoaded", () => {
  const paymentsBody = document.getElementById("paymentsBody");
  const exportBtn = document.getElementById("exportBtn");
  const fromDateInput = document.getElementById("fromDate");
  const toDateInput = document.getElementById("toDate");

  const payments = [
    {
      client: "أحمد محمد",
      service: "تصميم شعار",
      amount: 150,
      date: "2024-03-15",
      status: "تم الدفع"
    },
    {
      client: "سارة علي",
      service: "تطوير موقع",
      amount: 300,
      date: "2024-03-22",
      status: "قيد الانتظار"
    },
    {
      client: "خالد يوسف",
      service: "مونتاج فيديو",
      amount: 200,
      date: "2024-04-01",
      status: "تم الدفع"
    }
  ];

  function renderPayments(data) {
    paymentsBody.innerHTML = "";
    data.forEach(payment => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payment.client}</td>
        <td>${payment.service}</td>
        <td>$${payment.amount}</td>
        <td>${payment.date}</td>
        <td style="color:${payment.status === 'تم الدفع' ? 'green' : 'orange'}">${payment.status}</td>
        <td><button onclick="alert('تفاصيل الدفع لـ ${payment.client}')">عرض</button></td>
      `;
      paymentsBody.appendChild(row);
    });
  }

  renderPayments(payments);

  exportBtn.addEventListener("click", () => {
    const from = new Date(fromDateInput.value);
    const to = new Date(toDateInput.value);

    let csv = "العميل,الخدمة,المبلغ,التاريخ,الحالة\n";

    const filtered = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      if (fromDateInput.value && paymentDate < from) return false;
      if (toDateInput.value && paymentDate > to) return false;
      return true;
    });

    filtered.forEach(payment => {
      csv += `${payment.client},${payment.service},$${payment.amount},${payment.date},${payment.status}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered-payments.csv";
    link.click();
  });
});
