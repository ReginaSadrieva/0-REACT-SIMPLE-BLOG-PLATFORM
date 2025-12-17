// ------------------------------------------------------------------
// Purpose: Login (Sign In) page.
//
// Layout (Figma):
//   • "Sign In" title: Titillium Web Bold 46px black, centered
//   • 102px from header (same as Sign Up)
//   • 16px gap between title and first input
//   • 16px gap between inputs
//   • Green "Sign In" button right-aligned under last input (16px gap)
//   • All content centered in Container (same width as article list)
// ------------------------------------------------------------------

import styles from './SignInPage.module.scss';
import Container from '../components/common/Container';
import Input from '../components/form/Input';
import Button from '../components/button/Button'; // твоя зелёная кнопка

export default function SignInPage() {
  return (
    <Container>
      <div className={styles.signin}>
        <h1 className={styles.signin__title}>Sign In</h1>

        <form className={styles.signin__form}>
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />

          <div className={styles.signin__buttonWrapper}>
            <Button text="Sign In" />
          </div>
        </form>
      </div>
    </Container>
  );
}
