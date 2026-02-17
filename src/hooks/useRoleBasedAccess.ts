import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type UserRole = 'admin' | 'operator' | 'viewer';

interface RoleAccess {
  canEdit: boolean;
  canExport: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
}

const rolePermissions: Record<UserRole, RoleAccess> = {
  admin: {
    canEdit: true,
    canExport: true,
    canViewAnalytics: true,
    canManageUsers: true
  },
  operator: {
    canEdit: true,
    canExport: true,
    canViewAnalytics: true,
    canManageUsers: false
  },
  viewer: {
    canEdit: false,
    canExport: true,
    canViewAnalytics: true,
    canManageUsers: false
  }
};

export function useRoleBasedAccess() {
  const [userRole, setUserRole] = useState<UserRole>('viewer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        
        if (data?.role) {
          setUserRole(data.role as UserRole);
        }
      }
      setLoading(false);
    }

    fetchUserRole();
  }, []);

  return {
    role: userRole,
    permissions: rolePermissions[userRole],
    loading
  };
}