import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';

interface PayrollAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

interface PayrollSchedule {
  period: string;
  dueDate: string;
  status: 'pending' | 'processing' | 'completed' | 'overdue' | 'scheduled';
  amount: string;
}

@Component({
  selector: 'app-payroll-sidebar',
  templateUrl: './payroll-sidebar.component.html',
  styleUrls: ['./payroll-sidebar.component.scss'],
  imports: [CommonModule, ThemeLeptonXModule],
  standalone: true
})
export class PayrollSidebarComponent implements OnInit {
  quickActions: PayrollAction[] = [
    {
      title: 'Process Payroll',
      description: 'Run monthly payroll',
      icon: 'fas fa-play-circle',
      route: '/payroll-adjustments/process',
      color: 'success'
    },
    {
      title: 'Adjustments',
      description: 'Manage salary adjustments',
      icon: 'fas fa-sliders-h',
      route: '/payroll-adjustments',
      color: 'primary'
    },
    {
      title: 'Reports',
      description: 'Payroll analytics',
      icon: 'fas fa-chart-bar',
      route: '/payroll-adjustments/reports',
      color: 'info'
    },
    {
      title: 'Tax Documents',
      description: 'Generate tax forms',
      icon: 'fas fa-file-invoice-dollar',
      route: '/payroll-adjustments/tax-documents',
      color: 'warning'
    }
  ];

  payrollStats = {
    totalPayroll: '$2,450,000',
    employeesPaid: 1189,
    pendingAdjustments: 15,
    nextPayrollDate: 'Dec 31, 2024'
  };

  upcomingPayrolls: PayrollSchedule[] = [
    {
      period: 'December 2024',
      dueDate: 'Dec 31',
      status: 'pending',
      amount: '$2,450,000'
    },
    {
      period: 'Bonus Payment',
      dueDate: 'Jan 15',
      status: 'pending',
      amount: '$125,000'
    },
    {
      period: 'January 2025',
      dueDate: 'Jan 31',
      status: 'scheduled',
      amount: '$2,480,000'
    }
  ];

  recentPayments = [
    {
      period: 'November 2024',
      processedDate: 'Dec 1',
      amount: '$2,420,000',
      status: 'completed'
    },
    {
      period: 'October 2024',
      processedDate: 'Nov 1',
      amount: '$2,395,000',
      status: 'completed'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'badge bg-success';
      case 'processing':
        return 'badge bg-info';
      case 'pending':
        return 'badge bg-warning';
      case 'overdue':
        return 'badge bg-danger';
      case 'scheduled':
        return 'badge bg-secondary';
      default:
        return 'badge bg-light';
    }
  }

  getActionButtonClass(color: string): string {
    return `btn btn-sm btn-outline-${color} w-100 mb-2`;
  }

  formatCurrency(amount: string): string {
    return amount;
  }
}
