export const StatModel = (title, value, detail, badge) => ({
  title,
  value,
  detail,
  badge
});

export const PulseModel = (activeCases, pendingApprovals, bars) => ({
  activeCases,
  pendingApprovals,
  bars // Array of { id, width }
});

export const AuditFeedModel = (title, time, accent) => ({
  title,
  time,
  accent
});

export const DashboardDataModel = (stats, pulse, auditFeed, applications, users) => ({
  stats,
  pulse,
  auditFeed,
  applications,
  users
});
