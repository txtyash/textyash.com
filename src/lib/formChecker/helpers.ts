export function hasNum(s: string): boolean {
  return /\d/.test(s);
}
export function hasSpace(s: string): boolean {
  return /\s/g.test(s);
}
export function hasLower(s: string): boolean {
  return /\p{Ll}/u.test(s);
}
export function hasUpper(s: string): boolean {
  return /\p{Lu}/u.test(s);
}
export function hasSpecial(s: string): boolean {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(s);
}
export function hasSpecialExceptPeriod(s: string): boolean {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(s);
}

export function isValidEmail(email: string) {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
};
