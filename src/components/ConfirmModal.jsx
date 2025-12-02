import { useState } from 'react'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, showPermanentOption = false }) => {
  const [permanent, setPermanent] = useState(false)

  if (!isOpen) return null

  const handleClose = () => {
    setPermanent(false)
    onClose()
  }

  const handleConfirm = () => {
    onConfirm(permanent)
    setPermanent(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {showPermanentOption && (
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={permanent}
              onChange={(e) => setPermanent(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Baja física (eliminar permanentemente)</span>
          </label>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal