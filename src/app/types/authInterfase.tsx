//success
export interface successLogin {
  message: string;
  user: UserResponse;
  token: string;
}

//fail
export interface failedLogin {
  statusMsg: string;
  message: string;
}

export interface UserResponse {
  name: string;
  email: string;
  role: string;
}
