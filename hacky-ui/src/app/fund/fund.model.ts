import { FundLink } from './fund-link.model'
export class Fund {
  name: string;
  topSubscriber: number;
  topPerformance: number;
  percentDealers: number;
  category: string;
  price: number;
  fundId: number;
  links?: FundLink[];
}
