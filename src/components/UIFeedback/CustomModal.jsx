import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiHelpCircle } from 'react-icons/fi';
import { useT } from '../../context/LanguageContext';
import './CustomModal.css';

export default function CustomModal({ isOpen, onClose, title, message, type = 'alert', onConfirm, defaultValue = '' }) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const { t } = useT();

  useEffect(() => {
    if (isOpen) setInputValue(defaultValue);
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'prompt') {
      onConfirm(inputValue);
    } else if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'confirm': return <FiHelpCircle className="modal-icon confirm" />;
      case 'prompt': return <FiInfo className="modal-icon prompt" />;
      case 'success': return <FiCheckCircle className="modal-icon success" />;
      default: return <FiAlertCircle className="modal-icon alert" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        {getIcon()}
        
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
          </div>
        )}
        
        <div className="modal-body">
          <p>{message}</p>
          {type === 'prompt' && (
            <input 
              type="text" 
              className="modal-input" 
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleConfirm()}
            />
          )}
        </div>
        <div className="modal-footer">
          {(type === 'confirm' || type === 'prompt') && (
            <button className="modal-btn secondary" onClick={onClose}>{t('modal_cancel')}</button>
          )}
          <button className="modal-btn primary" onClick={handleConfirm}>
            {type === 'confirm' ? t('modal_accept') : (type === 'prompt' ? t('modal_save') : t('modal_understood'))}
          </button>
        </div>
      </div>
    </div>
  );
}
