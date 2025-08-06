import React from 'react';
import classNames from 'classnames';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type: 'button' | 'submit'
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size,
  disabled = false,
  onClick,
  ...props
}) => {
  const classes = classNames('btn', `btn-${variant}`, {
    [`btn-${size}`]: size,
  });

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;