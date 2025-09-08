import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';

interface LeaveAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

interface UpcomingLeave {
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'urgent';
}

@Component({
  selector: 'app-leave-requests-sidebar',
  templateUrl: './leave-requests-sidebar.component.html',
  styleUrls: ['./leave-requests-sidebar.component.scss'],
  imports: [CommonModule, ThemeLeptonXModule],
  standalone: true
})
export class LeaveRequestsSidebarComponent implements OnInit {
  quickActions: LeaveAction[] = [
    {
      title: 'New Leave Request',
      description: 'Submit leave application',
      icon: 'fas fa-plus-circle',
      route: '/leave-requests/create',
      color: 'success'
    },
    {
      title: 'My Leave History',
      description: 'View past requests',
      icon: 'fas fa-history',
      route: '/leave-requests/my-history',
      color: 'primary'
    },
    {
      title: 'Pending Approvals',
      description: 'Review team requests',
      icon: 'fas fa-clock',
      route: '/leave-requests/pending',
      color: 'warning'
    },
    {
      title: 'Leave Calendar',
      description: 'Team leave overview',
      icon: 'fas fa-calendar-alt',
      route: '/leave-requests/calendar',
      color: 'info'
    }
  ];

  leaveStats = {
    pendingRequests: 23,
    approvedThisMonth: 45,
    totalDaysUsed: 128,
    averageApprovalTime: '2.3 days'
  };

  upcomingLeaves: UpcomingLeave[] = [
    {
      employee: 'Sarah Johnson',
      type: 'Annual Leave',
      startDate: 'Dec 20',
      endDate: 'Dec 24',
      days: 5,
      status: 'approved'
    },
    {
      employee: 'Mike Chen',
      type: 'Sick Leave',
      startDate: 'Dec 22',
      endDate: 'Dec 22',
      days: 1,
      status: 'approved'
    },
    {
      employee: 'Emma Davis',
      type: 'Maternity Leave',
      startDate: 'Jan 15',
      endDate: 'Mar 15',
      days: 60,
      status: 'approved'
    },
    {
      employee: 'David Wilson',
      type: 'Annual Leave',
      startDate: 'Dec 26',
      endDate: 'Dec 30',
      days: 5,
      status: 'pending'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'urgent':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  getLeaveTypeColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'annual leave':
        return 'text-success';
      case 'sick leave':
        return 'text-danger';
      case 'maternity leave':
        return 'text-info';
      case 'paternity leave':
        return 'text-primary';
      default:
        return 'text-muted';
    }
  }

  getActionButtonClass(color: string): string {
    return `btn btn-sm btn-outline-${color} w-100 mb-2`;
  }
}
