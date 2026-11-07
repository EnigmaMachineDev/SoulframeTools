import React, { useState } from 'react';

// About three lines at the width of the reference tables' Location column.
const LONG_TEXT = 100;

// A table cell's source text. Long lists show three lines with a toggle, so one weapon with
// fifteen sources doesn't stretch its row. The full text stays in the DOM either way.
export default function SourceList({ text }) {
  const [open, setOpen] = useState(false);
  if (!text) return '—';
  if (text.length <= LONG_TEXT) return text;
  return (
    <>
      <span className={open ? undefined : 'line-clamp-3'}>{text}</span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="mt-1 text-sf-bright underline hover:text-sf-green transition-colors"
      >
        {open ? 'Show less' : 'Show all'}
      </button>
    </>
  );
}
