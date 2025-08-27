const diaryInput = document.getElementById("diaryInput");
const cardText = document.getElementById("cardText");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const cardBackground = document.getElementById("cardBackground");
const cardPreview = document.getElementById("cardPreview");
const textContainer = document.getElementById("textContainer");
const imageContainer = document.getElementById("imageContainer");
const templateIcons = document.querySelectorAll(".template-icon");

// テキストをプレビューに反映
generateBtn.addEventListener("click", () => {
    cardText.textContent = diaryInput.value;
});

// PNGとして保存
downloadBtn.addEventListener("click", () => {
    cardPreview.style.border = 'none';
    imageContainer.style.border = 'none';

    html2canvas(cardPreview, { useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();
        
        setTimeout(() => {
            cardPreview.style.border = '1px solid #ddd';
            imageContainer.style.border = '2px dashed #49a67c';
        }, 300);
    });
});

// テンプレート切り替え
templateIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const bgImage = icon.getAttribute("data-bg");
        cardBackground.src = bgImage;

        templateIcons.forEach(i => i.classList.remove("active"));
        icon.classList.add("active");

        // テキストと画像のコンテナを初期化
        textContainer.style.top = '0';
        textContainer.style.left = '0';
        textContainer.style.width = '100%';
        textContainer.style.height = '100%';
        imageContainer.style.display = 'none';

        if (bgImage.includes("-img.png")) {
            imageContainer.style.display = 'block';

            // 各テンプレートに合わせた位置調整
            switch (bgImage) {
                case "images/background1-img.png":
                    textContainer.style.top = '50%';
                    textContainer.style.left = '5%';
                    textContainer.style.width = '45%';
                    textContainer.style.height = '40%';
                    imageContainer.style.top = '10%';
                    imageContainer.style.left = '55%';
                    imageContainer.style.width = '40%';
                    imageContainer.style.height = '40%';
                    break;
                case "images/background2-img.png":
                    textContainer.style.top = '55%';
                    textContainer.style.left = '10%';
                    textContainer.style.width = '80%';
                    textContainer.style.height = '35%';
                    imageContainer.style.top = '10%';
                    imageContainer.style.left = '10%';
                    imageContainer.style.width = '80%';
                    imageContainer.style.height = '40%';
                    break;
                case "images/background3-img.png":
                    textContainer.style.top = '55%';
                    textContainer.style.left = '10%';
                    textContainer.style.width = '80%';
                    textContainer.style.height = '35%';
                    imageContainer.style.top = '10%';
                    imageContainer.style.left = '10%';
                    imageContainer.style.width = '80%';
                    imageContainer.style.height = '40%';
                    break;
                case "images/background4-img.png":
                    textContainer.style.top = '40%';
                    textContainer.style.left = '5%';
                    textContainer.style.width = '45%';
                    textContainer.style.height = '50%';
                    imageContainer.style.top = '5%';
                    imageContainer.style.left = '50%';
                    imageContainer.style.width = '45%';
                    imageContainer.style.height = '30%';
                    break;
                default:
                    // デフォルトの配置（textのみ）
                    textContainer.style.top = '20%';
                    textContainer.style.left = '10%';
                    textContainer.style.width = '80%';
                    textContainer.style.height = '60%';
                    break;
            }
        }
    });
});

// 最初のテンプレートをアクティブにする
if (templateIcons.length > 0) {
    templateIcons[0].classList.add("active");
}
