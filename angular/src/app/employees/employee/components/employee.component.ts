import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbTimeAdapter,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { ListService } from '@abp/ng.core';
import { PageComponent } from '@abp/ng.components/page';
import { EmployeeViewService } from '../services/employee.service';
import { EmployeeDetailViewService } from '../services/employee-detail.service';
import { AbstractEmployeeComponent } from './employee.abstract.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CoreModule } from '@abp/ng.core';
import { EmployeeService } from '../../../proxy/employees/employee.service';
import { EmployeeDto } from '../../../proxy/employees/models';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [
    ListService,
    EmployeeViewService,
    EmployeeDetailViewService,
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter , useClass: TimeAdapter }
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    PageComponent,
    NgxDatatableModule,
    ThemeSharedModule,
    CoreModule
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeComponent extends AbstractEmployeeComponent implements OnInit {
  // Remove hardcoded employee number
  // employeeNumber = 'EMP001';

  // Employee data from API
  employee: EmployeeDto | null = null;
  loading = false;

  // Dummy data for leave history table
  leaveHistory = [
    {
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      leaveStatus: 'Approved',
      reason: 'Medical leave',
      leavereqdate: '2024-01-10'
    },
    {
      startDate: '2024-02-01',
      endDate: '2024-02-03', 
      leaveStatus: 'Rejected',
      reason: 'Personal matters',
      leavereqdate: '2024-01-28'
    },
    {
      startDate: '2024-03-10',
      endDate: '2024-03-15',
      leaveStatus: 'Pending',
      reason: 'Vacation',
      leavereqdate: '2024-03-05'
    }
  ];

  constructor(
    private employeeService: EmployeeService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('EmployeeComponent initialized');
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails(): void {
    this.loading = true;
    console.log('Loading employee details...');

    this.employeeService.getNewEmployeeNumber().subscribe({
      next: (employee: EmployeeDto) => {
        console.log('Employee details received:', employee);
        this.employee = employee;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employee details:', error);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    console.log('Getting status class for:', status);
    const className = (() => {
      switch(status.toLowerCase()) {
        case 'approved': return 'status-approved';
        case 'rejected': return 'status-rejected';
        case 'pending': return 'status-pending';
        default: return '';
      }
    })();
    console.log('Status class result:', className);
    return className;
  }
}
