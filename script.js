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
const PREVIEW_TOP_OFFSET_PX = 30;
// 書き出し用オフセット
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
    let lines = diaryInput.value.split('\n');
    let newText = '';
    let truncated = false;
    
    let maxLines = 0;
    let maxCharsPerLine = 0;
    
    // 💡 選択されたタイプに基づいて文字数・行数制限を動的に変更
    if (selectedType === 'text') {
        maxLines = 8;
        maxCharsPerLine = 17;
    } else if (selectedType === 'img') {
        maxLines = 3;
        maxCharsPerLine = 17;
    }

    // 行数制限
    if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        truncated = true;
    }
    
    // 文字数制限
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > maxCharsPerLine) {
            lines[i] = lines[i].substring(0, maxCharsPerLine);
            truncated = true;
        }
    }
    
    newText = lines.join('\n');
    
    if (truncated) {
        // 制限を超えた場合、入力を修正
        diaryInput.value = newText;
        // 警告メッセージ（任意）
        console.warn(`入力できるのは1行${maxCharsPerLine}文字、${maxLines}行までです。`);
    }
    
    cardText.textContent = newText;
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
    
    // 現在のプレビューのテキスト位置を保存
    const originalTextTop = textContainer.style.top;
    
    // キャプチャ用に一時的にスタイルを変更し、位置情報を統一
    cardPreview.style.width = `${DESIGN_SIZE}px`;
    cardPreview.style.height = `${DESIGN_SIZE}px`;
    cardPreview.style.position = 'fixed';
    cardPreview.style.top = '0';
    cardPreview.style.left = '0';

    // ✨ 追加: キャプチャ直前にプレビュー画面を非表示にする
    cardPreview.style.opacity = '0';
    
    // 書き出し用オフセットを適用
    const layout = layouts[`images/background${selectedDesign}-${selectedType}.png`];
    textContainer.style.top = `${layout.text.top - DOWNLOAD_TOP_OFFSET_PX}px`;
    cardText.style.fontSize = '50px';
    cardText.style.lineHeight = '1.96em';
    
    await document.fonts.ready;
    
    html2canvas(cardPreview, {
        useCORS: true,
        scale: 1,
        // テキストのブレをなくすための設定
        allowTaint: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        
        // 元のスタイルとテキスト位置に戻す
        cardPreview.style.width = originalStyle.width;
        cardPreview.style.height = originalStyle.height;
        cardPreview.style.position = originalStyle.position;
        cardPreview.style.top = '';
        cardPreview.style.left = '';
        textContainer.style.top = originalTextTop; // ここでプレビューの元の位置に戻す
        
        // ✨ 追加: 処理後にプレビュー画面を再表示する
        cardPreview.style.opacity = '1';

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
    
    // プレビューのサイズ、または書き出し用の固定サイズを取得
    const currentWidth = cardPreview.offsetWidth;
    
    const layout = layouts[templateFileName];
    const scale = currentWidth / DESIGN_SIZE;
    
    // テキストコンテナの位置とサイズ
    textContainer.style.top = `${(layout.text.top - PREVIEW_TOP_OFFSET_PX) * scale}px`;
    textContainer.style.left = `${layout.text.left * scale}px`;
    textContainer.style.width = `${layout.text.width * scale}px`;
    textContainer.style.height = `${layout.text.height * scale}px`;
    textContainer.style.textAlign = layout.text.textAlign;
    
    // フォントサイズと行間を同じ比率で計算
    const newFontSize = 50 * scale;
    const newLineHeight = 1.96; // 98px / 50px = 1.96
    cardText.style.fontSize = newFontSize + 'px';
    cardText.style.lineHeight = newLineHeight + 'em';
    
    // 画像コンテナの位置とサイズ
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
