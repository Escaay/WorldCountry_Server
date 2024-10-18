export const passwordValidator: (...args: any[]) => any = (value = '') => {
    const passwordRegExp = /^[A-Za-z0-9@$!%*?&.]{6,}$/;
    if (passwordRegExp.test(value)) {
      return true
    } else {
      return Promise.reject('密码格式错误')
    }
};

export const phoneValidator: (...args: any[]) => any = (value = '') => {
  const phoneRegExp = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
  if (phoneRegExp.test(value)) {
    return true
  } else {
    return Promise.reject('手机号格式错误')
  }
};

export const codeValidator: (...args: any[]) => any = (value = '') => {
  const codeRegExp = /^\d{6}$/;
  if (codeRegExp.test(value)) {
    return true
  } else {
    return Promise.reject('验证码格式错误')
  }
};