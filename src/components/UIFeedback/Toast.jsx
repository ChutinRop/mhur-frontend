import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
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
    switch (toast.type) {
      case 'success': return <FiCheckCircle className="toast-icon" />;
      case 'error': return <FiAlertCircle className="toast-icon" />;
      default: return <FiInfo className="toast-icon" />;
    }
  };

  return (
    <div className={`toast-container ${toast.type} ${toast.visible ? 'fade-in' : ''}`}>
      <div className="toast-content glass-panel">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
}
