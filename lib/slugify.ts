export function generateSlug(text: string) {
  return text
    .toLowerCase() // Küçük harfe çevir
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Türkçe karakterleri kaldır
    .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri temizle
    .replace(/\s+/g, '') // Boşlukları "-" ile değiştir
    .replace(/-+/g, '') // Fazla "-" işaretlerini temizle
    .trim(); // Başı ve sonundaki boşlukları temizle
}
