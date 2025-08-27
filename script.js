// --- 要素の取得 ---
const diaryInput = document.getElementById("diaryInput");
const cardText = document.getElementById("cardText");
const downloadBtn = document.getElementById("downloadBtn");
const cardBackground = document.getElementById("cardBackground");
const cardPreview = document.getElementById("cardPreview");
const textContainer = document.getElementById("textContainer");
const imageContainer = document.getElementById("imageContainer");
const imageUpload = document.getElementById("imageUpload");
const designButtons = document.querySelectorAll(".design-select");
const imageButtons = document.querySelectorAll(".image-select");
const generateBtn = document.getElementById("generateBtn");
const imagePlaceholderText = document.querySelector(".image-placeholder-text"); // 説明文要素を取得

// --- レイアウト設定 ---
const layouts = {
    "default-text": {
        text: { top: '20%', left: '10%', width: '80%', height: '60%', textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background1-text.png": {
        text: { top: '30%', left: '15%', width: '70%', height: '50%', textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background2-text.png": {
        text: { top: '20%', left: '10%', width: '80%', height: '60%', textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background3-text.png": {
        text: { top: '20%', left: '10%', width: '80%', height: '60%', textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background4-text.png": {
        text: { top: '30%', left: '10%', width: '80%', height: '60%', textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background1-img.png": {
        text: { top: '65%', left: '10%', width: '80%', height: '25%', textAlign: 'left' },
        image: { display: 'flex', top: '15%', left: '20%', width: '60%', height: '35%', border: '2px dashed #49a67c' } // display: 'flex'に変更
    },
    "images/background2-img.png": {
        text: { top: '65%', left: '10%', width: '80%', height: '25%', textAlign: 'left' },
        image: { display: 'flex', top: '15%', left: '20%', width: '60%', height: '35%', border: '2px dashed #49a67c' }
    },
    "images/background3-img.png": {
        text: { top: '65%', left: '10%', width: '80%', height: '25%', textAlign: 'left' },
        image: { display: 'flex', top: '15%', left: '20%', width: '60%', height: '35%', border: '2px dashed #49a67c' }
    },
    "images/background4-img.png": {
        text: { top: '65%', left: '10%', width: '80%', height: '25%', textAlign: 'left' },
        image: { display: 'flex', top: '15%', left: '20%', width: '60%', height: '35%', border: '2px dashed #49a67c' }
    }
};

// --- 変数 ---
let selectedDesign = "1";
let selectedType = "text";

// --- イベントリスナー ---
generateBtn.addEventListener("click", () => {
    cardText.textContent = diaryInput.value;
});

designButtons.forEach(button => {
    button.addEventListener("click", () => {
        designButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedDesign = button.getAttribute("data-design");
        updateTemplate();
    });
});

imageButtons.forEach(button => {
    button.addEventListener("click", () => {
        imageButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedType = button.getAttribute("data-type");
        updateTemplate();
    });
});

// PNGとして保存
downloadBtn.addEventListener("click", () => {
    cardPreview.style.border = 'none';
    imageContainer.style.border = 'none';
    html2canvas(cardPreview, { useCORS: true, width: 1200, height: 1200 }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();
        setTimeout(() => {
            cardPreview.style.border = '1px solid #ddd';
            if (imageContainer.style.display === 'flex') { // display: 'flex'に変更
                imageContainer.style.border = '2px dashed #49a67c';
            }
        }, 300);
    });
});

// 画像コンテナをクリックしたら、ファイル選択ダイアログを開く
imageContainer.addEventListener("click", () => {
    imageUpload.click();
});

// ファイルが選択されたら、プレビューに表示する
imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageContainer.innerHTML = ''; 
            const img = document.createElement('img');
            img.src = e.target.result;
            imageContainer.appendChild(img);
            // 画像が挿入されたら説明文を非表示にする
            if (imagePlaceholderText) {
                imagePlaceholderText.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    } else {
        // ファイル選択がキャンセルされた場合、説明文を再表示
        if (imageContainer.childElementCount === 0 && imagePlaceholderText) {
             imagePlaceholderText.style.display = 'block';
        }
    }
});

// --- 関数 ---
function updateTemplate() {
    const templateFileName = `images/background${selectedDesign}-${selectedType}.png`;
    cardBackground.src = templateFileName;

    let layout;
    if (selectedType === "img") {
        layout = layouts[templateFileName];
        // 画像コンテナが表示される場合、説明文を初期表示
        if (imagePlaceholderText) {
             imagePlaceholderText.style.display = 'block';
        }
        imageContainer.innerHTML = `<span class="image-placeholder-text">クリックで画像をアップロード</span>`; // 毎回リセット
    } else {
        layout = layouts[`images/background${selectedDesign}-text.png`];
        if (!layout) {
            layout = layouts["default-text"];
        }
        // 画像コンテナが非表示になる場合、説明文も非表示にする
        if (imagePlaceholderText) {
             imagePlaceholderText.style.display = 'none';
        }
    }
    
    Object.assign(textContainer.style, layout.text);
    Object.assign(imageContainer.style, layout.image);
}

// --- 初期化処理 ---
if (designButtons.length > 0) {
    designButtons[0].classList.add("active");
}
if (imageButtons.length > 0) {
    imageButtons[0].classList.add("active");
}
updateTemplate();
