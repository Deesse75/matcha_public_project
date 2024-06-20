export default function usernameValidation(username: string): boolean {
  const value = username.trim();
  if (!value) return false
  const valueRegex = /^[a-zA-Z][a-zA-Z0-9_@]*$/;
  if (value.length < 4 || value.length > 20 || !valueRegex.test(value)) {
    return false;
  }
  return true;
}

export function nameValidation(name: string): boolean {
  const value = name?.trim() || '';
  const valueRegex = /^[a-zA-Z][a-zA-Z\-']*$/;
  if (value.length < 2 || value.length > 20 || !valueRegex.test(value)) {
    return false;
  }
  return true;
}

export function passwordValidation(password: string): boolean {
  const pass = password?.trim() || '';
  const passRegex = /^[a-zA-Z0-9!?@]*$/;
  if (
    pass.length < 8 ||
    pass.length > 20 ||
    !passRegex.test(pass) ||
    !/[a-z]/.test(pass) ||
    !/[A-Z]/.test(pass) ||
    !/[0-9]/.test(pass) ||
    !/[!?@]/.test(pass)
  ) {
    return false;
  }
  return true;
}

export function emailValidation(email: string): boolean {
  const value = email?.trim() || '';
  const valueRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!valueRegex.test(value)) {
    return false;
  }
  return true;
}
