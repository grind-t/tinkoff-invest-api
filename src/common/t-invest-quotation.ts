import type { Quotation } from "../gen/common_pb.ts";

/**
 * Переводит число в Quotation.
 * Пример: 123.4 -> { units: 123, nano: 400000000 }
 */
export function tInvestQuotation(value: number): Quotation {
	const sign = value < 0 ? -1 : 1;
	const absValue = Math.abs(value);
	const units = Math.floor(absValue);
	const nano = Math.round((absValue - units) * 1e9);
	return {
		$typeName: "tinkoff.public.invest.api.contract.v1.Quotation",
		units: BigInt(sign * units),
		nano: sign * nano,
	};
}
