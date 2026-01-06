// Copy short link functionality
document.addEventListener('DOMContentLoaded', function() {
    const copyLinkBtn = document.getElementById('copy-short-link-btn');
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const linkToCopy = this.getAttribute('data-link') || this.getAttribute('href');
            
            if (linkToCopy) {
                const btn = this;
                // Copy to clipboard
                navigator.clipboard.writeText(linkToCopy).then(function() {
                    // Show success message
                    showCopyNotification('Copied', 'success', btn);
                }).catch(function(err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = linkToCopy;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        showCopyNotification('Copied', 'success', btn);
                    } catch (err) {
                        showCopyNotification('Error Copied', 'error', btn);
                    }
                    document.body.removeChild(textArea);
                });
            }
        });
    }
});
