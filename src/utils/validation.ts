export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type ValidationErrors = {
  [key in keyof ContactFormData]?: string;
};

export const validateContactForm = (data: ContactFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // 名前のバリデーション
  if (!data.name.trim()) {
    errors.name = '名前を入力してください';
  } else if (data.name.length > 50) {
    errors.name = '名前は50文字以内で入力してください';
  }

  // メールアドレスのバリデーション
  if (!data.email.trim()) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!isValidEmail(data.email)) {
    errors.email = '有効なメールアドレスを入力してください';
  }

  // 電話番号のバリデーション（任意項目）
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = '有効な電話番号を入力してください';
  }

  // 件名のバリデーション
  if (!data.subject.trim()) {
    errors.subject = '件名を入力してください';
  } else if (data.subject.length > 100) {
    errors.subject = '件名は100文字以内で入力してください';
  }

  // メッセージのバリデーション
  if (!data.message.trim()) {
    errors.message = 'メッセージを入力してください';
  } else if (data.message.length > 1000) {
    errors.message = 'メッセージは1000文字以内で入力してください';
  }

  return errors;
};

// メールアドレスの形式チェック
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// 電話番号の形式チェック
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9-]{10,15}$/;
  return phoneRegex.test(phone);
};