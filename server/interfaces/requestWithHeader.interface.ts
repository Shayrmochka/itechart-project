import { Request } from "express";

interface RequestWithHeader extends Request {
  user: object;
  headers: any;
}

export default RequestWithHeader;
