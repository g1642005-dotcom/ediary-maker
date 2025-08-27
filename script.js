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
    html2canvas(cardPreview).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// テンプレート切り替え
templateIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const bgImage = icon.getAttribute("data-bg");
        cardBackground.src = bgImage;

        templateIcons.forEach(i => i.classList.remove("active"));
        icon.classList.add("active");
    });
});
