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
const wordCountMessage = document.getElementById("wordCountMessage");
const lineCountMessage = document.getElementById("lineCountMessage");

// --- レイアウト設定（座標を元に再計算） ---
const DESIGN_SIZE = 1200;

const PREVIEW_TOP_OFFSET_PX = 30;
const DOWNLOAD_TOP_OFFSET_PX = 10;

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
    let inputText = diaryInput.value;
    let lines = inputText.split('\n');
    let maxLines = 0;
    let maxCharsPerLine = 0;
    
    if (selectedType === 'text') {
        maxLines = 8;
        maxCharsPerLine = 17;
    } else if (selectedType === 'img') {
        maxLines = 3;
        maxCharsPerLine = 17;
    }

    wordCountMessage.textContent = '';
    lineCountMessage.textContent = '';
    
    // 行数制限のチェック
    if (lines.length > maxLines) {
        lineCountMessage.textContent = `最大${maxLines}行まで入力できます`;
    }
    
    // 各行の文字数制限のチェック
    let isOverCharLimit = false;
    for (const line of lines) {
        if (line.length > maxCharsPerLine) {
            isOverCharLimit = true;
            break;
        }
    }
    
    if (isOverCharLimit) {
        wordCountMessage.textContent = `1行は${maxCharsPerLine}文字までです`;
    }
    
    cardText.textContent = inputText;
});

designButtons.forEach(button => {
    button.addEventListener("click", () => {
        designButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedDesign = button.getAttribute("data-design");
        diaryInput.value = '';
        cardText.textContent = '';
        wordCountMessage.textContent = '';
        lineCountMessage.textContent = '';
        updateTemplate();
    });
});

imageButtons.forEach(button => {
    button.addEventListener("click", () => {
        imageButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedType = button.getAttribute("data-type");
        diaryInput.value = '';
        cardText.textContent = '';
        wordCountMessage.textContent = '';
        lineCountMessage.textContent = '';
        updateTemplate();
    });
});

downloadBtn.addEventListener("click", async () => {
    const originalStyle = {
        width: cardPreview.style.width,
        height: cardPreview.style.height,
        position: cardPreview.style.position
    };
    
    // キャプチャ用に一時的にスタイルを変更し、位置情報を統一
    cardPreview.style.width = `${DESIGN_SIZE}px`;
    cardPreview.style.height = `${DESIGN_SIZE}px`;
    cardPreview.style.position = 'fixed';
    cardPreview.style.top = '0';
    cardPreview.style.left = '0';

    cardPreview.style.opacity = '0';
    
    // 書き出し用のクラスを追加
    cardPreview.classList.add('export-mode');

    await document.fonts.ready;
    
    html2canvas(cardPreview, {
        useCORS: true,
        scale: 1,
        allowTaint: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        
        // 元のスタイルとクラスに戻す
        cardPreview.style.width = originalStyle.width;
        cardPreview.style.height = originalStyle.height;
        cardPreview.style.position = originalStyle.position;
        cardPreview.style.top = '';
        cardPreview.style.left = '';
        
        cardPreview.style.opacity = '1';
        cardPreview.classList.remove('export-mode');

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
function updateTemplate() {
    const templateFileName = `images/background${selectedDesign}-${selectedType}.png`;
    cardBackground.src = templateFileName;

    // テンプレートの種類に応じてクラスを切り替える
    if (selectedType === 'img') {
        cardPreview.classList.add('img-template');
    } else {
        cardPreview.classList.remove('img-template');
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
