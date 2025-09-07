import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ActivityItem {
  id: string;
  type: 'user' | 'system' | 'document' | 'leave' | 'payroll';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  status?: 'success' | 'warning' | 'info' | 'error';
}

@Component({
  selector: 'app-recent-activities-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activities-modal.html',
  styleUrls: ['./recent-activities-modal.scss']
})
export class RecentActivitiesModal {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  activeTab: 'activities' | 'updates' = 'activities';

  activities: ActivityItem[] = [
    {
      id: '1',
      type: 'user',
      title: 'New Employee Onboarded',
      description: 'John Smith has been successfully onboarded to the Marketing department',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      user: 'HR Manager',
      status: 'success'
    },
    {
      id: '2',
      type: 'leave',
      title: 'Leave Request Approved',
      description: 'Sarah Johnson\'s annual leave request for 5 days has been approved',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      user: 'Department Head',
      status: 'success'
    },
    {
      id: '3',
      type: 'payroll',
      title: 'Payroll Processed',
      description: 'Monthly payroll for March 2025 has been processed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      user: 'Finance Team',
      status: 'success'
    },
    {
      id: '4',
      type: 'document',
      title: 'Policy Document Updated',
      description: 'Employee handbook has been updated with new remote work guidelines',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      user: 'HR Manager',
      status: 'info'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance Completed',
      description: 'Scheduled maintenance window completed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: 'success'
    }
  ];

  dailyUpdates: ActivityItem[] = [
    {
      id: 'u1',
      type: 'system',
      title: 'New Feature: Enhanced Leave Management',
      description: 'Improved leave request workflow with automatic approvals for short leaves',
      timestamp: new Date()
    },
    {
      id: 'u2',
      type: 'system',
      title: 'Security Update',
      description: 'Enhanced password policies and two-factor authentication requirements',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
    },
    {
      id: 'u3',
      type: 'system',
      title: 'Performance Improvements',
      description: 'Dashboard loading times reduced by 40% with optimized queries',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    }
  ];

  closeModal(): void {
    this.close.emit();
  }

  viewAll(): void {
    // Navigate to full activities page
    console.log('Navigate to full activities page');
    this.closeModal();
  }

  getActivityIcon(type: string): string {
    const icons = {
      user: 'bi bi-person-circle',
      system: 'bi bi-gear',
      document: 'bi bi-file-earmark-text',
      leave: 'bi bi-calendar-event',
      payroll: 'bi bi-cash-coin'
    };
    return icons[type as keyof typeof icons] || 'bi bi-circle';
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  }
}
