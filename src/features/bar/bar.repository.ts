const getUser = (userId: string) =>
  fetch(`https://api.github.com/users/${userId}`).then((response) => response.json())

export { getUser }
