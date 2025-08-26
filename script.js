const diaryInput = document.getElementById("diaryInput");
const cardText = document.getElementById("cardText");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const cardBackground = document.getElementById("cardBackground");
const cardPreview = document.getElementById("cardPreview");
const templateIcons = document.querySelectorAll(".template-icon");

// テキストをプレビューに反映
generateBtn.addEventListener("click", () => {
    cardText.textContent = diaryInput.value;
});

// PNGとして保存
downloadBtn.addEventListener("click", () => {
    // ダウンロード前にプレビューの枠線を一時的に消す
    cardPreview.style.border = 'none';

    html2canvas(cardPreview, { useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();

        // ダウンロード後にプレビューの枠線を戻す
        setTimeout(() => {
            cardPreview.style.border = '1px solid #ddd';
        }, 300);
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

// 最初のテンプレートをアクティブにする
if (templateIcons.length > 0) {
    templateIcons[0].classList.add("active");
}
