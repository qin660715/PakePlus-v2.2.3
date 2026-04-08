window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 注入 PakePlus 的脚本文件
document.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;

    const url = link.href;
    // 匹配常见安装包后缀
    if (/\.(exe|msi|dmg|pkg|apk|ipa|deb|rpm)$/i.test(url)) {
        e.preventDefault();

        // 确保 Tauri API 可用
        const { shell } = window.__TAURI__;
        if (shell && shell.open) {
            // 直接调用系统打开文件或 URL
            await shell.open(url);
            console.log(`正在打开: ${url}`);
        } else {
            window.open(url, '_blank');
        }
    }
});