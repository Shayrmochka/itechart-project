import { Request } from "express";

// interface Authorization extends Request {
//   authorization: string;
// }

interface RequestWithHeader extends Request {
  user: object;
  headers: any;
}

export default RequestWithHeader;
