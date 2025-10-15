import { useRef } from "react";

function Modal({ btnLabel, children, btnClassName }) {
  const modalRef = useRef();

  const openModal = () => modalRef.current.showModal();
  const closeModal = () => modalRef.current.close();

  return (
    <>
      <button onClick={openModal} className={btnClassName}>
        {btnLabel}
      </button>

      <dialog ref={modalRef}>{children}</dialog>
    </>
  );
}

export default Modal;
