import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Quotation } from "../gen/common_pb.ts";
import { tInvestQuotation } from "./t-invest-quotation.ts";

const q = (units: bigint, nano: number): Quotation => ({
	$typeName: "tinkoff.public.invest.api.contract.v1.Quotation",
	units,
	nano,
});

describe("tInvestQuotation", () => {
	it("zero", () => assert.deepEqual(tInvestQuotation(0), q(0n, 0)));

	it("positive integer + fraction (docstring example)", () =>
		assert.deepEqual(tInvestQuotation(123.4), q(123n, 400_000_000)));

	it("whole number, no fraction", () =>
		assert.deepEqual(tInvestQuotation(100), q(100n, 0)));

	it("only fractional part", () =>
		assert.deepEqual(tInvestQuotation(0.25), q(0n, 250_000_000)));

	it("minimal nano precision", () =>
		assert.deepEqual(tInvestQuotation(1e-9), q(0n, 1)));

	it("negative integer", () =>
		assert.deepEqual(tInvestQuotation(-5), q(-5n, -0)));

	it("negative with fraction", () =>
		assert.deepEqual(tInvestQuotation(-1.5), q(-1n, -500_000_000)));

	it("large integer (MAX_SAFE_INTEGER)", () =>
		assert.deepEqual(
			tInvestQuotation(Number.MAX_SAFE_INTEGER),
			q(9_007_199_254_740_991n, 0),
		));

	it("negative zero treated as positive zero", () =>
		assert.deepEqual(tInvestQuotation(-0), q(0n, 0)));
});
