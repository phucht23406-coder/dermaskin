export interface Address {
  id: number;
  name: string;
  phone: string;
  addressLine: string;
  type: 'home' | 'company';
  isDefault: boolean;
}
