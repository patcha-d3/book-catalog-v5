import { useRef } from "react";

function Modal({ btnLabel, children, btnClassName }) {
  const modalRef = useRef();

  function openModal() {
    modalRef.current.showModal();
  }

  function closeModal() {
    modalRef.current.close();
  }

  return (
    <>
      <button onClick={openModal} className={btnClassName}>
        {btnLabel}
      </button>

      {/* ✅ ใส่ method="dialog" เพื่อให้ React onSubmit ทำงาน */}
      <dialog ref={modalRef}>
        {/* ปุ่มปิด */}
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

        {/* ✅ ใส่ form wrapper ที่ไม่ reload หน้า */}
        <form method="dialog" style={{ marginTop: "2em" }}>
          {children}
        </form>
      </dialog>
    </>
  );
}

export default Modal;
