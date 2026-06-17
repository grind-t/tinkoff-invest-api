import type { Timestamp } from "@bufbuild/protobuf/wkt";

/**
 * Переводит Timestamp в Date.
 * Пример: { seconds: 1719648000n, nanos: 500000000 } -> Date("2024-06-29T08:00:00.500Z")
 */
export function tInvestDate(value: Timestamp): Date {
	return new Date(Number(value.seconds) * 1e3 + Math.floor(value.nanos / 1e6));
}
