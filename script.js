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

// テキスト位置を4pxから100pxに調整
const TOP_OFFSET_PX = 100;

// すべてのレイアウトをpx単位で定義
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

downloadBtn.addEventListener("click", () => {
    // キャプチャ用コンテナの準備
    captureContainer.style.width = `${DESIGN_SIZE}px`;
    captureContainer.style.height = `${DESIGN_SIZE}px`;

    // プレビューのHTMLをキャプチャ用コンテナに複製
    const previewClone = cardPreview.cloneNode(true);
    previewClone.id = 'capturePreview';
    previewClone.style.width = '100%';
    previewClone.style.height = '100%';
    previewClone.style.border = 'none';

    // クローンされた要素内のスタイルを1200px基準に修正
    const cloneCardBackground = previewClone.querySelector('#cardBackground');
    cloneCardBackground.src = cardBackground.src;
    
    const cloneTextContainer = previewClone.querySelector('#textContainer');
    const layout = layouts[`images/background${selectedDesign}-${selectedType}.png`];

    // 1200px基準の絶対位置を直接適用
    cloneTextContainer.style.top = `${layout.text.top}px`;
    cloneTextContainer.style.left = `${layout.text.left}px`;
    cloneTextContainer.style.width = `${layout.text.width}px`;
    cloneTextContainer.style.height = `${layout.text.height}px`;
    cloneTextContainer.style.textAlign = layout.text.textAlign;
    // transformを適用
    cloneTextContainer.style.transform = `translateY(-${TOP_OFFSET_PX}px)`;

    const cloneCardText = previewClone.querySelector('#cardText');
    cloneCardText.textContent = diaryInput.value;
    cloneCardText.style.fontSize = '50px';
    cloneCardText.style.lineHeight = '98px';

    const cloneImageContainer = previewClone.querySelector('#imageContainer');
    if (layout.image.display === 'flex') {
        cloneImageContainer.style.top = `${layout.image.top}px`;
        cloneImageContainer.style.left = `${layout.image.left}px`;
        cloneImageContainer.style.width = `${layout.image.width}px`;
        cloneImageContainer.style.height = `${layout.image.height}px`;
        cloneImageContainer.style.display = 'flex';
        cloneImageContainer.style.border = 'none';

        if (imageContainer.querySelector('img')) {
            const img = imageContainer.querySelector('img').cloneNode();
            cloneImageContainer.innerHTML = '';
            cloneImageContainer.appendChild(img);
        } else {
            cloneImageContainer.innerHTML = '';
        }
    } else {
        cloneImageContainer.style.display = 'none';
    }

    captureContainer.innerHTML = '';
    captureContainer.appendChild(previewClone);

    // html2canvasを非表示のコンテナに対して実行
    html2canvas(captureContainer, { 
        useCORS: true, 
        scale: 1
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
    
    // プレビュー画面の幅を取得
    const previewWidth = cardPreview.offsetWidth;
    
    // px単位での位置とサイズを計算し、プレビューに適用
    textContainer.style.top = `${(layout.text.top / DESIGN_SIZE) * 100}%`;
    textContainer.style.left = `${(layout.text.left / DESIGN_SIZE) * 100}%`;
    textContainer.style.width = `${(layout.text.width / DESIGN_SIZE) * 100}%`;
    textContainer.style.height = `${(layout.text.height / DESIGN_SIZE) * 100}%`;
    textContainer.style.textAlign = layout.text.textAlign;
    
    // transformを適用
    textContainer.style.transform = `translateY(-${(TOP_OFFSET_PX / DESIGN_SIZE) * 100}%)`;
    
    // プレビュー画面の幅に合わせてフォントサイズと行間を再計算
    const newFontSize = (50 / DESIGN_SIZE) * previewWidth;
    const newLineHeight = (98 / 50);
    
    cardText.style.fontSize = newFontSize + 'px';
    cardText.style.lineHeight = newLineHeight + 'em';
    
    // 画像コンテナの位置も同様に計算
    if (selectedType === 'img') {
        imageContainer.style.display = 'flex';
        imageContainer.style.border = layout.image.border;
        imageContainer.style.top = `${(layout.image.top / DESIGN_SIZE) * 100}%`;
        imageContainer.style.left = `${(layout.image.left / DESIGN_SIZE) * 100}%`;
        imageContainer.style.width = `${(layout.image.width / DESIGN_SIZE) * 100}%`;
        imageContainer.style.height = `${(layout.image.height / DESIGN_SIZE) * 100}%`;
        
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
