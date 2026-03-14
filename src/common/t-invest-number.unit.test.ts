import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { MoneyValue, Quotation } from "../gen/common_pb.ts";
import { tInvestNumber } from "./t-invest-number.ts";

const q = (units: bigint, nano: number): Quotation => ({
	$typeName: "tinkoff.public.invest.api.contract.v1.Quotation",
	units,
	nano,
});

const m = (units: bigint, nano: number, currency: string): MoneyValue => ({
	$typeName: "tinkoff.public.invest.api.contract.v1.MoneyValue",
	units,
	nano,
	currency,
});

describe("tInvestNumber", () => {
	it("zero", () => assert.equal(tInvestNumber(q(0n, 0)), 0));

	it("positive integer + fraction (docstring example)", () =>
		assert.equal(tInvestNumber(q(123n, 400_000_000)), 123.4));

	it("whole number, no fraction", () =>
		assert.equal(tInvestNumber(q(100n, 0)), 100));

	it("only fractional part", () =>
		assert.equal(tInvestNumber(q(0n, 250_000_000)), 0.25));

	it("minimal nano precision", () =>
		assert.equal(tInvestNumber(q(0n, 1)), 1e-9));

	it("negative integer", () => assert.equal(tInvestNumber(q(-5n, 0)), -5));

	it("negative integer + negative fraction", () =>
		assert.equal(tInvestNumber(q(-1n, -500_000_000)), -1.5));

	it("large bigint (MAX_SAFE_INTEGER)", () =>
		assert.equal(
			tInvestNumber(q(9_007_199_254_740_991n, 0)),
			Number.MAX_SAFE_INTEGER,
		));

	it("MoneyValue: currency field ignored", () =>
		assert.equal(tInvestNumber(m(50n, 0, "RUB")), 50));
});
