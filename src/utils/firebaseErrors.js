export const mapFirebaseAuthError = (code = '') => {
  if (code.includes('email-already-in-use')) {
    return 'No way! That email is already in use!'
  } else if (
    code.includes('user-not-found') ||
    code.includes('wrong-password') ||
    code.includes('invalid-credential')
  ) {
    return 'Hmm... email or password is incorrect'
  } else if (code.includes('invalid-email')) {
    return "That email doesn't look quite right"
  } else if (code.includes('weak-password')) {
    return 'Password needs to be at least 6 characters'
  } else if (code.includes('too-many-requests')) {
    return 'Too many attempts. Please wait and try again.'
  } else {
    return code || 'Something went wrong. Please try again.'
  }
}
