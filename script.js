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
const wordCountMessage = document.getElementById("wordCountMessage");
const lineCountMessage = document.getElementById("lineCountMessage");

// --- 変数 ---
let selectedDesign = "1";
let selectedType = "text";

// --- レイアウト設定 ---
const DESIGN_SIZE = 1200;

// --- イベントリスナー ---
diaryInput.addEventListener("input", () => {
    let inputText = diaryInput.value;
    let lines = inputText.split('\n');
    let maxLines = 0;
    let maxCharsPerLine = 17;
    
    if (selectedType === 'text') {
        maxLines = 8;
    } else if (selectedType === 'img') {
        maxLines = 3;
    }

    // 行数制限
    if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        inputText = lines.join('\n');
    }

    // 各行の文字数制限
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > maxCharsPerLine) {
            lines[i] = lines[i].substring(0, maxCharsPerLine);
        }
    }
    
    // 最終的なテキストをinputとプレビューに反映
    const final_text = lines.join('\n');
    diaryInput.value = final_text;
    cardText.textContent = final_text;

    // 警告メッセージを非表示にする（自動で調整されるため）
    wordCountMessage.textContent = '';
    lineCountMessage.textContent = '';
});

designButtons.forEach(button => {
    button.addEventListener("click", () => {
        designButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedDesign = button.getAttribute("data-design");
        diaryInput.value = '';
        cardText.textContent = '';
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
        updateTemplate();
    });
});

downloadBtn.addEventListener("click", async () => {
    const originalStyle = {
        width: cardPreview.style.width,
        height: cardPreview.style.height,
    };
    
    // キャプチャ用に一時的にスタイルを変更
    cardPreview.style.width = '1200px';
    cardPreview.style.height = '1200px';

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
        
        // 元のスタイルに戻す
        cardPreview.style.width = originalStyle.width;
        cardPreview.style.height = originalStyle.height;
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
        cardPreview.classList.add('img-layout');
        cardPreview.classList.remove('text-layout');
    } else {
        cardPreview.classList.add('text-layout');
        cardPreview.classList.remove('img-layout');
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
