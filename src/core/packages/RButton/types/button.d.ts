import React from 'react';

export interface IButtonProps {
  click?: function;
  color?: string;
  rounded?: boolean;
  circle?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'reset' | 'submit';
  outline?: boolean;
  className?: string | any;
  disabled?: boolean;
  width?: number;
  children?: React.ReactNode;
  center?: boolean;
}
