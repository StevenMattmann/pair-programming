import {calculatePayslip, Salary} from "./payroll";

describe("Lohnababrechnung", () => {
    test("Test 16 Jähriger mit Lohn 700 Franken (Keine Abzüge )", () =>{
        const salary : Salary = {
            born: new Date("2009-01-09"),
            payday: new Date("2025-01-25"),
            gross: 700,
        };

        const payslip = calculatePayslip(salary);

        expect(payslip.totalDeductions).toBe(0);
        expect(payslip.net).toBe(700);
        expect(payslip.deductions.size).toBe(0);
    })
})