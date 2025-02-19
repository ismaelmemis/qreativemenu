export function formatImageName(name: string, extension: string) {
  // Convert to lowercase and remove non-ASCII characters
  name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove accents
  name = name.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric with underscores

  // Generate timestamp for uniqueness
  const timestamp = Date.now();

  // Ensure extension has a dot
  extension = extension.startsWith('.') ? extension : `.${extension}`;

  // Format final name
  return `${name}_${timestamp}${extension}`;
}

export function getFileNameOnly(filename: string) {
  return filename.replace(/\.[^/.]+$/, ''); // Remove the last dot and extension
}

export function getFileExtension(filename: string) {
  return filename.includes('.') ? filename.split('.').pop() : '';
}
