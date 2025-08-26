const diaryInput = document.getElementById("diaryInput");
const cardText = document.getElementById("cardText");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const cardBackground = document.getElementById("cardBackground");
const templateIcons = document.querySelectorAll(".template-icon");

// テキストをプレビューに反映
generateBtn.addEventListener("click", () => {
    cardText.textContent = diaryInput.value;
});

// PNGとして保存
downloadBtn.addEventListener("click", () => {
    html2canvas(document.getElementById("cardPreview"), { useCORS: true }).then(canvas => {
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

        // アイコンの選択状態を更新
        templateIcons.forEach(i => i.classList.remove("active"));
        icon.classList.add("active");
    });
});

// 最初のテンプレートをアクティブにする（任意）
if (templateIcons.length > 0) {
    templateIcons[0].classList.add("active");
}
