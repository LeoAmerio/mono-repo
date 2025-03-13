export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export interface Investment {
  id: number;
  name: string;
  amount: number;
  type: string;
  date: Date;
}

export interface CreateExpenseDTO {
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface CreateInvestmentDTO {
  name: string;
  amount: number;
  type: string;
  date: Date;
}
