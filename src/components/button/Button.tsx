// ------------------------------------------------------------------
// Purpose: Reusable button component with green style, used for "Favorite article" and future forms (e.g. Sign Up).
//          Non-functional in Phase 1 (per TZ – no authentication).
//
// Why separate:
//   • Reusability – same style for all buttons (green, 112×32 px, rounded, centered text)
//   • Easy to add functionality later (e.g. onClick for favoriting API call in Phase 2)
//   • Keeps ArticlePage clean
//
// Visual details (Figma):
//   • Green background (#5cb85c), white text
//   • 112×32 px, 8px radius
//   • Text: Source Sans Pro Regular 12.8px white, centered
//   • Hover: darker green (optional, using var(--green-hover))
// ------------------------------------------------------------------

import styles from './Button.module.scss';

interface Props {
  text: string; // Button label (e.g. "Favorite article")
  onClick?: () => void; // Optional click handler (for future functionality)
  disabled?: boolean; // Optional disabled state (default false)
}

export default function Button({ text, onClick, disabled = false }: Props) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
