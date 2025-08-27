// --- script.jsの修正箇所 ---

// ... 前略 ...

downloadBtn.addEventListener("click", () => {
    // 一時的にフォントサイズと行間を絶対値に設定
    const originalFontSize = cardText.style.fontSize;
    const originalLineHeight = cardText.style.lineHeight;

    cardText.style.fontSize = '50px';
    cardText.style.lineHeight = '98px';

    cardPreview.style.border = 'none';
    imageContainer.style.border = 'none';
    if (imagePlaceholderText) {
        imagePlaceholderText.style.display = 'none';
    }
    
    // html2canvasにスケールオプションを追加
    html2canvas(cardPreview, { 
        useCORS: true, 
        scale: 1
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
        
        // 元のスタイルに戻す
        cardText.style.fontSize = originalFontSize;
        cardText.style.lineHeight = originalLineHeight;

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

// ... 後略 ...
