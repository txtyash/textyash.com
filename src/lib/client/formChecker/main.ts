import { checkConfirmPassword,checkDisplayName, checkEmail, checkPassword, checkUsername } from "./checkers";

export interface formError {
  field: string,
  message: string
};

export interface formFields {
  displayName?: string,
  username?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
};

// If all functions return empty string then form is valid
export function checkForm(form: formFields): formError|null {
  for (const [key, value] of Object.entries(form)) {
    switch (key) {
      case ("displayName"): {
        let warning = checkDisplayName(value);
        if (warning) {
          return { field: key, message: warning };
        }
        break;
      }
      case ("username"): {
        let warning = checkUsername(value);
        if (warning) {
          return { field: key, message: warning };
        }
        break;
      }
      case ("email"): {
        let warning = checkEmail(value);
        if (warning) {
          return { field: key, message: warning };
        }
        break;
      }
      case ("password"): {
        let warning = checkPassword(value);
        if (warning) {
          return { field: key, message: warning };
        }
        break;
      }
      case ("confirmPassword"): {
        if (form.password) {
          let warning = checkConfirmPassword(form.password,value);
          if (warning) {
            return { field: key, message: warning };
          }
        }
        break;
      }
    }
  }
  return null;
}

