interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        <div className="confirm-modal">
          <h3>{title}</h3>
          <p>{message}</p>
          <div className="confirm-modal__actions">
            <button className="btn btn--outline" onClick={onCancel}>
              Cancelar
            </button>
            <button className="btn btn--danger" onClick={onConfirm}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
