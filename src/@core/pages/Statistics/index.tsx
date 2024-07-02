import dynamic from "next/dynamic";

export const StatisticsOrgsAsync = dynamic(() =>
  import("./Orgs/ui").then((res) => res.StatisticsOrgs)
);

export const StatisticsTransactionsAsync = dynamic(() =>
  import("./Transactions/ui").then((res) => res.StatisticsTransactions)
);

export const StatisticsUsersAsync = dynamic(() =>
  import("./Users/ui").then((res) => res.StatisticsUsers)
);

export const StatisticsOpportunitiesAsync = dynamic(() =>
  import("./Opportunities/ui").then((res) => res.StatisticsOpportunities)
);
