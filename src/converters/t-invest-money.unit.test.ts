import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { MoneyValue } from "../gen/common_pb.ts";
import { tInvestMoney } from "./t-invest-money.ts";

const m = (units: bigint, nano: number, currency: string): MoneyValue => ({
	$typeName: "tinkoff.public.invest.api.contract.v1.MoneyValue",
	units,
	nano,
	currency,
});

describe("tInvestMoney", () => {
	it("sets currencies", () => {
		assert.deepEqual(tInvestMoney(1, "rub"), m(1n, 0, "rub"));
		assert.deepEqual(tInvestMoney(1, "usd"), m(1n, 0, "usd"));
		assert.deepEqual(tInvestMoney(1, "eur"), m(1n, 0, "eur"));
	});
});
