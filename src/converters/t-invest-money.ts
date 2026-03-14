import type { MoneyValue } from "../gen/common_pb.ts";
import { tInvestQuotation } from "./t-invest-quotation.ts";

/**
 * Переводит число в MoneyValue { units, nano, currency }
 * Пример: (123.4, 'rub') -> { units: 123, nano: 400000000, currency: 'rub' }
 */
export function tInvestMoney(value: number, currency: string): MoneyValue {
	const { units, nano } = tInvestQuotation(value);
	return {
		$typeName: "tinkoff.public.invest.api.contract.v1.MoneyValue",
		units,
		nano,
		currency,
	};
}
