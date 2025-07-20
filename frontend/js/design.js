let livePreview = document.getElementById("livePreview");
let selectedElement = null;

livePreview.onload = function() {
    applyEventListeners();
};

function applyEventListeners() {
    let iframeDoc = livePreview.contentDocument || livePreview.contentWindow.document;
    let editableElements = iframeDoc.querySelectorAll("h1, p, button, div, img, video");

    editableElements.forEach(el => {
        el.style.outline = "1px dashed #007bff";
        el.addEventListener("click", function(event) {
            event.stopPropagation();
            selectedElement = el;
            console.log("Selected element:", selectedElement);
            showToolbar(event.clientX, event.clientY);
        });
    });

    new Sortable(iframeDoc.body, { animation: 150 });
}

function showToolbar(x, y) {
    let toolbar = document.getElementById("toolbar");
    toolbar.style.display = "flex";
    toolbar.style.top = `${y}px`;
    toolbar.style.left = `${x}px`;
}

function editText() {
    if (selectedElement && !['IMG', 'VIDEO'].includes(selectedElement.tagName)) {
        let newText = prompt("أدخل النص الجديد:", selectedElement.innerText);
        if (newText !== null) selectedElement.innerText = newText;
    }
}

function changeColor() {
    if (selectedElement) {
        let newColor = prompt("أدخل كود اللون:", "#007bff");
        if (newColor !== null) selectedElement.style.color = newColor;
    }
}

function duplicateElement() {
    if (selectedElement) {
        let clone = selectedElement.cloneNode(true);
        selectedElement.parentNode.insertBefore(clone, selectedElement.nextSibling);
        applyEventListeners();
    }
}

function deleteElement() {
    if (selectedElement) {
        selectedElement.remove();
        document.getElementById("toolbar").style.display = "none";
    }
}

function addNewSection() {
    let iframeDoc = livePreview.contentDocument || livePreview.contentWindow.document;
    let newSection = iframeDoc.createElement("div");
    newSection.innerHTML = "<h2>قسم جديد</h2><p>يمكنك تعديل هذا النص</p>";
    newSection.className = "draggable";
    iframeDoc.body.appendChild(newSection);
    applyEventListeners();
}

function replaceMedia() {
    if (selectedElement && ['IMG', 'VIDEO'].includes(selectedElement.tagName)) {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = selectedElement.tagName === 'IMG' ? "image/*" : "video/*";
        input.onchange = async (event) => {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = function(e) {
                selectedElement.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };
        input.click();
    } else {
        alert("يرجى تحديد صورة أو فيديو لاستبداله.");
    }
}

function insertMedia() {
    let iframeDoc = livePreview.contentDocument || livePreview.contentWindow.document;
    let sections = iframeDoc.querySelectorAll("section, div");
    if (sections.length === 0) {
        alert("لا توجد أقسام متاحة لإضافة الوسائط.");
        return;
    }

    let sectionNames = Array.from(sections).map((sec, index) => `(${index + 1}) ${sec.id || "قسم بدون اسم"}`);
    
    let sectionIndex = prompt(`اختر القسم لإضافة الوسائط:\n${sectionNames.join("\n")}`);
    
    if (sectionIndex !== null) {
        sectionIndex = parseInt(sectionIndex, 10);
        if (isNaN(sectionIndex) || sectionIndex < 1 || sectionIndex > sections.length) {
            alert("الرقم الذي أدخلته غير صالح.");
            return;
        }

        let selectedSection = sections[sectionIndex - 1];
        console.log("إضافة الوسائط إلى القسم:", selectedSection);

        let input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*,video/*";
        input.onchange = (event) => {
            let file = event.target.files[0];
            if (!file) return;

            let reader = new FileReader();
            reader.onload = function(e) {
                let media = file.type.startsWith("image") ? iframeDoc.createElement("img") : iframeDoc.createElement("video");
                if (file.type.startsWith("video")) {
                    media.controls = true;
                    media.style.objectFit = "cover";
                    media.style.aspectRatio = "16/9";
                    media.style.width = "100%";
                    media.style.height = "auto";
                }

                media.src = e.target.result;
                media.classList.add("draggable");
                
                selectedSection.appendChild(media);
                applyEventListeners();
            };
            reader.readAsDataURL(file);
        };
        input.click();
    } else {
        alert("لم يتم اختيار أي قسم.");
    }
}

function applyAnimation() {
    if (selectedElement) {
        let animationType = prompt("اختر تأثير: fade, slide, zoom", "fade");
        if (animationType) {
            selectedElement.style.transition = "all 0.5s ease";
            if (animationType === "fade") {
                selectedElement.style.opacity = "0";
                setTimeout(() => { selectedElement.style.opacity = "1"; }, 500);
            } else if (animationType === "slide") {
                selectedElement.style.transform = "translateX(50px)";
                setTimeout(() => { selectedElement.style.transform = "translateX(0)"; }, 500);
            } else if (animationType === "zoom") {
                selectedElement.style.transform = "scale(1.1)";
                setTimeout(() => { selectedElement.style.transform = "scale(1)"; }, 500);
            }
        }
    }
}

function undoChange() {
    document.execCommand('undo');
}

function redoChange() {
    document.execCommand('redo');
}







