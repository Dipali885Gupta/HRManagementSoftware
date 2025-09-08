import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';

interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface RecentUpdate {
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning';
}

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  imports: [CommonModule, ThemeLeptonXModule],
  standalone: true
})
export class DashboardSidebarComponent implements OnInit {
  metrics: DashboardMetric[] = [
    {
      title: 'Total Employees',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'fas fa-users'
    },
    {
      title: 'Active Leave Requests',
      value: '23',
      change: '+5',
      changeType: 'neutral',
      icon: 'fas fa-calendar-alt'
    },
    {
      title: 'Pending Payroll',
      value: '8',
      change: '-2',
      changeType: 'positive',
      icon: 'fas fa-money-bill-wave'
    },
    {
      title: 'New Hires This Month',
      value: '15',
      change: '+8',
      changeType: 'positive',
      icon: 'fas fa-user-plus'
    }
  ];

  recentUpdates: RecentUpdate[] = [
    {
      title: 'New Employee Onboarded',
      description: 'John Smith joined the Marketing team',
      time: '2 hours ago',
      type: 'success'
    },
    {
      title: 'Leave Request Approved',
      description: 'Sarah Johnson\'s vacation approved',
      time: '4 hours ago',
      type: 'info'
    },
    {
      title: 'Payroll Processed',
      description: 'Monthly payroll completed successfully',
      time: '1 day ago',
      type: 'success'
    },
    {
      title: 'Policy Update',
      description: 'Remote work policy updated',
      time: '2 days ago',
      type: 'warning'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  getChangeIconClass(changeType: string): string {
    switch (changeType) {
      case 'positive':
        return 'fas fa-arrow-up text-success';
      case 'negative':
        return 'fas fa-arrow-down text-danger';
      default:
        return 'fas fa-minus text-muted';
    }
  }

  getUpdateIconClass(type: string): string {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle text-success';
      case 'warning':
        return 'fas fa-exclamation-triangle text-warning';
      default:
        return 'fas fa-info-circle text-info';
    }
  }
}
