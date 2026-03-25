import React, { useState, useEffect } from 'react';
import './Toast.css';

let toastTimeout;
let externalSetToast;

export const showToast = (message, type = 'info') => {
  if (externalSetToast) {
    externalSetToast({ message, type, visible: true });
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      externalSetToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  }
};

export default function Toast() {
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  useEffect(() => {
    externalSetToast = setToast;
  }, []);

  if (!toast.visible) return null;

  const getIcon = () => {
    return (
      <div className="toast-logo-wrapper">
        <img 
          src="/assets/Images/Logo pagina.png" 
          alt="MHUR" 
          className="toast-custom-logo" 
        />
        <div className={`toast-status-dot ${toast.type}`}></div>
      </div>
    );
  };

  return (
    <div className={`toast-container-v2 ${toast.type} ${toast.visible ? 'fade-in' : ''}`}>
      <div className="toast-content-v2 glass-panel">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
}
