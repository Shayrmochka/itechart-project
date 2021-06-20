export interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IChangePassword {
  confirmPassword: string;
  oldPassword: string;
  password: string;
}

export interface ICompanyInfo {
  address: string;
  description: string;
  email: string;
  name: string;
  priceList: string;
}
