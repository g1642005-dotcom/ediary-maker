document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('titleInput');
    const dateInput = document.getElementById('dateInput');
    const memoInput = document.getElementById('memoInput');
    const cardTitle = document.getElementById('cardTitle');
    const cardDate = document.getElementById('cardDate');
    const cardMemo = document.getElementById('cardMemo');
    const cardPreview = document.getElementById('cardPreview');
    const characterElement = document.getElementById('character');
    const downloadBtn = document.getElementById('downloadBtn');
    const charIcons = document.querySelectorAll('.char-icon');

    // テキスト入力のリアルタイム反映
    titleInput.addEventListener('input', () => {
        cardTitle.textContent = titleInput.value || 'タイトル';
    });
    dateInput.addEventListener('input', () => {
        cardDate.textContent = dateInput.value || '日付';
    });
    memoInput.addEventListener('input', () => {
        cardMemo.textContent = memoInput.value || '一言メモ';
    });

    // キャラクターの選択と配置
    let selectedChar = null;
    charIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // 既存の選択状態をリセット
            charIcons.forEach(i => i.classList.remove('selected'));
            // 新しいキャラクターを選択
            icon.classList.add('selected');
            selectedChar = icon.src;
            characterElement.style.backgroundImage = `url(${selectedChar})`;
            characterElement.style.display = 'block';
        });
    });

    // キャラクターのドラッグ＆ドロップ機能
    let isDragging = false;
    let offsetX, offsetY;
    characterElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - characterElement.getBoundingClientRect().left;
        offsetY = e.clientY - characterElement.getBoundingClientRect().top;
        characterElement.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const parentRect = cardPreview.getBoundingClientRect();
        let newX = e.clientX - offsetX - parentRect.left;
        let newY = e.clientY - offsetY - parentRect.top;

        // 親要素の範囲内に制限
        newX = Math.max(0, Math.min(newX, parentRect.width - characterElement.offsetWidth));
        newY = Math.max(0, Math.min(newY, parentRect.height - characterElement.offsetHeight));

        characterElement.style.left = `${newX}px`;
        characterElement.style.top = `${newY}px`;
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        characterElement.style.cursor = 'grab';
    });

    // PNGダウンロード機能（プレビューエリア全体をキャプチャ）
    downloadBtn.addEventListener('click', () => {
        // html2canvasを実行する前に、キャラクター要素のz-indexを上げて、テキストより前面に来るようにする
        characterElement.style.zIndex = '5';
        
        // html2canvasを実行
        html2canvas(cardPreview, { useCORS: true }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'ediary.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // ダウンロード後にz-indexを元に戻す
            characterElement.style.zIndex = '3';
        });
    });
});
