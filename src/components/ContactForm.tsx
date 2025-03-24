'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormData, validateContactForm, ValidationErrors } from '@/utils/validation';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // バリデーションエラーをリセット
    setValidationErrors({});
    
    // カスタムバリデーションを実行
    const errors = validateContactForm(data);
    
    // エラーがある場合は送信しない
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // ここでAPIリクエストなどを行う
      // 実際の実装では、APIエンドポイントに問い合わせデータを送信
      console.log('送信データ:', data);
      
      // 送信の成功を模擬（実際の実装では、APIレスポンスに基づいて処理）
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // フォームをリセットし、送信完了状態に設定
      reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">お問い合わせフォーム</h1>
      
      {isSubmitted ? (
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-xl font-medium mb-2">お問い合わせを受け付けました</h2>
          <p className="text-gray-600 mb-6">
            ご入力いただいたメールアドレスに確認メールをお送りしました。
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="btn-primary"
          >
            新しいお問い合わせを作成
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-section">
            <label htmlFor="name" className="form-label">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="山田 太郎"
              className="form-input"
              {...register('name', { required: true })}
            />
            {validationErrors.name && (
              <p className="form-error">{validationErrors.name}</p>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="email" className="form-label">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              className="form-input"
              {...register('email', { required: true })}
            />
            {validationErrors.email && (
              <p className="form-error">{validationErrors.email}</p>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="phone" className="form-label">
              電話番号（任意）
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="03-1234-5678"
              className="form-input"
              {...register('phone')}
            />
            {validationErrors.phone && (
              <p className="form-error">{validationErrors.phone}</p>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="subject" className="form-label">
              件名 <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder="お問い合わせの件名"
              className="form-input"
              {...register('subject', { required: true })}
            />
            {validationErrors.subject && (
              <p className="form-error">{validationErrors.subject}</p>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="message" className="form-label">
              メッセージ <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="お問い合わせ内容を入力してください"
              className="form-input"
              {...register('message', { required: true })}
            />
            {validationErrors.message && (
              <p className="form-error">{validationErrors.message}</p>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className={`btn-primary w-full ${isSubmitting ? 'btn-disabled' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;