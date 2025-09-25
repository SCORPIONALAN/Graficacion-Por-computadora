import React, { useState } from 'react'

// ---- Acordeón ---- //
export const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className="accordion-btn" onClick={() => setOpen(!open)}>
        {title}
      </button>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
}