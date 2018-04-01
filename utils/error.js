module.exports = {
  authentication: {
    register: {
      409: 'I know this username already, choose another 🤔',
      422: 'Passwords need to be identical ⁉️',
    },
    login: {
      401: 'Thats not your password 😤',
      404: 'I do not know that username, check it again 🤷‍',
    },
    400: 'All fields are required',
  },
};
