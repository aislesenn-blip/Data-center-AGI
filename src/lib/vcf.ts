export type Contact = {
  id: number;
  name: string;
  suffix: string;
  originalName: string;
  phones: string[];
  status: 'valid' | 'multiple' | 'missing';
  raw: string;
};

export function generateVCF(contacts: Contact[]): string {
  const validContacts = contacts.filter((c) => (c.status === 'valid' || c.status === 'multiple') && c.phones.length > 0);

  const vcfLines: string[] = [];

  // Standard vCard phone types to cycle through for multiple numbers
  const phoneTypes = ['CELL', 'WORK', 'HOME', 'OTHER'];

  for (const contact of validContacts) {
    vcfLines.push('BEGIN:VCARD');
    vcfLines.push('VERSION:3.0');

    // Add stable UID for automatic replacement of outdated contacts
    vcfLines.push(`UID:urn:uuid:benmongibot-contact-${contact.id}`);

    // Add Name and Title
    const fullName = contact.suffix ? `${contact.name} - ${contact.suffix}` : contact.name;
    vcfLines.push(`FN:${fullName}`);
    vcfLines.push(`N:${contact.name};;;;`);

    if (contact.suffix) {
        vcfLines.push(`TITLE:${contact.suffix}`);
    }

    // Add all available phone numbers with distinct types
    contact.phones.forEach((phone, index) => {
      // Pick a type based on the index, falling back to OTHER if there are many
      const type = index < phoneTypes.length ? phoneTypes[index] : 'OTHER';
      vcfLines.push(`TEL;TYPE=${type}:${phone}`);
    });

    vcfLines.push('END:VCARD');
  }

  return vcfLines.join('\n');
}

export function downloadVCF(content: string, filename: string = 'contacts.vcf') {
  const blob = new Blob([content], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
