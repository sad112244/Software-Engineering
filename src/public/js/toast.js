function showToast(message, type = 'success') {
    const backgroundColor = type === 'success' ? '#10B981' : '#EF4444';
    
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: backgroundColor,
        borderRadius: "8px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px"
      }
    }).showToast();
  }