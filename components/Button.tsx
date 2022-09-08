import React, { ReactNode } from 'react';
import styles from '../styles/Button.module.css';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  style?: Record<string, any>;
}

const Button = ({
  children,
  onClick,
  type,
  disabled,
  className,
  style
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className ? className : styles.button}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
