import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { tInvestDate } from "./t-invest-date.ts";

const ts = (seconds: bigint, nanos: number) =>
	({ $typeName: "google.protobuf.Timestamp" as const, seconds, nanos });

describe("tInvestDate", () => {
	it("zero timestamp → epoch", () =>
		assert.deepEqual(tInvestDate(ts(0n, 0)), new Date(0)));

	it("seconds only", () =>
		assert.deepEqual(
			tInvestDate(ts(1719648000n, 0)),
			new Date("2024-06-29T08:00:00.000Z"),
		));

	it("seconds + nanos (millisecond precision)", () =>
		assert.deepEqual(
			tInvestDate(ts(1719648000n, 500_000_000)),
			new Date("2024-06-29T08:00:00.500Z"),
		));

	it("sub-millisecond nanos truncated", () =>
		assert.deepEqual(
			tInvestDate(ts(0n, 1_500_999)),
			new Date(1),
		));

	it("negative seconds (before epoch)", () =>
		assert.deepEqual(
			tInvestDate(ts(-1n, 0)),
			new Date(-1000),
		));
});
