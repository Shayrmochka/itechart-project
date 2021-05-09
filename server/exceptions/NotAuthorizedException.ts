import HttpException from "./HttpException";

class NotAuthorizedException extends HttpException {
  constructor() {
    super(403, "You are not logged in");
  }
}

export default NotAuthorizedException;
