import React, { Suspense } from 'react';
import { useRoleBasedAccess } from '../../hooks/useRoleBasedAccess';

const AnomalyDetection = React.lazy(() => 
  import('../Analytics/AnomalyDetection').then(m => ({ default: m.AnomalyDetection }))
);
const SustainabilityLeaderboard = React.lazy(() => 
  import('../Leaderboard/SustainabilityLeaderboard').then(m => ({ default: m.SustainabilityLeaderboard }))
);

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  const { permissions, loading } = useRoleBasedAccess();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
        
        {permissions.canViewAnalytics && (
          <div className="mt-8 space-y-6">
            <Suspense fallback={<div>Loading analytics...</div>}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnomalyDetection records={[]} />
                <SustainabilityLeaderboard entries={[]} />
              </div>
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}