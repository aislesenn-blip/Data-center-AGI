export interface UserProfile {
  username: string;
  name: string;
  homeCity: string;
  residencyStatus: string;
  passportCountry: string;
  accountIban: string;
  accountBic: string;
  balance: number;
  totalTaxReturned: number;
  pendingTaxRefunds: number;
}

export interface CardDetail {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  isLocked: boolean;
  type: "Virtual" | "Physical";
}

export interface Transaction {
  id: string;
  merchantName: string;
  category: string;
  date: string;
  time: string;
  amountSpent: number;
  taxRefundAmount: number;
  status: "Pending" | "Verification" | "Claim Filed" | "Refunded" | "Ineligible";
  receiptUploaded: boolean;
  taxRate: string;
  merchantLocation: string;
}

export interface TaxClaim {
  id: string;
  merchantName: string;
  date: string;
  purchaseAmount: number;
  refundAmount: number;
  status: "Reviewing" | "Approved" | "Paid";
  progressPercent: number; // e.g., 33, 66, 100
}

export const MOCK_USER: UserProfile = {
  username: "john_carter",
  name: "John Carter",
  homeCity: "Berlin, Germany",
  residencyStatus: "International Student / Ausbildung",
  passportCountry: "Canada",
  accountIban: "DE89 3704 0044 0532 9812 00",
  accountBic: "DIASDEBBXXX",
  balance: 1420.50,
  totalTaxReturned: 240.50,
  pendingTaxRefunds: 85.20
};

export const MOCK_CARD: CardDetail = {
  id: "card-1",
  cardNumber: "4532 8812 9043 7261",
  cardHolder: "JOHN CARTER",
  expiry: "09/28",
  cvv: "381",
  isLocked: false,
  type: "Virtual"
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    merchantName: "Apple Store Kurfürstendamm",
    category: "Electronics",
    date: "Today",
    time: "14:22",
    amountSpent: 849.00,
    taxRefundAmount: 135.50,
    status: "Refunded",
    receiptUploaded: true,
    taxRate: "19% VAT",
    merchantLocation: "Berlin, DE"
  },
  {
    id: "tx-2",
    merchantName: "KaDeWe Department Store",
    category: "Shopping",
    date: "Yesterday",
    time: "11:05",
    amountSpent: 220.00,
    taxRefundAmount: 35.10,
    status: "Claim Filed",
    receiptUploaded: true,
    taxRate: "19% VAT",
    merchantLocation: "Berlin, DE"
  },
  {
    id: "tx-3",
    merchantName: "Saturn Berlin Alexanderplatz",
    category: "Electronics",
    date: "Oct 24, 2026",
    time: "18:40",
    amountSpent: 310.00,
    taxRefundAmount: 49.50,
    status: "Claim Filed",
    receiptUploaded: true,
    taxRate: "19% VAT",
    merchantLocation: "Berlin, DE"
  },
  {
    id: "tx-4",
    merchantName: "REWE Supermarket",
    category: "Groceries",
    date: "Oct 22, 2026",
    time: "09:15",
    amountSpent: 42.80,
    taxRefundAmount: 2.80,
    status: "Ineligible",
    receiptUploaded: false,
    taxRate: "7% VAT",
    merchantLocation: "Berlin, DE"
  },
  {
    id: "tx-5",
    merchantName: "Zara Friedrichstraße",
    category: "Shopping",
    date: "Oct 18, 2026",
    time: "16:30",
    amountSpent: 115.00,
    taxRefundAmount: 18.30,
    status: "Refunded",
    receiptUploaded: true,
    taxRate: "19% VAT",
    merchantLocation: "Berlin, DE"
  }
];

export const MOCK_TAX_CLAIMS: TaxClaim[] = [
  {
    id: "clm-1",
    merchantName: "Apple Store Kurfürstendamm",
    date: "Today",
    purchaseAmount: 849.00,
    refundAmount: 135.50,
    status: "Paid",
    progressPercent: 100
  },
  {
    id: "clm-2",
    merchantName: "KaDeWe Department Store",
    date: "Yesterday",
    purchaseAmount: 220.00,
    refundAmount: 35.10,
    status: "Approved",
    progressPercent: 66
  },
  {
    id: "clm-3",
    merchantName: "Saturn Berlin Alexanderplatz",
    date: "Oct 24, 2026",
    purchaseAmount: 310.00,
    refundAmount: 49.50,
    status: "Reviewing",
    progressPercent: 33
  }
];
