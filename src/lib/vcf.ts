import { Contact } from "./contacts";

export function generateVCF(contacts: Contact[]): string {
  let vcfContent = "";

  for (const contact of contacts) {
    if (!contact.hasPhone || contact.phones.length === 0) continue;

    vcfContent += "BEGIN:VCARD\n";
    vcfContent += "VERSION:3.0\n";
    vcfContent += `FN:${contact.name}\n`;
    vcfContent += `N:${contact.name};;;;\n`;

    for (const phone of contact.phones) {
      // Ensure the phone number starts with a plus if it's international, else leave as is (usually 07... etc)
      // We assume standard mobile type for all
      vcfContent += `TEL;TYPE=CELL:${phone}\n`;
    }

    vcfContent += "END:VCARD\n";
  }

  return vcfContent;
}

export function downloadVCF(content: string, filename: string = "contacts.vcf") {
  const blob = new Blob([content], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
