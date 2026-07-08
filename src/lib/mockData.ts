export type MembershipStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

export interface Subscriber {
  id: string;
  name: string;
  status: MembershipStatus;
  planName: string;
  fuelLimit: number;
  availableBalance: number;
  outstandingBalance: number;
  nextRepaymentDate: string;
}

export interface FuelCode {
  code: string;
  amount: number;
  expiryTime: number; // Unix timestamp
  status: 'ACTIVE' | 'USED' | 'EXPIRED' | 'CANCELLED';
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: 'FUEL' | 'REPAYMENT';
  stationName?: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

// Mock Subscriber Data
export const mockSubscriber: Subscriber = {
  id: 'sub-123',
  name: 'John Doe',
  status: 'ACTIVE',
  planName: 'Pro Member',
  fuelLimit: 150000,
  availableBalance: 120000,
  outstandingBalance: 30000,
  nextRepaymentDate: '2025-05-01',
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'tx-001',
    amount: 30000,
    date: '2025-04-10T14:30:00Z',
    type: 'FUEL',
    stationName: 'Puma Energy - Upanga',
    status: 'COMPLETED'
  },
  {
    id: 'tx-002',
    amount: 50000,
    date: '2025-03-25T09:15:00Z',
    type: 'REPAYMENT',
    status: 'COMPLETED'
  }
];

// Helper to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    maximumFractionDigits: 0
  }).format(amount);
}
