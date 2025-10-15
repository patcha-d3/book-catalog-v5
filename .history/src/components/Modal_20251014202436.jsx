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
      <dialog ref={modalRef}>
        {/* ปุ่มปิดใน dialog */}
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

        {/* ✅ บังคับให้ form ภายในไม่ reload หน้า */}
        <form method="dialog" style={{ marginTop: "2em" }}>
          {children}
        </form>
      </dialog>
    </>
  );
}

export default Modal;
