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

// --- 変数 ---
let selectedDesign = "1";
let selectedType = "text";
const DESIGN_SIZE = 1200;

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
    // キャプチャ用要素を生成
    const captureElement = cardPreview.cloneNode(true);
    captureElement.id = 'capturePreview';
    captureElement.classList.add(`${selectedType}-layout`); // CSSクラスをコピー

    // キャプチャ用要素のサイズを固定
    captureElement.style.width = `${DESIGN_SIZE}px`;
    captureElement.style.height = `${DESIGN_SIZE}px`;

    // 背景画像をフルサイズで設定
    const captureBackground = captureElement.querySelector('#cardBackground');
    captureBackground.src = `images/background${selectedDesign}-${selectedType}.png`;

    // テキストと画像コンテナのスタイルをダウンロードサイズに調整
    const captureTextContainer = captureElement.querySelector('#textContainer');
    const captureImageContainer = captureElement.querySelector('#imageContainer');
    const captureCardText = captureElement.querySelector('#cardText');

    // テキストの位置とサイズを絶対値で設定
    const textLayout = selectedType === 'text' ?
        { top: 205, left: 170, width: 860, height: 790 } :
        { top: 720, left: 170, width: 860, height: 300 };

    captureTextContainer.style.top = `${textLayout.top}px`;
    captureTextContainer.style.left = `${textLayout.left}px`;
    captureTextContainer.style.width = `${textLayout.width}px`;
    captureTextContainer.style.height = `${textLayout.height}px`;
    captureCardText.style.fontSize = '50px';

    // 画像コンテナの位置とサイズを絶対値で設定
    if (selectedType === 'img') {
        const imageLayout = { top: 220, left: 170, width: 860, height: 460 };
        captureImageContainer.style.display = 'flex';
        captureImageContainer.style.top = `${imageLayout.top}px`;
        captureImageContainer.style.left = `${imageLayout.left}px`;
        captureImageContainer.style.width = `${imageLayout.width}px`;
        captureImageContainer.style.height = `${imageLayout.height}px`;
    } else {
        captureImageContainer.style.display = 'none';
    }

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
        
        captureContainer.removeChild(captureElement);
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

    // 画像とテキストの切り替えに合わせてクラスを追加
    cardPreview.classList.remove('text-layout', 'img-layout');
    cardPreview.classList.add(`${selectedType}-layout`);

    // 画像あり/なしに応じて画像コンテナの表示を切り替え
    if (selectedType === 'img') {
        imageContainer.style.display = 'flex';
        imageContainer.style.border = '2px dashed #ccc';
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
