const getUser = (userId: string) =>
  fetch(`https://api.github.com/users/${userId}`).then((response) => response.json())

// eslint-disable-next-line import/prefer-default-export
export { getUser }
