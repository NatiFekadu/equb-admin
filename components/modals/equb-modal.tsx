'use client';
import { useEqubModal } from '@/hooks/use-equb-modal';
import { Modal } from '@/components/ui/modal';

export const EqubModal = () => {
  const equbModal = useEqubModal();

  return (
    <Modal
      title="Create Equb"
      description="Add a new Equb"
      isOpen={equbModal.isOpen}
      onClose={equbModal.onClose}
    >
      Future Create Equb Form
    </Modal>
  );
};
