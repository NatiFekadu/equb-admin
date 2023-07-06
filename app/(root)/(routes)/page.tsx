'use client';

import { useEffect } from 'react';
import { useEqubModal } from '@/hooks/use-equb-modal';

const SetupPage = () => {
  const onOpen = useEqubModal((state) => state.onOpen);
  const isOpen = useEqubModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
};

export default SetupPage;
