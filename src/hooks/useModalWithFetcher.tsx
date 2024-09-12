import { useEffect, useState } from "react";
import { Fetcher } from "react-router-dom";

export function useModalWithFetcher(fetcher: Fetcher) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'success' | 'initial' | 'submitting'>('initial');

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (fetcher.state === 'submitting') {
      setModalState('submitting');
    } else if (fetcher.state === 'loading') {
      setModalState('success');
      setTimeout(() => {
        handleModalClose();
        setModalState('initial');
      }, 1000);
    }
  }, [fetcher]);

  return { modalOpen, modalState, handleModalOpen, handleModalClose };
}
