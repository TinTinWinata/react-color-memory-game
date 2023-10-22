import React from 'react';

export default function Box({ isMemory, color, show, index, handler }) {
  const defaultColor = 'bg-secondary';
  return (
    <div
      onClick={() => !isMemory && handler(index)}
      className={(show ? color : defaultColor) + ' box'}
    ></div>
  );
}
