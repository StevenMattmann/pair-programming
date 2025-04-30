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

    test("Test 18 Jähriger mit Lohn 1200 Franken (Alle Abzüge ausser PK )", () =>{
        const salary : Salary = {
            born: new Date("2007-01-09"),
            payday: new Date("2025-01-25"),
            gross: 1200,
        };

        const payslip = calculatePayslip(salary);

        expect(payslip.deductions.get("AHV")).toBeCloseTo(1200 * 0.087, 2);
        expect(payslip.deductions.get("IV")).toBeCloseTo(1200 * 0.014, 2);
        expect(payslip.deductions.get("EO")).toBeCloseTo(1200 * 0.005, 2);
        expect(payslip.deductions.get("ALV")).toBeCloseTo(1200 * 0.011, 2);
        expect(payslip.deductions.get("NBU")).toBeCloseTo(1200 * 0.0073, 2);
        expect(payslip.deductions.get("PK")).toBeUndefined();

    })


})