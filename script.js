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
const imagePlaceholderText = document.querySelector(".image-placeholder-text");
const captureContainer = document.getElementById("captureContainer");

// --- レイアウト設定（座標を元に再計算） ---
const DESIGN_SIZE = 1200;

// プレビュー用オフセット
const PREVIEW_TOP_OFFSET_PX = 20; // ここを20pxに設定
// 書き出し用オフセット
const DOWNLOAD_TOP_OFFSET_PX = 6; // ここを6pxに設定

const layouts = {
    "images/background1-text.png": {
        text: { top: 200, left: 170, width: 860, height: 790, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background2-text.png": {
        text: { top: 200, left: 170, width: 860, height: 790, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background3-text.png": {
        text: { top: 200, left: 170, width: 860, height: 790, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background4-text.png": {
        text: { top: 200, left: 170, width: 860, height: 790, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background1-img.png": {
        text: { top: 720, left: 170, width: 860, height: 300, textAlign: 'left' },
        image: { top: 220, left: 170, width: 860, height: 460, display: 'flex', border: '2px dashed #49a67c' }
    },
    "images/background2-img.png": {
        text: { top: 720, left: 170, width: 860, height: 300, textAlign: 'left' },
        image: { top: 220, left: 170, width: 860, height: 460, display: 'flex', border: '2px dashed #49a67c' }
    },
    "images/background3-img.png": {
        text: { top: 720, left: 170, width: 860, height: 300, textAlign: 'left' },
        image: { top: 220, left: 170, width: 860, height: 460, display: 'flex', border: '2px dashed #49a67c' }
    },
    "images/background4-img.png": {
        text: { top: 720, left: 170, width: 860, height: 300, textAlign: 'left' },
        image: { top: 220, left: 170, width: 860, height: 460, display: 'flex', border: '2px dashed #49a67c' }
    }
};

// --- 変数 ---
let selectedDesign = "1";
let selectedType = "text";

// --- イベントリスナー ---
diaryInput.addEventListener("input", () => {
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

downloadBtn.addEventListener("click", async () => {
    // 現在のプレビューのスタイルを保存
    const originalStyle = {
        width: cardPreview.style.width,
        height: cardPreview.style.height,
        position: cardPreview.style.position
    };

    // キャプチャ用に一時的にスタイルを変更
    cardPreview.style.width = `${DESIGN_SIZE}px`;
    cardPreview.style.height = `${DESIGN_SIZE}px`;
