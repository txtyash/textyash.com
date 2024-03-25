import {
  hasLower,
  hasNum,
  hasSpecial,
  hasSpecialExceptPeriod,
  hasUpper,
  isValidEmail,
} from "./helpers";

export function checkDisplayName(displayName: string): string | null {
  displayName = displayName.trim();
  if (displayName.length < 1) {
    return "Display Name must have at least 1 visible character.";
  }
  return null;
}

export function checkUsername(username: string): string | null {
  username = username.trim();
  // TODO: Check if username is taken
  if (username.length < 1) {
    return "Username must have at least 1 visible character.";
  } else if (hasSpecialExceptPeriod(username)) {
    return "Username can only contain alphabet, numbers & periods.";
  }
  return null;
}

export function checkEmail(email: string): string | null {
  email = email.trim();
  if (email.length < 1) {
    return "Email must have at least 1 visible character.";
  }
  if (!isValidEmail(email)) {
    return 'Email should follow the format "username@domain"';
  }
  return null;
}

export function checkPassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  } else if (!hasNum(password)) {
    return "Password must contain a number.";
  } else if (!hasLower(password)) {
    return "Password must contain a lower case character.";
  } else if (!hasUpper(password)) {
    return "Password must contain an upper case character.";
  } else if (!hasSpecial(password)) {
    return "Password must contain a special character.";
  }
  return null;
}

export function confirmPassword(
  password: string,
  confirmPassword: string,
): string | null {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
}
