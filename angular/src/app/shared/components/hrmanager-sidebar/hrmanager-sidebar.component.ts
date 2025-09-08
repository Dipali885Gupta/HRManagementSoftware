import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';

interface HRAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

interface HRMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

@Component({
  selector: 'app-hrmanager-sidebar',
  templateUrl: './hrmanager-sidebar.component.html',
  styleUrls: ['./hrmanager-sidebar.component.scss'],
  imports: [CommonModule, ThemeLeptonXModule],
  standalone: true
})
export class HRManagerSidebarComponent implements OnInit {
  quickActions: HRAction[] = [
    {
      title: 'Employee Reports',
      description: 'Generate HR reports',
      icon: 'fas fa-chart-bar',
      route: '/hrmanagers/reports',
      color: 'primary'
    },
    {
      title: 'Policy Management',
      description: 'Update HR policies',
      icon: 'fas fa-file-contract',
      route: '/hrmanagers/policies',
      color: 'info'
    },
    {
      title: 'Performance Reviews',
      description: 'Manage reviews',
      icon: 'fas fa-star',
      route: '/hrmanagers/reviews',
      color: 'warning'
    },
    {
      title: 'Recruitment',
      description: 'Hiring pipeline',
      icon: 'fas fa-user-plus',
      route: '/hrmanagers/recruitment',
      color: 'success'
    }
  ];

  hrMetrics: HRMetric[] = [
    {
      title: 'Open Positions',
      value: '12',
      change: '+3',
      changeType: 'neutral',
      icon: 'fas fa-briefcase'
    },
    {
      title: 'Pending Reviews',
      value: '28',
      change: '-5',
      changeType: 'positive',
      icon: 'fas fa-clipboard-check'
    },
    {
      title: 'Training Programs',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: 'fas fa-graduation-cap'
    },
    {
      title: 'Employee Satisfaction',
      value: '4.2/5',
      change: '+0.3',
      changeType: 'positive',
      icon: 'fas fa-smile'
    }
  ];

  recentActivities = [
    {
      title: 'New Policy Updated',
      description: 'Remote work policy revised',
      time: '2 hours ago',
      type: 'policy'
    },
    {
      title: 'Performance Review Completed',
      description: 'Sarah Johnson\'s review finalized',
      time: '4 hours ago',
      type: 'review'
    },
    {
      title: 'Interview Scheduled',
      description: 'Senior Developer position',
      time: '6 hours ago',
      type: 'recruitment'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

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

  getActivityIconClass(type: string): string {
    switch (type) {
      case 'policy':
        return 'fas fa-file-contract text-info';
      case 'review':
        return 'fas fa-star text-warning';
      case 'recruitment':
        return 'fas fa-user-plus text-success';
      default:
        return 'fas fa-info-circle text-muted';
    }
  }

  getActionButtonClass(color: string): string {
    return `btn btn-sm btn-outline-${color} w-100 mb-2`;
  }
}
