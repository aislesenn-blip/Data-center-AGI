export interface UserProfile {
  username: string;
  name: string;
  homeCity: string;
  country: string;
  passportVerified: boolean;
  passportCountry: string;
  accountNumber: string;
  bankBic: string;
  accountBalance: number;
  pendingRefund: number;
  recoveredTotal: number;
}

export interface CardInfo {
  id: string;
  type: "virtual" | "physical";
  cardNumber: string;
  expiry: string;
  cvv: string;
  status: "active" | "frozen";
  spendLimit: number;
  spentMonth: number;
  brand: "Visa" | "Mastercard";
}

export interface Transaction {
  id: string;
  merchant: string;
  category: "Shopping" | "Electronics" | "Dining" | "Transit" | "Grocery" | "Utilities";
  amount: number;
  date: string;
  time: string;
  taxRefundAmount: number;
  status: "cleared" | "pending";
  isEligible: boolean;
}

export interface TaxClaim {
  id: string;
  merchant: string;
  purchaseAmount: number;
  taxReturned: number;
  status: "review" | "approved" | "refunded";
  date: string;
  receiptUploaded: boolean;
}

export const MOCK_USER: UserProfile = {
  username: "john_carter",
  name: "John Carter",
  homeCity: "Berlin",
  country: "Germany",
  passportVerified: true,
  passportCountry: "Canada", // Non-EU citizen eligible for tax recovery
  accountNumber: "DE89 3704 0044 0532 9110 00",
  bankBic: "SOLADEF1XXX",
  accountBalance: 1450.80,
  pendingRefund: 85.40,
  recoveredTotal: 240.00
};

export const MOCK_CARDS: CardInfo[] = [
  {
    id: "card-virt-01",
    type: "virtual",
    cardNumber: "•••• •••• •••• 4082",
    expiry: "09/29",
    cvv: "382",
    status: "active",
    spendLimit: 2000,
    spentMonth: 345.20,
    brand: "Visa"
  },
  {
    id: "card-phys-02",
    type: "physical",
    cardNumber: "•••• •••• •••• 8911",
    expiry: "11/28",
    cvv: "740",
    status: "frozen",
    spendLimit: 5000,
    spentMonth: 120.00,
    brand: "Mastercard"
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-01",
    merchant: "Apple Store Kurfürstendamm",
    category: "Electronics",
    amount: 1199.00,
    date: "Yesterday",
    time: "14:35",
    taxRefundAmount: 191.84, // 16% VAT refund on eligible items
    status: "cleared",
    isEligible: true
  },
  {
    id: "tx-02",
    merchant: "KaDeWe Berlin",
    category: "Shopping",
    amount: 250.00,
    date: "3 days ago",
    time: "18:10",
    taxRefundAmount: 40.00,
    status: "cleared",
    isEligible: true
  },
  {
    id: "tx-03",
    merchant: "REWE Supermarket",
    category: "Grocery",
    amount: 45.30,
    date: "4 days ago",
    time: "09:15",
    taxRefundAmount: 0.00, // Groceries have lower/non-refundable rates
    status: "cleared",
    isEligible: false
  },
  {
    id: "tx-04",
    merchant: "Saturn Alexanderplatz",
    category: "Electronics",
    amount: 534.00,
    date: "Last week",
    time: "11:20",
    taxRefundAmount: 85.44,
    status: "cleared",
    isEligible: true
  },
  {
    id: "tx-05",
    merchant: "S-Bahn Ticket",
    category: "Transit",
    amount: 3.20,
    date: "Last week",
    time: "08:02",
    taxRefundAmount: 0.00,
    status: "cleared",
    isEligible: false
  }
];

export const MOCK_TAX_CLAIMS: TaxClaim[] = [
  {
    id: "CLM-88120",
    merchant: "Apple Store Kurfürstendamm",
    purchaseAmount: 1199.00,
    taxReturned: 191.84,
    status: "review",
    date: "Yesterday",
    receiptUploaded: true
  },
  {
    id: "CLM-71239",
    merchant: "KaDeWe Berlin",
    purchaseAmount: 250.00,
    taxReturned: 40.00,
    status: "approved",
    date: "3 days ago",
    receiptUploaded: true
  },
  {
    id: "CLM-41120",
    merchant: "Saturn Alexanderplatz",
    purchaseAmount: 534.00,
    taxReturned: 85.44,
    status: "refunded",
    date: "14 Oct 2025",
    receiptUploaded: true
  },
  {
    id: "CLM-31002",
    merchant: "ZARA Berlin",
    purchaseAmount: 150.00,
    taxReturned: 24.00,
    status: "refunded",
    date: "02 Sep 2025",
    receiptUploaded: true
  }
];
