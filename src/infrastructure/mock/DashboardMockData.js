export const dashboardMockData = {
  stats: [
    { title: "Active Advocates", value: "42", detail: "+5% from yesterday", badge: "Active" },
    { title: "Active Users", value: "187", detail: "+12% from last week", badge: "Users" },
    { title: "Active Cases", value: "314", detail: "+1% stable", badge: "Cases" }
  ],
  pulse: {
    activeCases: "24",
    pendingApprovals: "12",
    bars: [
      { id: 1, class: "bar-1" },
      { id: 2, class: "bar-2" },
      { id: 3, class: "bar-3" },
      { id: 4, class: "bar-4" }
    ]
  },
  auditFeed: [
    { title: "Advocate Gupta updated case #314", time: "10:05 AM", accent: "blue" },
    { title: "New client Sarah registered via mobile", time: "09:58 AM", accent: "green" },
    { title: "Admin approved Advocate Patel's request", time: "09:42 AM", accent: "blue" },
    { title: "Appointment scheduled for Case #301", time: "09:30 AM", accent: "green" },
    { title: "New document uploaded for Case #298", time: "09:15 AM", accent: "blue" }
  ],
  applications: [
    { name: 'Ravi Singh', date: '19/01/2022', status: 'Approve / Reject' },
    { name: 'Anya Sharma', date: '18/03/2021', status: 'Approve / Reject' },
    { name: 'Ravi Singh', date: '26/09/2021', status: 'Approve / Reject' },
  ],
  users: [
    { name: 'Maria Khan', status: 'Pending', detail: 'Registered: 08/23' },
    { name: 'David Chen', status: 'Paired', detail: 'Registered: 02/23' },
    { name: 'David Chen', status: 'Pending', detail: 'Registered: 03/23' },
  ]
};
