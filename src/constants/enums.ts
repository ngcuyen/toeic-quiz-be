export enum UserVerifyStatus {
  Unverified = 'Unverified',
  Verified = 'Verified',
  Celerity = 'Celerity',
  Banned = 'Banned'
}

export enum UserGenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum TokenType {
  AccessToken = 'AccessToken',
  RefreshToken = 'RefreshToken',
  ForgotPasswordToken = 'ForgotPasswordToken',
  OTPVerify = 'OTPVerifyToken'
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export enum PaymentMethods {
  Delivery = 'Delivery',
  Online = 'Online'
}

export enum OrderStatus {
  Pending = 'Pending',
  Accept = 'Accept',
  Shipping = 'Shipping',
  Complete = 'Complete',
  Cancel = 'Cancel',
  Refuse = 'Refuse'
}

export enum InventoryMovementType {
  Received = 'Received',
  Sold = 'Sold',
  Transferred = 'Transferred'
}

export enum StatusType {
  Pending = 'Pending',
  Public = 'Public',
  Deleted = 'Deleted'
}
