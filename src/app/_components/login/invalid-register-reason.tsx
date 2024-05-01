export const InvalidRegisterReason = {
  NONE: {
    key: 'none',
    message: '',
  },
  CUSTOM: {
    key: 'custom',
    message: ''
  },
  INVALID_ALLY_CODE: {
    key: 'invalid-ally-code',
    message: 'Invalid Ally Code'
  },
  UNRESOLVED_ALLY_CODE: {
    key: 'unresolved-ally-code',
    message: "Ally Code doesn't match any account"
  },
  INVALID_EMAIL: {
    key: 'invalid-email',
    message: 'Invalid Email Address'
  },
  INVALID_PASSWORD_TO_SHORT: {
    key: 'invalid-password-to-short',
    message: 'Password is too short, Minimum 8 characters'
  },
  INVALID_PASSWORD_NOT_ENOUGH_DIGITS: {
    key: 'invalid-password-not-enough-digits',
    message: 'Password does not contain enough digits, Minimum 3 digits'
  },
  INVALID_PASSWORD_NO_SPECIAL_CHAR: {
    key: 'invalid-password-no-special-char',
    message: 'Password does not contain any special characters'
  },
  INVALID_PASSWORD_NO_UPPERCASE: {
    key: 'invalid-password-no-uppercase',
    message: 'Password does not contain any uppercase characters',
  },
  INVALID_PASSWORD_SYMBOLS: {
    key: 'invalid-password-symbols',
    message: 'Password contains invalid characters',
  },
  PASSWORD_MISMATCH: {
    key: 'password-mismatch',
    message: 'Repeated password does not match'
  },
  PLAYER_ALREADY_REGISTERED: {
    key: 'player-already-registered',
    message: 'Player is already registered'
  },
  ACCOUNT_DOESNT_EXISTS: {
    key: 'account-doesnt-exist',
    message: "Email and password combination has no results"
  }
}