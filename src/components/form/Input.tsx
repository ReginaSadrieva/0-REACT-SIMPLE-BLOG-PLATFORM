// ------------------------------------------------------------------
// Purpose: Reusable input field used in all authentication forms (Sign Up, Sign In, Profile).
//
// Why separate component:
//   • DRY – same style for all inputs (480×48, padding 24/12, radius 8, border #aaaaaa)
//   • Easy to add validation messages or icons later
//   • Consistent with React Hook Form integration
//
// Visual details (Figma):
//   • Width: 480px
//   • Height: 48px
//   • Padding: 12px vertical, 24px horizontal
//   • Border: 1px #aaaaaa, radius 8px
//   • Placeholder: Source Sans Pro Regular 16px, left-aligned
// ------------------------------------------------------------------

import styles from './Input.module.scss';
import { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, type = 'text', ...props }, ref) => {
    return (
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
