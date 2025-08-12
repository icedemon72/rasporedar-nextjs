'use client'

import React, { useEffect, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import clsx from 'clsx'

interface DeleteModalProps {
  title: string
  description: string
  onConfirm: () => Promise<void> | void
  onClose: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  description,
  onConfirm,
  onClose,
}) => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, [])


  const handleConfirm = async () => {
    await onConfirm();
    handleClose();
  }

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      role="dialog"
      aria-modal="true"
    >
      <div className={
        clsx(
          "w-full max-w-[90%] md:max-w-xl rounded-lg border border-gray-200 bg-white shadow-lg transition-all",
           isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2'
        )
      }>
        {/* Header */}
        <div className="flex items-center gap-3 border-b px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center">
            <TriangleAlert className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4 text-sm text-gray-700">
          <p>{description}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            onClick={() => handleClose()}
            className={clsx(
              'rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700',
              'hover:bg-gray-100 transition'
            )}
          >
            Ne, ne želim
          </button>
          <button
            onClick={handleConfirm}
            className={clsx(
              'rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white',
              'hover:bg-red-700 transition'
            )}
          >
            Da, obriši
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
