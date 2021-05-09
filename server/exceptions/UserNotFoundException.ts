import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
  constructor() {
    super(400, `User not found`);
  }
}

export default UserNotFoundException;
