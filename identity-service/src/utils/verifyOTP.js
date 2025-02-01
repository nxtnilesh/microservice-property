const otpStorage = new Map();

export const storeOTP = (requestId, otp) => otpStorage.set(requestId, otp);

export const verifyOTP = (requestId, otp) => {
  if (otpStorage.get(requestId) === otp) {
    otpStorage.delete(requestId);
    return true;
  }
  return false;
};
