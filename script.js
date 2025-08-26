const diaryInput = document.getElementById("diaryInput");
const cardText = document.getElementById("cardText");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", () => {
    cardText.textContent = diaryInput.value;
});

downloadBtn.addEventListener("click", () => {
    // プレビューエリア全体をキャプチャ対象にする
    html2canvas(document.getElementById("cardPreview"), { useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});
