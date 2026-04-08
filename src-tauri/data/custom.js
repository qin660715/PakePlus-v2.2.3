window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
// PakePlus 论坛下载+跳转修复脚本（内联版，直接生效）
document.addEventListener('DOMContentLoaded', function() {
  // 劫持所有链接点击
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const url = link.href.trim();
    // 过滤无效javascript伪协议
    if (url.startsWith('javascript:')) return;

    // 识别下载链接（适配论坛附件、EA、压缩包）
    const isDownload = link.hasAttribute('download') 
      || url.includes('/attachment/') 
      || url.includes('/download/')
      || url.endsWith('.ex4') 
      || url.endsWith('.mq4')
      || url.endsWith('.zip')
      || url.endsWith('.rar');
    const isExternal = /^(https?|ftp|mailto|tel|sms):/.test(url);

    // 强制用系统打开，解决APP内无法下载/跳转
    if (isDownload || isExternal) {
      e.preventDefault();
      window.open(url, '_system');
    }
  }, true);

  // 兼容动态生成的Blob文件下载（论坛在线附件）
  if (window.Blob && window.URL) {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      this.addEventListener('load', function() {
        if (this.responseType === 'blob' && this.response) {
          const blobUrl = URL.createObjectURL(this.response);
          window.open(blobUrl, '_system');
          URL.revokeObjectURL(blobUrl);
        }
      });
      originalOpen.apply(this, arguments);
    };
  }
});