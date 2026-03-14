import {
	type Client,
	createClient,
	type Interceptor,
} from "@connectrpc/connect";
import { createGrpcTransport } from "@connectrpc/connect-node";
import { InstrumentsService } from "../gen/instruments_pb.ts";
import { MarketDataService } from "../gen/marketdata_pb.ts";
import { OperationsService } from "../gen/operations_pb.ts";
import { OrdersService } from "../gen/orders_pb.ts";
import { SandboxService } from "../gen/sandbox_pb.ts";
import { SignalService } from "../gen/signals_pb.ts";
import { StopOrdersService } from "../gen/stoporders_pb.ts";
import { UsersService } from "../gen/users_pb.ts";
import { T_INVEST_PROD_URL } from "./environments.ts";

export class TInvestApi {
	public instruments: Client<typeof InstrumentsService>;
	public marketData: Client<typeof MarketDataService>;
	public operations: Client<typeof OperationsService>;
	public orders: Client<typeof OrdersService>;
	public sandbox: Client<typeof SandboxService>;
	public signals: Client<typeof SignalService>;
	public stopOrders: Client<typeof StopOrdersService>;
	public users: Client<typeof UsersService>;

	constructor(token: string, baseUrl = T_INVEST_PROD_URL) {
		const baseInterceptor: Interceptor = (next) => (req) => {
			req.header.set("Authorization", `Bearer ${token}`);
			req.header.set("x-app-name", "grind-t.tinkoff-invest-api");
			return next(req);
		};

		const transport = createGrpcTransport({
			baseUrl,
			interceptors: [baseInterceptor],
		});

		this.instruments = createClient(InstrumentsService, transport);
		this.marketData = createClient(MarketDataService, transport);
		this.operations = createClient(OperationsService, transport);
		this.orders = createClient(OrdersService, transport);
		this.sandbox = createClient(SandboxService, transport);
		this.signals = createClient(SignalService, transport);
		this.stopOrders = createClient(StopOrdersService, transport);
		this.users = createClient(UsersService, transport);
	}
}
