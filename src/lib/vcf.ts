export type Contact = {
  name: string;
  phones: string[];
  status: 'valid' | 'missing';
  raw: string;
};

export function generateVCF(contacts: Contact[]): string {
  const validContacts = contacts.filter((c) => c.status === 'valid' && c.phones.length > 0);

  const vcfLines: string[] = [];

  for (const contact of validContacts) {
    vcfLines.push('BEGIN:VCARD');
    vcfLines.push('VERSION:3.0');
    vcfLines.push(`FN:${contact.name}`);
    vcfLines.push(`N:${contact.name};;;;`);

    for (const phone of contact.phones) {
      // Ensure the phone number starts with + or just digits
      vcfLines.push(`TEL;TYPE=CELL:${phone}`);
    }

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
