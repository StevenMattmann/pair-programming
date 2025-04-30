export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {

  const deductions: Deductions = new Map();
  const gross = salary.gross;
  const annual = gross * 12


  const ahvStart = new Date(salary.born.getFullYear() + 17, 0, 1 );
  const needsAhv = salary.payday >= ahvStart;

  if (needsAhv) {
    deductions.set("AHV" , + (gross * 0.087).toFixed(2));
    deductions.set("IV" , + (gross * 0.014).toFixed(2));
    deductions.set("EO" , + (gross * 0.005).toFixed(2));
  }

  if (needsAhv && annual >= 2500) {
    deductions.set("ALV", + (gross * 0.011).toFixed(2));
    deductions.set("NBU", + (gross * 0.0073).toFixed(2));
  }


  return {
    salary,
    deductions,
    totalDeductions: 0,
    net: gross,
  };
}