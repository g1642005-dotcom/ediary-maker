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
// 1200px基準のデザインサイズ
const DESIGN_SIZE = 1200;

// テキスト位置を4px上に調整
const TOP_OFFSET_PX = 4;

// テキストのみテンプレートの座標
const TEXT_ONLY_TOP = ((200 - TOP_OFFSET_PX) / DESIGN_SIZE) * 100 + '%';
const TEXT_ONLY_LEFT = (170 / DESIGN_SIZE) * 100 + '%';
const TEXT_ONLY_WIDTH = (860 / DESIGN_SIZE) * 100 + '%';
const TEXT_ONLY_HEIGHT = (790 / DESIGN_SIZE) * 100 + '%';

// 画像ありテンプレートの座標
const IMAGE_TOP = (220 / DESIGN_SIZE) * 100 + '%';
const IMAGE_LEFT = (170 / DESIGN_SIZE) * 100 + '%';
const IMAGE_WIDTH = (860 / DESIGN_SIZE) * 100 + '%';
const IMAGE_HEIGHT = (460 / DESIGN_SIZE) * 100 + '%';

const TEXT_WITH_IMAGE_TOP = ((720 - TOP_OFFSET_PX) / DESIGN_SIZE) * 100 + '%';
const TEXT_WITH_IMAGE_LEFT = (170 / DESIGN_SIZE) * 100 + '%';
const TEXT_WITH_IMAGE_WIDTH = (860 / DESIGN_SIZE) * 100 + '%';
const TEXT_WITH_IMAGE_HEIGHT = (300 / DESIGN_SIZE) * 100 + '%';

const layouts = {
    "images/background1-text.png": {
        text: { top: TEXT_ONLY_TOP, left: TEXT_ONLY_LEFT, width: TEXT_ONLY_WIDTH, height: TEXT_ONLY_HEIGHT, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background2-text.png": {
        text: { top: TEXT_ONLY_TOP, left: TEXT_ONLY_LEFT, width: TEXT_ONLY_WIDTH, height: TEXT_ONLY_HEIGHT, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background3-text.png": {
        text: { top: TEXT_ONLY_TOP, left: TEXT_ONLY_LEFT, width: TEXT_ONLY_WIDTH, height: TEXT_ONLY_HEIGHT, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background4-text.png": {
        text: { top: TEXT_ONLY_TOP, left: TEXT_ONLY_LEFT, width: TEXT_ONLY_WIDTH, height: TEXT_ONLY_HEIGHT, textAlign: 'left' },
        image: { display: 'none' }
    },
    "images/background1-img.png": {
        text: { top: TEXT_WITH_IMAGE_TOP, left: TEXT_WITH_IMAGE_LEFT, width: TEXT_WITH_IMAGE_WIDTH, height: TEXT_WITH_IMAGE_HEIGHT, textAlign: 'left' },
        image: { display: 'flex', top: IMAGE_TOP, left: IMAGE_LEFT, width: IMAGE_WIDTH, height: IMAGE_HEIGHT, border: '2px dashed #49a67c' }
    },
    "images/background2-img.png": {
        text: { top: TEXT_WITH_IMAGE_TOP, left: TEXT_WITH_IMAGE_LEFT, width: TEXT_WITH_IMAGE_WIDTH, height: TEXT_WITH_IMAGE_HEIGHT, textAlign: 'left' },
        image: { display: 'flex', top: IMAGE_TOP, left: IMAGE_LEFT, width: IMAGE_WIDTH, height: IMAGE_HEIGHT, border: '2px dashed #49a67c' }
    },
    "images/background3-img.png": {
        text: { top: TEXT_WITH_IMAGE_TOP, left: TEXT_WITH_IMAGE_LEFT, width: TEXT_WITH_IMAGE_WIDTH, height: TEXT_WITH_IMAGE_HEIGHT, textAlign: 'left' },
        image: { display: 'flex', top: IMAGE_TOP, left: IMAGE_LEFT, width: IMAGE_WIDTH, height: IMAGE_HEIGHT, border: '2px dashed #49a67c' }
    },
    "images/background4-img.png": {
        text: { top: TEXT_WITH_IMAGE_TOP, left: TEXT_WITH_IMAGE_LEFT, width: TEXT_WITH_IMAGE_WIDTH, height: TEXT_WITH_IMAGE_HEIGHT, textAlign: 'left' },
        image: { display: 'flex', top: IMAGE_TOP, left: IMAGE_LEFT, width: IMAGE_WIDTH, height: IMAGE_HEIGHT, border: '2px dashed #49a67c' }
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

downloadBtn.addEventListener("click", () => {
    // キャプチャ用コンテナの準備
    captureContainer.style.width = `${DESIGN_SIZE}px`;
    captureContainer.style.height = `${DESIGN_SIZE}px`;

    // プレビューのHTMLをキャプチャ用コンテナに複製
    const previewClone = cardPreview.cloneNode(true);
    // クローンされた要素内のスタイルを1200px基準に修正
    const cloneCardBackground = previewClone.querySelector('#cardBackground');
    cloneCardBackground.src = cardBackground.src;
    
    const cloneTextContainer = previewClone.querySelector('#textContainer');
    Object.assign(cloneTextContainer.style, layouts[`images/background${selectedDesign}-${selectedType}.png`].text);
    cloneTextContainer.style.top = `calc(${cloneTextContainer.style.top} - ${TOP_OFFSET_PX}px)`;

    const cloneCardText = previewClone.querySelector('#cardText');
    cloneCardText.textContent = diaryInput.value;
    cloneCardText.style.fontSize = '50px';
    cloneCardText.style.lineHeight = '98px';
    
    // 画像コンテナのスタイルと内容をコピー
    const cloneImageContainer = previewClone.querySelector('#imageContainer');
    Object.assign(cloneImageContainer.style, layouts[`images/background${selectedDesign}-${selectedType}.png`].image);
    cloneImageContainer.style.border = 'none';
    if (imageContainer.querySelector('img')) {
        const img = imageContainer.querySelector('img').cloneNode();
        cloneImageContainer.innerHTML = '';
        cloneImageContainer.appendChild(img);
    } else {
        cloneImageContainer.innerHTML = '';
    }

    captureContainer.innerHTML = '';
    captureContainer.appendChild(previewClone);

    // html2canvasを非表示のコンテナに対して実行
    html2canvas(captureContainer, { 
        useCORS: true, 
        scale: 1,
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        
        // キャプチャ用コンテナをクリーンアップ
        captureContainer.innerHTML = '';
        captureContainer.style.width = '';
        captureContainer.style.height = '';
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
    const layout = layouts[templateFileName];
    
    // 画像コンテナの表示/非表示を切り替え
    imageContainer.style.display = layout.image.display;
    imageContainer.style.border = layout.image.border;

    if (selectedType === "img") {
        if (!imageContainer.querySelector('img')) {
            imageContainer.innerHTML = `<span class="image-placeholder-text">クリックで画像をアップロード</span>`;
        }
    } else {
        imageContainer.innerHTML = '';
    }
    
    Object.assign(textContainer.style, layout.text);
    Object.assign(imageContainer.style, layout.image);
    
    const previewWidth = cardPreview.offsetWidth;
    const newFontSize = (50 / DESIGN_SIZE) * previewWidth;
    const newLineHeight = (98 / 50);
    
    cardText.style.fontSize = newFontSize + 'px';
    cardText.style.lineHeight = newLineHeight + 'em';
}

// --- 初期化処理 ---
if (designButtons.length > 0) {
    designButtons[0].classList.add("active");
}
if (imageButtons.length > 0) {
    imageButtons[0].classList.add("active");
}
updateTemplate();
