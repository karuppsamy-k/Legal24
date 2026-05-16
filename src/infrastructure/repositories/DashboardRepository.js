import { usersMockData } from '../mock/UserMockData.js';
import { advocatesMockData, casesMockData, approvalsMockData } from '../mock/AdditionalMockData.js';
import { dashboardMockData as baseMockData } from '../mock/DashboardMockData.js';

export const DashboardRepository = {
  getDashboardData: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Calculate dynamic stats
    const activeAdvocatesCount = advocatesMockData.filter(a => a.status === 'Active').length;
    const activeUsersCount = usersMockData.filter(u => u.status === 'Active').length;
    const activeCasesCount = casesMockData.filter(c => c.status === 'Active').length;
    const pendingApprovalsCount = approvalsMockData.filter(a => a.status === 'Pending').length;

    return {
      ...baseMockData,
      stats: [
        { 
          title: "Active Advocates", 
          value: activeAdvocatesCount.toString(), 
          detail: "+5% from yesterday", 
          badge: "Active" 
        },
        { 
          title: "Active Users", 
          value: activeUsersCount.toString(), 
          detail: "+12% from last week", 
          badge: "Users" 
        },
        { 
          title: "Active Cases", 
          value: activeCasesCount.toString(), 
          detail: "+1% stable", 
          badge: "Cases" 
        }
      ],
      pulse: {
        ...baseMockData.pulse,
        activeCases: activeCasesCount.toString(),
        pendingApprovals: pendingApprovalsCount.toString(),
      }
    };
  }
};
