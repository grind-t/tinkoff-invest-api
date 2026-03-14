import type { MoneyValue, Quotation } from "../gen/common_pb.ts";

/**
 * Переводит Quotation или MoneyValue в число.
 * Пример: { units: 123, nano: 400000000 } -> 123.4
 */
export function tInvestNumber(value: Quotation | MoneyValue): number {
	return Number(value.units) + value.nano / 1e9;
}
