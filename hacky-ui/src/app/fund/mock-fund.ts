import { Fund } from './fund.model';

export const FUNDS: Fund[] = [
  {
    name: "Hacky Health Sciences Corporate Class A UG",
    topSubscriber: 10,
    topPerformance: 6,
    percentDealers: 9,
    category: "Sector Equity",
    price: 18.2,
    fundId: 10,
    links: [
      {
        rel: "self",
        href: "http://localhost:8090/funds/10"
      }
    ]
  },
  {
    name: "Hacky Health Sciences Corporate Class G",
    topSubscriber: 9,
    topPerformance: 2,
    percentDealers: 6,
    category: "Geographic Equity",
    price: 48.55,
    fundId: 9,
    links: [
      {
        rel: "self",
        href: "http://localhost:8090/funds/9"
      }
    ]
  },
  {
    name: "Hacky Leadership Equity Fund Cl G",
    topSubscriber: 8,
    topPerformance: 3,
    percentDealers: 22,
    category: "Geographic Equity",
    price: 718.2,
    fundId: 8,
    links: [
      {
        rel: "self",
        href: "http://localhost:8090/funds/8"
      }
    ]
  },
  {
    name: "Hacky Leadership Equity Fund Cl A",
    topSubscriber: 7,
    topPerformance: 4,
    percentDealers: 15,
    category: "Global Equity",
    price: 164.7,
    fundId: 7,
    links: [
      {
        rel: "self",
        href: "http://localhost:8090/funds/7"
      }
    ]
  },
  {
    name: "Hacky Global Growth Class Series F",
    topSubscriber: 6,
    topPerformance: 7,
    percentDealers: 17,
    category: "Sector Equity",
    price: 75.8,
    fundId: 6,
    links: [
      {
        rel: "self",
        href: "http://localhost:8090/funds/6"
      }
    ]
  }
];
