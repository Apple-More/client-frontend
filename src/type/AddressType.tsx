export interface Address {
  addressId: string;
  addressLine1: string;
  addressLine2: string;
  addressNo: string;
  city: string;
  country: string;
  createdAt: string; // Use Date if you want to parse this as a Date object
  customerId: string;
  phoneNumber: string;
  province: string;
  street: string;
  updatedAt: string; // Use Date if you want to parse this as a Date object
  zipCode: string;
}
