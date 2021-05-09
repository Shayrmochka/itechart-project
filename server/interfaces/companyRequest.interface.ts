import { Request } from "express";
import { ICleaningCompany } from "../models/CleaningCompany";

interface CompanyRequest extends Request {
  company: ICleaningCompany;
}

export default CompanyRequest;
