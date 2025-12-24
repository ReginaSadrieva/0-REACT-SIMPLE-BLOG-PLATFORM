// ------------------------------------------------------------------
// Purpose: Reusable form for creating/editing articles.
//          Used in NewArticlePage and EditArticlePage.
// ------------------------------------------------------------------
import styles from './ArticleForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  articleSchema,
  type ArticleFormData,
} from '../../validation/articleSchemas';
import Input from '../form/Input';
import Button from '../button/Button';
import { useEffect } from 'react';

interface Props {
  onSubmit: (data: ArticleFormData) => Promise<void>;
  defaultValues?: ArticleFormData; // for edit mode
}

export default function ArticleForm({ onSubmit, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  });

  // Pre-fill form in edit mode
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Title" {...register('title')} />
      {errors.title && (
        <p className={styles.errorText}>{errors.title.message}</p>
      )}

      <Input placeholder="Short description" {...register('description')} />
      {errors.description && (
        <p className={styles.errorText}>{errors.description.message}</p>
      )}

      <textarea
        placeholder="Input your text"
        {...register('body')}
        className={styles.textarea}
      />
      {errors.body && <p className={styles.errorText}>{errors.body.message}</p>}

      <Input placeholder="Tags (comma separated)" {...register('tagList')} />
      {errors.tagList && (
        <p className={styles.errorText}>{errors.tagList.message}</p>
      )}

      <div className={styles.buttonWrapper}>
        <Button text="Publish Article" disabled={isSubmitting} type="submit" />
      </div>
    </form>
  );
}
