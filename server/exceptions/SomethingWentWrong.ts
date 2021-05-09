import HttpException from "./HttpException";

class SomethingWentWrong extends HttpException {
  constructor() {
    super(500, "Something went wrong, try again");
  }
}

export default SomethingWentWrong;
