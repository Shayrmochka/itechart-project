export interface ICompany {
  _id: string;
  email: string;
  password: string;
  logo: string;
  name: string;
  description: string;
  address: string;
  typeOfServices: any;
  priceList: string;
  rating: number;
  isActive: boolean;
  banReason: string;
  type: string;
}

export interface IService {
  _id: string;
  serviceName: string;
  typeOfService: string;
  numberOfService: number;
  serviceImage: string;
  serviceDescription: string;
  servicePrice: number;
  checked: boolean;
}

export interface IFeedback {
  _id: string;
  date: Date;
  owner: string;
  ownerLogo: string;
  ownerEmail: string;
  ownerFirstName: string;
  ownerLastName: string;
  company: ICompany;
  rating: string;
  text: string;
}

export interface IOrder {
  _id: string;
  date: string;
  dateCleaning: string;
  owner: IUser;
  company: ICompany;
  address: string;
  serviceName: string;
  typeOfService: string;
  flatDescription: string;
  checked: boolean;
  checkedByUser: boolean;
  status: string;
  smallRooms: number;
  bigRooms: number;
  bathrooms: number;
  price: number;
  time: number;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  logo: string;
  phone: string;
  isActive: boolean;
  banReason: string;
  type: string;
  role: string;
  token?: string;
}

export interface IGoogleUser {
  email: string;
  firstName: string;
  gender?: undefined | string;
  id: string;
  lastName: string;
  name: string;
  profilePicURL: string;
}

export interface IGoogleProfile {
  profile: IGoogleUser;
}
