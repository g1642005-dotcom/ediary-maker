// --- 要素の取得 ---
const diaryInput = document.getElementById("diaryInput");
const cardText = document.getElementById("cardText");
const downloadBtn = document.getElementById("downloadBtn");
const cardBackground = document.getElementById("cardBackground");
const cardPreview = document.getElementById("cardPreview");
const textContainer = document.getElementById("textContainer");
const imageContainer = document.getElementById("imageContainer");
const templateIcons = document.querySelectorAll(".template-icon");
const imageUpload = document.getElementById("imageUpload"); // HTMLで追加した要素を取得

// --- レイアウト設定 ---
// 各テンプレートのテキストと画像の位置をオブジェクトとして管理
const layouts = {
    "default-text": { // textのみのテンプレートの共通設定
        text: { top: '20%', left: '10%', width: '80%', height: '60%' },
        image: { display: 'none' }
    },
    "images/background1-img.png": {
        text: { top: '50%', left: '5%', width: '45%', height: '40%' },
        image: { display: 'block', top: '10%', left: '55%', width: '40%', height: '40%', border: '2px dashed #49a67c' }
    },
    "images/background2-img.png": {
        text: { top: '55%', left: '10%', width: '80%', height: '35%' },
        image: { display: 'block', top: '10%', left: '10%', width: '80%', height: '40%', border: '2px dashed #49a67c' }
    },
    "images/background3-img.png": {
        text: { top: '55%', left: '10%', width: '80%', height: '35%' },
        image: { display: 'block', top: '10%', left: '10%', width: '80%', height: '40%', border: '2px dashed #49a67c' }
    },
    "images/background4-img.png": {
        text: { top: '40%', left: '5%', width: '45%', height: '50%' },
        image: { display: 'block', top: '5%', left: '50%', width: '45%', height: '30%', border: '2px dashed #49a67c' }
    }
};


// --- イベントリスナーの設定 ---

// 【② リアルタイムプレビュー】テキスト入力を即座にプレビューに反映
diaryInput.addEventListener("input", () => {
    cardText.textContent = diaryInput.value;
});


// 【PNGとして保存】
downloadBtn.addEventListener("click", () => {
    // 保存時に枠線を一時的に消す
    cardPreview.style.border = 'none';
    imageContainer.style.border = 'none'; // 画像エリアの枠線も消す

    html2canvas(cardPreview, { useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ediary.png";
        link.href = canvas.toDataURL();
        link.click();
        
        // 少し待ってから枠線を元に戻す
        setTimeout(() => {
            cardPreview.style.border = '1px solid #ddd';
            // 現在のテンプレートが画像付きの場合のみ、枠線を戻す
            if (imageContainer.style.display === 'block') {
                imageContainer.style.border = '2px dashed #49a67c';
            }
        }, 300);
    });
});


// 【③ テンプレート切り替え（リファクタリング版）】
templateIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const bgImage = icon.getAttribute("data-bg");
        cardBackground.src = bgImage;

        // すべてのアイコンから active クラスを削除
        templateIcons.forEach(i => i.classList.remove("active"));
        // クリックされたアイコンに active クラスを追加
        icon.classList.add("active");

        // レイアウト情報を取得
        let layout;
        if (bgImage.includes("-img.png")) {
            // "img" が含まれる場合は、対応するレイアウトを使用
            layout = layouts[bgImage];
        } else {
            // "text" のみの場合は、共通のデフォルトレイアウトを使用
            layout = layouts["default-text"];
        }
        
        // スタイルを適用
        Object.assign(textContainer.style, layout.text);
        Object.assign(imageContainer.style, layout.image);
    });
});


// 【① 画像アップロード機能】
// 画像コンテナをクリックしたら、ファイル選択ダイアログを開く
imageContainer.addEventListener("click", () => {
    imageUpload.click();
});

// ファイルが選択されたら、プレビューに表示する
imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // 既存の画像を削除してから新しい画像を追加
            imageContainer.innerHTML = ''; 
            const img = document.createElement('img');
            img.src = e.target.result;
            imageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});


// --- 初期化処理 ---

// ページ読み込み時に最初のテンプレートをアクティブにする
if (templateIcons.length > 0) {
    templateIcons[0].click(); // click() を実行して初期レイアウトも適用する
}
