const diaryInput = document.getElementById('diaryInput');
const generateBtn = document.getElementById('generateBtn');
const cardText = document.getElementById('cardText');
const downloadBtn = document.getElementById('downloadBtn');
const cardPreview = document.getElementById('cardPreview');

// カード生成
generateBtn.addEventListener('click', () => {
    cardText.textContent = diaryInput.value;
});

// PNGダウンロード
downloadBtn.addEventListener('click', () => {
    html2canvas(cardPreview, {useCORS: true}).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ediary.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
