interface IUserLogin {
  email: string,
  password: string
}

interface IUsers extends IUserLogin {
  id: number,
  username: string,
  role: string,
}

export default IUsers;
export { IUserLogin };
