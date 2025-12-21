// ------------------------------------------------------------------
// Purpose: User profile editing page.
//          Pre-filled with current user data, validation with React Hook Form + Zod.
//          Handles server errors and update via API.
// ------------------------------------------------------------------

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './SettingsPage.module.scss';
import Container from '../components/common/Container';
import Input from '../components/form/Input';
import Button from '../components/button/Button';
import {
  settingsSchema,
  type SettingsFormData,
} from '../validation/authSchemas';
import { updateUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SettingsPage() {
  const { user, token, login } = useAuth(); // token for API call, login to update user after success
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      image: user?.image || '',
      password: '',
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    if (!token) return;

    try {
      const updatedUser = await updateUser(token, {
        username: data.username,
        email: data.email,
        bio: data.bio || undefined,
        image: data.image || undefined,
        password: data.password || undefined, // only send if filled
      });

      // Update context with new user data
      login(token, updatedUser);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field as keyof SettingsFormData, {
            message: Array.isArray(serverErrors[field])
              ? serverErrors[field].join(', ')
              : serverErrors[field],
          });
        });
      } else {
        setError('root', { message: 'Update failed. Please try again.' });
      }
    }
  };

  return (
    <Container>
      <div className={styles.profile}>
        <h1 className={styles.profile__title}>Your Settings</h1>

        <form
          className={styles.profile__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input placeholder="Username" {...register('username')} />
          {errors.username && (
            <p className={styles.errorText}>{errors.username.message}</p>
          )}

          <Input
            placeholder="Email Address"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}

          {/* Bio as textarea (bigger input) */}
          <textarea
            placeholder="Bio"
            {...register('bio')}
            className={styles.bioTextarea}
          />
          {errors.bio && (
            <p className={styles.errorText}>{errors.bio.message}</p>
          )}

          <Input placeholder="Avatar image (URL)" {...register('image')} />
          {errors.image && (
            <p className={styles.errorText}>{errors.image.message}</p>
          )}

          <Input
            placeholder="New Password"
            type="password"
            {...register('password')}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}

          <div className={styles.profile__buttonWrapper}>
            <Button
              text="Update Settings"
              disabled={isSubmitting}
              type="submit"
            />
          </div>

          {errors.root && (
            <p className={styles.errorText}>{errors.root.message}</p>
          )}
        </form>
      </div>
    </Container>
  );
}
