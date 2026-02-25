import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onConfirm, onClose }) => {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal confirm-modal">
        <div className="modal__header">
          <h2 className="modal__title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)' }}>
            <AlertTriangle size={18} />
            {title}
          </h2>
          <button className="btn btn--ghost btn--icon" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal__body">
          <p className="confirm-modal__text">{message}</p>
        </div>
        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn--danger" onClick={() => { onConfirm(); onClose(); }}>Deletar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
