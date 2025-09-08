import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';

interface EmployeeAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

interface EmployeeEvent {
  title: string;
  employee: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'new-hire' | 'termination';
}

@Component({
  selector: 'app-employees-sidebar',
  templateUrl: './employees-sidebar.component.html',
  styleUrls: ['./employees-sidebar.component.scss'],
  imports: [CommonModule, ThemeLeptonXModule],
  standalone: true
})
export class EmployeesSidebarComponent implements OnInit {
  quickActions: EmployeeAction[] = [
    {
      title: 'Add Employee',
      description: 'Create new employee profile',
      icon: 'fas fa-user-plus',
      route: '/employees/create',
      color: 'success'
    },
    {
      title: 'Employee Directory',
      description: 'View all employees',
      icon: 'fas fa-users',
      route: '/employees',
      color: 'primary'
    },
    {
      title: 'Bulk Import',
      description: 'Import multiple employees',
      icon: 'fas fa-upload',
      route: '/employees/import',
      color: 'info'
    },
    {
      title: 'Reports',
      description: 'Employee analytics',
      icon: 'fas fa-chart-bar',
      route: '/employees/reports',
      color: 'warning'
    }
  ];

  employeeStats = {
    total: 1247,
    active: 1189,
    onLeave: 23,
    newThisMonth: 15
  };

  upcomingEvents: EmployeeEvent[] = [
    {
      title: 'Birthday',
      employee: 'Sarah Johnson',
      date: 'Tomorrow',
      type: 'birthday'
    },
    {
      title: 'Work Anniversary',
      employee: 'Mike Chen',
      date: 'Dec 15',
      type: 'anniversary'
    },
    {
      title: 'New Hire',
      employee: 'Emma Davis',
      date: 'Dec 18',
      type: 'new-hire'
    },
    {
      title: 'Birthday',
      employee: 'David Wilson',
      date: 'Dec 20',
      type: 'birthday'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getEventIconClass(type: string): string {
    switch (type) {
      case 'birthday':
        return 'fas fa-birthday-cake text-warning';
      case 'anniversary':
        return 'fas fa-calendar-check text-success';
      case 'new-hire':
        return 'fas fa-user-plus text-info';
      case 'termination':
        return 'fas fa-user-minus text-danger';
      default:
        return 'fas fa-info-circle text-muted';
    }
  }

  getActionButtonClass(color: string): string {
    return `btn btn-sm btn-outline-${color} w-100 mb-2`;
  }
}
