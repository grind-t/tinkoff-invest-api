import { env } from 'node:process';
import { T_INVEST_SANDBOX_URL, TInvestApi } from './src/index.ts';

env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const token = env.T_INVEST_READONLY_TOKEN as string;

const api = new TInvestApi(token, T_INVEST_SANDBOX_URL);

const price = await api.marketData.getLastPrices({
  instrumentId: ['498ec3ff-ef27-4729-9703-a5aac48d5789']
}).then(v => v.lastPrices[0])

console.log(price)
