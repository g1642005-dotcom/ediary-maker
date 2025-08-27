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

// --- レイアウト設定 ---
const layouts = {
    "default-text": {
        text: { top: '20%', left: '10%', width: '80%', height: '60%', textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background1-text.png": {
        text: { top: '20%', left: '10%', width: '80%', height: '60%', textAlign: 'left' },
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
        text: { top: '20%', left: '10%', width: '80%', height: '60%', textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background1-img.png": {
        text: { top: '50%', left: '5%', width: '45%', height: '40%', textAlign: 'left' },
        image: { display: 'block', top: '10%', left: '55%', width: '40%', height: '40%', border: '2px dashed #49a67c' }
    },
    "images/background2-img.png": {
        text: { top: '55%', left: '10%', width: '80%', height: '35%', textAlign: 'left' },
        image: { display: 'block', top: '10%', left: '10%', width: '80%', height: '40%', border: '2px dashed #49a67c' }
    },
    "images/background3-img.png": {
        text: { top: '55%', left: '10%', width: '80%', height: '35%', textAlign: 'left' },
        image: { display: 'block', top: '10%', left: '10%', width: '80%', height: '40%', border: '2px dashed #49a67c' }
    },
    "images/background4-img.png": {
        text: { top: '40%', left: '5%', width: '45%', height: '50%', textAlign: 'left' },
        image: { display: 'block', top: '5%', left: '50%', width: '45%', height: '30%', border: '2px dashed #49a67c' }
    }
};

// --- 変数 ---
let selectedDesign = "1"; // 初期値を設定
let selectedType = "text"; // 初期値を設定

// --- イベントリスナー ---
// テキスト入力のリアルタイムプレビュー
generateBtn.addEventListener("click", () => {
    cardText.textContent = diaryInput.value;
});

// デザインボタンのクリックイベント
designButtons.forEach(button => {
    button.addEventListener("click", () => {
        designButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedDesign = button.getAttribute("data-design");
        updateTemplate();
    });
});

// 画像有無ボタンのクリックイベント
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
    html2canvas(cardPreview, { useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();
        setTimeout(() => {
            cardPreview.style.border = '1px solid #ddd';
            if (imageContainer.style.display === 'block') {
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
        };
        reader.readAsDataURL(file);
    }
});

// --- 関数 ---
function updateTemplate() {
    const templateFileName = `images/background${selectedDesign}-${selectedType}.png`;
    cardBackground.src = templateFileName;

    let layout;
    if (selectedType === "img") {
        layout = layouts[templateFileName];
    } else {
        layout = layouts[`images/background${selectedDesign}-text.png`];
        if (!layout) {
            layout = layouts["default-text"];
        }
    }
    
    // スタイルを適用
    Object.assign(textContainer.style, layout.text);
    Object.assign(imageContainer.style, layout.image);
}

// --- 初期化処理 ---
// ページ読み込み時に最初のテンプレートをアクティブにする
if (designButtons.length > 0) {
    designButtons[0].classList.add("active");
}
if (imageButtons.length > 0) {
    imageButtons[0].classList.add("active");
}
updateTemplate();
