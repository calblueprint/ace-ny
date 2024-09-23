import React from 'react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }) => {
  return <button {...props}>{children}</button>;
});
Button.displayName = 'Button';
