'use client';

import { useEffect, useRef, useState } from 'react';

export function useAnimateModals(onClose: () => void, closeDelay = 200) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  // Animate in on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ESC key handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), closeDelay);
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) handleClose();
  };

  return {
    isVisible,
    setIsVisible,
    modalRef,
    backdropRef,
    handleClose,
    handleBackdrop,
  };
}