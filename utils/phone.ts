export function formatPhoneNumber(phoneNumber: string) {
  // Sadece rakamları al
  let digits = phoneNumber.replace(/\D/g, '');

  // Başında +90 varsa kaldır
  if (digits.startsWith('90') && phoneNumber.startsWith('+')) {
    digits = digits.substring(2);
  }

  return '90' + digits;
}
