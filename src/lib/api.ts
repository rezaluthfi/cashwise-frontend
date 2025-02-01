//DATA DUMMY
export interface Transaction {
  _id: string;
  user_id: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  description: string;
  category?: string;
}

export interface Budget {
  _id: string;
  user_id: string;
  monthly_limit: number;
  month: string;
}

// Generate dummy transactions for the current month
const generateMonthlyTransactions = (
  year: number,
  month: number
): Transaction[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const transactions: Transaction[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    // Add income every 25th
    if (day === 25) {
      transactions.push({
        _id: `income_${year}_${month}_${day}`,
        user_id: "user1",
        amount: 5000000, // Gaji bulanan
        type: "income",
        date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`,
        description: "Gaji Bulanan",
        category: "Salary",
      });
    }

    // Add random expenses throughout the month
    if (Math.random() > 0.7) {
      // 30% chance of expense on any day
      transactions.push({
        _id: `expense_${year}_${month}_${day}`,
        user_id: "user1",
        amount: Math.floor(Math.random() * 200000) + 50000, // Random expense between 50k-250k
        type: "expense",
        date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`,
        description: ["Makan", "Transport", "Belanja", "Hiburan"][
          Math.floor(Math.random() * 4)
        ],
        category: "Daily",
      });
    }
  }

  return transactions;
};

// Generate current month's transactions
const currentDate = new Date();
const DUMMY_TRANSACTIONS: Transaction[] = generateMonthlyTransactions(
  currentDate.getFullYear(),
  currentDate.getMonth()
);

const DUMMY_BUDGETS: Budget[] = [
  {
    _id: "1",
    user_id: "user1",
    monthly_limit: 3000000,
    month: `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`,
  },
];

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email === "user@example.com" && password === "password123") {
      return {
        data: {
          token: "dummy_token_12345",
          user: {
            id: "user1",
            name: "User Test",
            email: "user@example.com",
          },
        },
      };
    }
    throw new Error("Invalid credentials");
  },

  register: async (name: string, email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: {
        token: "dummy_token_12345",
        user: {
          id: "user1",
          name,
          email,
        },
      },
    };
  },

  setAuthToken: (token: string) => {
    document.cookie = `token=${token}; Path=/; Secure; Max-Age=${
      24 * 60 * 60
    }; SameSite=Strict;`;
  },
};

// Transactions API
export const transactionsApi = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: DUMMY_TRANSACTIONS };
  },

  create: async (data: {
    amount: number;
    type: "income" | "expense";
    date: string;
    description: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newTransaction: Transaction = {
      _id: Math.random().toString(36).substring(7),
      user_id: "user1",
      ...data,
    };
    DUMMY_TRANSACTIONS.push(newTransaction);
    return { data: newTransaction };
  },

  update: async (
    id: string,
    data: Partial<{
      amount: number;
      type: "income" | "expense";
      date: string;
      description: string;
    }>
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = DUMMY_TRANSACTIONS.findIndex((t) => t._id === id);
    if (index === -1) throw new Error("Transaction not found");

    DUMMY_TRANSACTIONS[index] = {
      ...DUMMY_TRANSACTIONS[index],
      ...data,
    };
    return { data: DUMMY_TRANSACTIONS[index] };
  },

  delete: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = DUMMY_TRANSACTIONS.findIndex((t) => t._id === id);
    if (index === -1) throw new Error("Transaction not found");

    DUMMY_TRANSACTIONS.splice(index, 1);
    return { data: { message: "Transaction deleted" } };
  },
};

// Budgets API
export const budgetsApi = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: DUMMY_BUDGETS };
  },

  create: async (data: { monthly_limit: number; month: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newBudget: Budget = {
      _id: Math.random().toString(36).substring(7),
      user_id: "user1",
      ...data,
    };
    DUMMY_BUDGETS.push(newBudget);
    return { data: newBudget };
  },

  update: async (
    id: string,
    data: { monthly_limit: number; month: string }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = DUMMY_BUDGETS.findIndex((b) => b._id === id);
    if (index === -1) throw new Error("Budget not found");

    DUMMY_BUDGETS[index] = {
      ...DUMMY_BUDGETS[index],
      ...data,
    };
    return { data: DUMMY_BUDGETS[index] };
  },
};

// Reports API
export const reportsApi = {
  getMonthly: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const totalIncome = DUMMY_TRANSACTIONS.filter(
      (t) => t.type === "income"
    ).reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = DUMMY_TRANSACTIONS.filter(
      (t) => t.type === "expense"
    ).reduce((sum, t) => sum + t.amount, 0);

    return {
      data: {
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense,
        transactions: DUMMY_TRANSACTIONS,
      },
    };
  },

  getYearly: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: {
        income: 60000000,
        expense: 25000000,
        balance: 35000000,
        monthly_data: Array.from({ length: 12 }, (_, i) => ({
          month: `${currentDate.getFullYear()}-${String(i + 1).padStart(
            2,
            "0"
          )}`,
          income: 5000000,
          expense: Math.floor(Math.random() * 1500000) + 1000000,
        })),
      },
    };
  },
};
