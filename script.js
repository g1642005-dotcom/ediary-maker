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
const PREVIEW_TOP_OFFSET_PX = 30; // ここを20pxに設定
// 書き出し用オフセット
const DOWNLOAD_TOP_OFFSET_PX = 10; // ここを6pxに設定

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
    cardPreview.style.position = 'fixed';
    cardPreview.style.top = '0';
    cardPreview.style.left = '0';

    // レイアウトの再計算 (書き出し用)
    updateLayoutForCapture();

    // フォントの読み込みを待つ
    await document.fonts.ready;

    // html2canvasを実行
    html2canvas(cardPreview, {
        useCORS: true,
        scale: 1
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();

        // 元のスタイルに戻す
        cardPreview.style.width = originalStyle.width;
        cardPreview.style.height = originalStyle.height;
        cardPreview.style.position = originalStyle.position;
        cardPreview.style.top = '';
        cardPreview.style.left = '';

        // プレビューのレイアウトを戻す
        updateTemplate();
    });
});

imageContainer.addEventListener("click", () => {
    imageUpload.click();
});

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
// プレビュー表示用
function updateTemplate() {
    const templateFileName = `images/background${selectedDesign}-${selectedType}.png`;
    cardBackground.src = templateFileName;
    const previewWidth = cardPreview.offsetWidth;

    const layout = layouts[templateFileName];
    const scale = previewWidth / DESIGN_SIZE;

    textContainer.style.top = `${(layout.text.top - PREVIEW_TOP_OFFSET_PX) * scale}px`;
    textContainer.style.left = `${layout.text.left * scale}px`;
    textContainer.style.width = `${layout.text.width * scale}px`;
    textContainer.style.height = `${layout.text.height * scale}px`;
    textContainer.style.textAlign = layout.text.textAlign;

    const newFontSize = 50 * scale;
    const newLineHeight = 98 * scale;
    cardText.style.fontSize = newFontSize + 'px';
    cardText.style.lineHeight = newLineHeight + 'px';

    if (selectedType === 'img') {
        imageContainer.style.display = 'flex';
        imageContainer.style.border = layout.image.border;
        imageContainer.style.top = `${layout.image.top * scale}px`;
        imageContainer.style.left = `${layout.image.left * scale}px`;
        imageContainer.style.width = `${layout.image.width * scale}px`;
        imageContainer.style.height = `${layout.image.height * scale}px`;

        if (!imageContainer.querySelector('img')) {
            imageContainer.innerHTML = `<span class="image-placeholder-text">クリックで画像をアップロード</span>`;
        }
    } else {
        imageContainer.style.display = 'none';
        imageContainer.innerHTML = '';
    }
}

// キャプチャ用
function updateLayoutForCapture() {
    const layout = layouts[`images/background${selectedDesign}-${selectedType}.png`];

    textContainer.style.top = `${layout.text.top - DOWNLOAD_TOP_OFFSET_PX}px`;
    textContainer.style.left = `${layout.text.left}px`;
    textContainer.style.width = `${layout.text.width}px`;
    textContainer.style.height = `${layout.text.height}px`;
    textContainer.style.textAlign = layout.text.textAlign;

    cardText.style.fontSize = '50px';
    cardText.style.lineHeight = '98px';

    if (selectedType === 'img') {
        imageContainer.style.display = 'flex';
        imageContainer.style.border = 'none';
        imageContainer.style.top = `${layout.image.top}px`;
        imageContainer.style.left = `${layout.image.left}px`;
        imageContainer.style.width = `${layout.image.width}px`;
        imageContainer.style.height = `${layout.image.height}px`;
    } else {
        imageContainer.style.display = 'none';
    }
}

// --- 初期化処理 ---
if (designButtons.length > 0) {
    designButtons[0].classList.add("active");
}
if (imageButtons.length > 0) {
    imageButtons[0].classList.add("active");
}

updateTemplate();
window.addEventListener('resize', updateTemplate);
