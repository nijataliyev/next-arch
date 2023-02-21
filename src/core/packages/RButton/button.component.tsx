import React from 'react';
import { IButtonProps } from './types/button';
import css from './button.module.scss';

const ButtonComponent = ({
                           type,
                           size,
                           color,
                           click,
                           className,
                           width,
                           outline,
                           rounded,
                           disabled,
                           children,
                           circle,
                           center = true,
                         }: IButtonProps) => {

  return (
    <button
      type={type || 'button'}
      onClick={click}
      style={width ? { width: width + 'px' } : {}}
      className={`${css.btn}
                         ${css.btn}__${color || 'primary'}
                         ${size ? size : 'md'}
                         ${outline ? `${css.btn__outline} btn--outline-${color}` : ''}
                         ${rounded ? css.btn__rounded : ''}
                         ${circle ? ' btn--rounded-circle' : ''}
                         ${center ? ' justify-center' : ''}
                         ${disabled ? 'btn--disabled' : ''}
                         ${className}  `}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
