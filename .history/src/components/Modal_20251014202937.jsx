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

      {/* ✅ ไม่มี <form> ครอบอีกแล้ว */}
      <dialog ref={modalRef}>
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* ✅ render children ตรง ๆ (ซึ่งคือ <AddBook>) */}
        {children}
      </dialog>
    </>
  );
}

export default Modal;
