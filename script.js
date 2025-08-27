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
    // キャプチャ用要素を準備
    const captureElement = cardPreview.cloneNode(true);
    captureElement.id = 'capturePreview';
    
    // キャプチャ用要素のサイズとスタイルを1200x1200に設定
    captureElement.style.width = `${DESIGN_SIZE}px`;
    captureElement.style.height = `${DESIGN_SIZE}px`;
    captureElement.style.position = 'absolute';
    captureElement.style.top = '0';
    captureElement.style.left = '0';
    
    // キャプチャ用要素内のテキストと画像コンテナのスタイルを更新
    const captureTextContainer = captureElement.querySelector('#textContainer');
    const captureImageContainer = captureElement.querySelector('#imageContainer');

    const layout = layouts[`images/background${selectedDesign}-${selectedType}.png`];
    
    // テキストコンテナのスタイルを書き出し用サイズに設定
    captureTextContainer.style.top = `${layout.text.top - DOWNLOAD_TOP_OFFSET_PX}px`;
    captureTextContainer.style.left = `${layout.text.left}px`;
    captureTextContainer.style.width = `${layout.text.width}px`;
    captureTextContainer.style.height = `${layout.text.height}px`;
    captureTextContainer.style.textAlign = layout.text.textAlign;
    
    // フォントサイズと行間も書き出し用サイズに設定
    const cardTextElement = captureTextContainer.querySelector('#cardText');
    cardTextElement.style.fontSize = '50px';
    cardTextElement.style.lineHeight = '1.96em';

    // 画像コンテナのスタイルを書き出し用サイズに設定
    if (selectedType === 'img') {
        captureImageContainer.style.display = 'flex';
        captureImageContainer.style.border = layout.image.border;
        captureImageContainer.style.top = `${layout.image.top}px`;
        captureImageContainer.style.left = `${layout.image.left}px`;
        captureImageContainer.style.width = `${layout.image.width}px`;
        captureImageContainer.style.height = `${layout.image.height}px`;
    } else {
        captureImageContainer.style.display = 'none';
    }

    // キャプチャ用コンテナに要素を追加
    captureContainer.appendChild(captureElement);
    
    await document.fonts.ready;
    
    html2canvas(captureElement, {
        useCORS: true,
        scale: 1,
        allowTaint: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        
        // キャプチャ用要素を削除してクリーンアップ
        captureContainer.removeChild(captureElement);
        
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
    
    const currentWidth = cardPreview.offsetWidth;
    const layout = layouts[templateFileName];
    const scale = currentWidth / DESIGN_SIZE;
    
    textContainer.style.top = `${(layout.text.top - PREVIEW_TOP_OFFSET_PX) * scale}px`;
    textContainer.style.left = `${layout.text.left * scale}px`;
    textContainer.style.width = `${layout.text.width * scale}px`;
    textContainer.style.height = `${layout.text.height * scale}px`;
    textContainer.style.textAlign = layout.text.textAlign;
    
    const newFontSize = 50 * scale;
    const newLineHeight = 1.96;
    cardText.style.fontSize = newFontSize + 'px';
    cardText.style.lineHeight = newLineHeight + 'em';
    
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

// --- 初期化処理 ---
if (designButtons.length > 0) {
    designButtons[0].classList.add("active");
}
if (imageButtons.length > 0) {
    imageButtons[0].classList.add("active");
}

updateTemplate();
window.addEventListener('resize', updateTemplate);
