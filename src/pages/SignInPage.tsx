// src/pages/SignInPage.tsx
// ------------------------------------------------------------------
// Purpose: Login (Sign In) page with React Hook Form + Zod validation.
//          Handles client-side validation, server errors, and auto-login after success.
// ------------------------------------------------------------------

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './SignInPage.module.scss';
import Container from '../components/common/Container';
import Input from '../components/form/Input';
import Button from '../components/button/Button';
import { signInSchema, type SignInFormData } from '../validation/authSchemas';
import { loginUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignInPage() {
  const { login } = useAuth(); // fixed destructuring with proper import

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      login(response.user.token!, response.user);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field as keyof SignInFormData, {
            message: Array.isArray(serverErrors[field])
              ? serverErrors[field].join(', ')
              : serverErrors[field],
          });
        });
      } else {
        setError('root', { message: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <Container>
      <div className={styles.signin}>
        <h1 className={styles.signin__title}>Sign In</h1>

        <form className={styles.signin__form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Email address"
              type="email"
              {...register('email')}
            />
            {errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.signin__buttonWrapper}>
            <Button text="Sign In" disabled={isSubmitting} type="submit" />
          </div>

          {errors.root && (
            <p className={styles.errorText}>{errors.root.message}</p>
          )}
        </form>
      </div>
    </Container>
  );
}
