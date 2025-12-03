// src/index.ts

interface MaskOptions {
  maskChar?: string;
  visibleStart?: number; // จำนวนตัวอักษรที่โชว์ข้างหน้า
}

export function maskEmail(email: string, options: MaskOptions = {}): string {
  const { maskChar = "*", visibleStart = 2 } = options;

  if (!email || !email.includes("@")) {
    return email; // หรือ throw error ตาม design
  }

  const parts = email.split("@");
  const localPart = parts[0];
  const domain = parts[1];

  if (!localPart || !domain) {
    return email;
  }

  // กรณีอีเมลสั้นเกินไป ให้โชว์แค่ตัวแรก
  if (localPart.length <= visibleStart) {
    return `${localPart[0]}${maskChar.repeat(localPart.length - 1)}@${domain}`;
  }

  const visiblePart = localPart.substring(0, visibleStart);
  // Mask length should be: remaining characters + 2 extra for privacy
  // This ensures consistent masking behavior
  const maskedLength = localPart.length - visibleStart + 2;
  const maskedPart = maskChar.repeat(maskedLength);

  return `${visiblePart}${maskedPart}@${domain}`;
}
