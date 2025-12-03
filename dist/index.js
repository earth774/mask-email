// src/index.ts
function maskEmail(email, options = {}) {
  const { maskChar = "*", visibleStart = 2 } = options;
  if (!email || !email.includes("@")) {
    return email;
  }
  const parts = email.split("@");
  const localPart = parts[0];
  const domain = parts[1];
  if (!localPart || !domain) {
    return email;
  }
  if (localPart.length <= visibleStart) {
    return `${localPart[0]}${maskChar.repeat(localPart.length - 1)}@${domain}`;
  }
  const visiblePart = localPart.substring(0, visibleStart);
  const maskedLength = localPart.length - visibleStart + 2;
  const maskedPart = maskChar.repeat(maskedLength);
  return `${visiblePart}${maskedPart}@${domain}`;
}
export {
  maskEmail
};
