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

// --- レイアウト設定（座標を元に再計算） ---
// テキストのみテンプレートの座標
const TEXT_ONLY_TOP = (200 / 1200) * 100 + '%';
const TEXT_ONLY_LEFT = (170 / 1200) * 100 + '%';
const TEXT_ONLY_WIDTH = (860 / 1200) * 100 + '%';
const TEXT_ONLY_HEIGHT = (790 / 1200) * 100 + '%';

// 画像ありテンプレートの座標
const IMAGE_TOP = (220 / 1200) * 100 + '%';
const IMAGE_LEFT = (170 / 1200) * 100 + '%';
const IMAGE_WIDTH = (860 / 1200) * 100 + '%';
const IMAGE_HEIGHT = (460 / 1200) * 100 + '%';

const TEXT_WITH_IMAGE_TOP = (720 / 1200) * 100 + '%';
const TEXT_WITH_IMAGE_LEFT = (170 / 1200) * 100 + '%';
const TEXT_WITH_IMAGE_WIDTH = (860 / 1200) * 100 + '%';
const TEXT_WITH_IMAGE_HEIGHT = (300 / 1200) * 100 + '%';

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
    cardPreview.style.border = 'none';
    imageContainer.style.border = 'none';
    if (imagePlaceholderText) {
        imagePlaceholderText.style.display = 'none';
    }
    
    html2canvas(cardPreview, { useCORS: true, width: 1200, height: 1200 }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();
        
        setTimeout(() => {
            cardPreview.style.border = '1px solid #ddd';
            if (imageContainer.style.display === 'flex') {
                imageContainer.style.border = '2px dashed #49a67c';
                if (imageContainer.querySelector('img') === null && imagePlaceholderText) {
                    imagePlaceholderText.style.display = 'block';
                }
            }
        }, 300);
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

    if (selectedType === "img") {
        if (!imageContainer.querySelector('img')) {
            imageContainer.innerHTML = `<span class="image-placeholder-text">クリックで画像をアップロード</span>`;
        }
    } else {
        imageContainer.innerHTML = '';
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
