export function checkDisplayName(displayName: string): string {
  if(displayName!==displayName.trim()) {
    return "Display Name cannot have trailing/leading space.";
  }
  else if(displayName.length < 1) {
    return "Display Name must have at least 1 character.";
  }
  return "";
}

export function checkUsername(username: string): string {
  // TODO: Check if username is taken
  if(hasSpace(username)) {
    return "Username cannot have white space.";
  }
  else if(username.length < 1) {
    return "Username must have at least 1 character.";
  }
  else if(hasSpecialExceptPeriod(username)) {
    return "Username can only contain alphabet, numbers & periods.";
  }
  return "";
}

export function checkEmail(email: string): string {
  if(email!==email.trim()) {
    return "Email cannot have trailing/leading space.";
  }
  else if(email.length < 1) {
    return "Email must have at least 1 character.";
  }
  return "";
}

export function checkPassword(password: string): string {
  if(hasSpace(password)) {
    return "Password cannot have white space.";
  }
  else if(password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  else if(!hasNum(password)) {
    return "Password must contain a number.";
  }
  else if(!hasLower(password)) {
    return "Password must contain a lower case character.";
  }
  else if(!hasUpper(password)) {
    return "Password must contain an upper case character.";
  }
  else if(!hasSpecial(password)) {
    return "Password must contain a special character.";
  }
  return "";
}

type registerForm ={
  displayName: string,
  username:string,
  email:string,
  password:string,
}

// If all functions return empty string then form is valid
export function validForm(form:registerForm):boolean{
  return !(checkDisplayName(form.displayName) &&
    checkUsername(form.username)&&
    checkEmail(form.email)  &&
    checkPassword(form.password));
}

function hasNum(s:string): boolean{
    return /\d/.test(s);
}
function hasSpace(s:string): boolean{
    return   /\s/g.test(s);
}
function hasLower(s:string): boolean{
  return /\p{Ll}/u.test(s);
}
function hasUpper(s:string): boolean{
  return /\p{Lu}/u.test(s);
}
function hasSpecial(s:string): boolean{
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(s);
}
function hasSpecialExceptPeriod(s:string): boolean{
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(s);
}
