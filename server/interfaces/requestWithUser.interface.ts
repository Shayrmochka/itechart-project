import { Request } from "express";

interface RequestWithUser extends Request {
  user: UserData;
}

interface UserData extends Request {
  dataId: string;
}

export default RequestWithUser;
