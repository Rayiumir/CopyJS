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

// Function to show copy notification
function showCopyNotification(message, type = 'success', buttonElement) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.copy-link-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    if (!buttonElement) return;
    
    // Get button position
    const buttonRect = buttonElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'copy-link-notification';
    notification.textContent = message;
    
    // Calculate position relative to button (above the button)
    const notificationTop = buttonRect.top + scrollTop - 50; // 50px above button
    const notificationLeft = buttonRect.left + scrollLeft + (buttonRect.width / 2) - 60; // centered above button
    
    notification.style.cssText = `
        position: absolute;
        top: ${notificationTop}px;
        left: ${notificationLeft}px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 8px 16px;
        border-radius: 25px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        font-size: 13px;
        white-space: nowrap;
        animation: slideInDown 0.3s ease-out;
        pointer-events: none;
    `;
    
    // Add animation keyframes if not already added
    if (!document.getElementById('copy-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'copy-notification-styles';
        style.textContent = `
            @keyframes slideInDown {
                from {
                    transform: translateY(-10px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutUp {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-10px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}
