import React, { useState, useEffect } from 'react';
import './CustomModal.css';

export default function CustomModal({ isOpen, onClose, title, message, type = 'alert', onConfirm, defaultValue = '' }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) setInputValue(defaultValue);
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'prompt') {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
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
            <button className="modal-btn secondary" onClick={onClose}>Cancelar</button>
          )}
          <button className="modal-btn primary" onClick={handleConfirm}>
            {type === 'confirm' ? 'Aceptar' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}
