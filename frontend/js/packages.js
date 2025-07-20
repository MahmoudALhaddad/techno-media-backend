document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const closeSidebar = document.getElementById("close-menu");
    const addPackageBtn = document.getElementById("add-package-btn");
    const modal = document.getElementById("add-package-modal");
    const closeModal = document.getElementById("close-modal");
    const packageForm = document.getElementById("package-form");
    const packagesTable = document.querySelector("#packages-table tbody");
    const searchInput = document.getElementById("search-input");
    const packageImageInput = document.getElementById("package-image");
    const packageOffer = document.getElementById("package-offer");
    const offerDurationInput = document.getElementById("offer-duration");

    let packages = [];

   

    addPackageBtn.addEventListener("click", () => modal.classList.add("active"));
    closeModal.addEventListener("click", () => modal.classList.remove("active"));

    packageOffer.addEventListener("change", () => {
        offerDurationInput.disabled = !packageOffer.checked;
    });

   


    packageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("package-name").value;
        const price = document.getElementById("package-price").value;
        const duration = document.getElementById("package-duration").value;
        const orders = document.getElementById("package-orders").value;
        const description = document.getElementById("package-description").value;
        const offer = packageOffer.checked;
        const offerDuration = offer ? offerDurationInput.value : 0;
        const imageFile = packageImageInput.files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const newPackage = { name, price, imageUrl, duration, orders, description, offer, offerDuration, createdAt: new Date() };
            packages.push(newPackage);
            updateTable();
            modal.classList.remove("active");
            packageForm.reset();
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    });

    function updateTable() {
        packagesTable.innerHTML = "";
        packages.forEach((pkg, index) => {
            let offerBadge = pkg.offer ? `<span class='offer-badge'>🔥 عرض خاص</span>` : "";
            let countdown = pkg.offer ? `<span class='countdown' data-time='${pkg.offerDuration}'>⏳ ${pkg.offerDuration} ساعة متبقية</span>` : "";
            
            const row = `<tr>
                <td><img src='${pkg.imageUrl}' alt='${pkg.name}' width='50'></td>
                <td>${pkg.name} ${offerBadge}</td>
                <td>${pkg.price}$</td>
                <td>${pkg.duration}</td>
                <td>${pkg.orders == 0 ? "غير محدود" : pkg.orders}</td>
                <td>${countdown}</td>
                <td>
                    <button class='edit-btn' data-index='${index}'>✏ تعديل</button>
                    <button class='delete-btn' data-index='${index}'>🗑 حذف</button>
                </td>
            </tr>`;
            packagesTable.innerHTML += row;
        });
        updateCountdown();
    }

    function updateCountdown() {
        document.querySelectorAll(".countdown").forEach(countdown => {
            let time = parseInt(countdown.dataset.time);
            if (time > 0) {
                const interval = setInterval(() => {
                    time--;
                    countdown.innerHTML = `⏳ ${time} ساعة متبقية`;
                    if (time <= 0) {
                        clearInterval(interval);
                        countdown.innerHTML = "انتهى العرض";
                        countdown.parentElement.classList.remove("offer-badge");
                    }
                }, 3600000);
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.dataset.index;
            packages.splice(index, 1);
            updateTable();
        }
        if (e.target.classList.contains("edit-btn")) {
            const index = e.target.dataset.index;
            const pkg = packages[index];
            document.getElementById("package-name").value = pkg.name;
            document.getElementById("package-price").value = pkg.price;
            document.getElementById("package-duration").value = pkg.duration;
            document.getElementById("package-orders").value = pkg.orders;
            document.getElementById("package-description").value = pkg.description;
            packageOffer.checked = pkg.offer;
            offerDurationInput.value = pkg.offerDuration;
            modal.classList.add("active");
        }
    });
});


