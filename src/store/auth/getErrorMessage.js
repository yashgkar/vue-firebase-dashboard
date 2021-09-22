export default (type) => {
  switch (type) {
    case 'EMAIL_EXISTS':
      return 'This email is already in use with an existing account, please use another email.'

    case 'EMAIL_NOT_FOUND':
      return 'This email is not registered with us, please create an account if you wish to continue with the same email'

    default:
      return type
  }
}
