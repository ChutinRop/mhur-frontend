import React, { useState, useRef } from 'react';
import { FiX, FiUploadCloud, FiAlertCircle, FiSend, FiImage } from 'react-icons/fi';
import './ReportModal.css';

export default function ReportModal({ isOpen, onClose, onSubmit }) {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('La imagen es demasiado grande. El máximo es 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecciona un archivo de imagen válido.');
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Por favor, describe el error antes de enviar.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await onSubmit({ description, image });
      setDescription('');
      clearImage();
      onClose();
    } catch (err) {
      setError(err.message || 'Error al enviar el reporte. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal glass-panel" onClick={e => e.stopPropagation()}>
        <button className="report-close-btn" onClick={onClose}><FiX /></button>
        
        <div className="report-header">
          <FiAlertCircle className="report-icon" />
          <h2>Reportar un Error</h2>
          <p>Ayúdanos a mejorar MHUR Tunning describiendo el problema que encontraste.</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="description">Descripción del Error *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="¿Qué estabas haciendo cuando ocurrió el error? ¿Qué esperabas que pasara?"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Captura de Pantalla (Opcional)</label>
            
            {!image ? (
              <div 
                className="upload-area"
                onClick={() => fileInputRef.current?.click()}
              >
                <FiUploadCloud className="upload-icon" />
                <span>Haz clic para subir una imagen</span>
                <span className="upload-hint">Formatos soportados: JPG, PNG, WebP (Max 5MB)</span>
              </div>
            ) : (
              <div className="image-preview-container">
                <img src={preview} alt="Preview" className="image-preview" />
                <button type="button" className="remove-image-btn" onClick={clearImage}>
                  <FiX />
                </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>

          {error && <div className="report-error">{error}</div>}

          <div className="report-actions">
            <button type="button" className="report-btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="report-btn-primary" disabled={isSubmitting || !description.trim()}>
              {isSubmitting ? (
                <span className="loading-spinner"></span>
              ) : (
                <><FiSend /> Enviar Reporte</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
