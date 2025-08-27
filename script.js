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

// テキスト位置を8px上に調整
const TOP_OFFSET_PX = 8; 

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
    // キャプチャ用の要素を動的に作成
    const captureElement = document.createElement('div');
    captureElement.id = 'capturePreview';
    captureElement.style.width = `${DESIGN_SIZE}px`;
    captureElement.style.height = `${DESIGN_SIZE}px`;
    captureElement.style.position = 'relative';
    captureElement.style.overflow = 'hidden';

    // 背景画像をコピー
    const captureBackground = document.createElement('img');
    captureBackground.src = cardBackground.src;
    captureBackground.style.position = 'absolute';
    captureBackground.style.width = '100%';
    captureBackground.style.height = '100%';
    captureBackground.style.objectFit = 'contain';
    captureElement.appendChild(captureBackground);
    
    // テキストコンテナをコピーし、1200px基準のスタイルを適用
    const captureTextContainer = document.createElement('div');
    const textLayout = layouts[`images/background${selectedDesign}-${selectedType}.png`].text;
    captureTextContainer.style.position = 'absolute';
    captureTextContainer.style.top = (selectedType === 'img' ? 720 : 200) - TOP_OFFSET_PX + 'px';
    captureTextContainer.style.left = '170px';
    captureTextContainer.style.width = '860px';
    captureTextContainer.style.height = '300px';
    captureTextContainer.style.fontFamily = `'Noto Sans JP', sans-serif`;
    captureTextContainer.style.fontWeight = '700';
    captureTextContainer.style.fontSize = '50px';
    captureTextContainer.style.lineHeight = '98px';
    captureTextContainer.style.whiteSpace = 'pre-wrap';
    captureTextContainer.style.textAlign = 'left';
    captureTextContainer.textContent = diaryInput.value;
    captureElement.appendChild(captureTextContainer);

    // 画像コンテナをコピーし、1200px基準のスタイルを適用
    const captureImageContainer = document.createElement('div');
    const imageLayout = layouts[`images/background${selectedDesign}-${selectedType}.png`].image;
    if (imageLayout.display !== 'none') {
        captureImageContainer.style.position = 'absolute';
        captureImageContainer.style.top = '220px';
        captureImageContainer.style.left = '170px';
        captureImageContainer.style.width = '860px';
        captureImageContainer.style.height = '460px';
        if (imageContainer.querySelector('img')) {
            const img = imageContainer.querySelector('img').cloneNode();
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            captureImageContainer.appendChild(img);
        }
        captureElement.appendChild(captureImageContainer);
    }

    // 作成した要素を一時的にbodyに追加
    document.body.appendChild(captureElement);

    html2canvas(captureElement, {
        useCORS: true, 
        width: DESIGN_SIZE, 
        height: DESIGN_SIZE,
        scale: 1,
        removeContainer: true
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        
        // キャプチャ用要素をbodyから削除
        document.body.removeChild(captureElement);
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
