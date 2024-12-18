import { useEffect, useRef, ReactNode } from 'react';

import './Modal.scss';

import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({
  children,
  isModalOpen,
  onModalClose,
}: {
  children: ReactNode;
  isModalOpen: boolean;
  onModalClose: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      dialogRef.current?.showModal();
      document.body.classList.add('no-scroll');
    } else {
      dialogRef.current?.close();
      document.body.classList.remove('no-scroll');
    }
  }, [isModalOpen]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { top, right, bottom, left } = currentTarget.getBoundingClientRect();

    if (
      clientX < left ||
      clientX > right ||
      clientY < top ||
      clientY > bottom
    ) {
      onModalClose();
    }
  };

  const handleModalCloseButton = () => {
    onModalClose();
  };

  return (
    <dialog
      className="main__task-dialog dialog"
      ref={dialogRef}
      onClick={handleDialogClick}
    >
      <button
        className="dialog__close-button"
        autoFocus
        onClick={handleModalCloseButton}
      >
        <IoCloseOutline />
      </button>
      {children}
    </dialog>
  );
};

export default Modal;
