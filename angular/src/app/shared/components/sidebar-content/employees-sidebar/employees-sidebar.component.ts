import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-people me-2"></i>
          <span>Employee Management</span>
        </h5>
        <div class="mt-3">
          <div class="action-card" (click)="navigateToAddEmployee()">
            <div class="action-icon">
              <i class="bi bi-person-plus"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Add New Employee</div>
              <div class="action-description">Create new employee profile</div>
            </div>
          </div>

          <div class="action-card" (click)="navigateToBulkImport()">
            <div class="action-icon">
              <i class="bi bi-upload"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Bulk Import</div>
              <div class="action-description">Import multiple employees</div>
            </div>
          </div>

          <div class="action-card" (click)="navigateToReports()">
            <div class="action-icon">
              <i class="bi bi-graph-up"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Employee Reports</div>
              <div class="action-description">View analytics & reports</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-person-badge me-2"></i>
          <span>Quick Stats</span>
        </h5>
        <div class="mt-3">
          <div class="stat-item">
            <div class="stat-label">Active Employees</div>
            <div class="stat-value">1,234</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">New This Month</div>
            <div class="stat-value">12</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Departments</div>
            <div class="stat-value">8</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Pending Reviews</div>
            <div class="stat-value">23</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-calendar-event me-2"></i>
          <span>Upcoming Events</span>
        </h5>
        <div class="mt-3">
          <div class="event-item">
            <div class="event-date">15</div>
            <div class="event-content">
              <div class="event-title">Performance Reviews</div>
              <div class="event-subtitle">Q3 Review Cycle</div>
            </div>
          </div>

          <div class="event-item">
            <div class="event-date">22</div>
            <div class="event-content">
              <div class="event-title">Team Building</div>
              <div class="event-subtitle">Annual Event</div>
            </div>
          </div>

          <div class="event-item">
            <div class="event-date">28</div>
            <div class="event-content">
              <div class="event-title">Salary Reviews</div>
              <div class="event-subtitle">Annual Adjustment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar-section {
      border-bottom: 1px solid var(--lpx-border-color, #dee2e6);
      margin-bottom: 1rem;
    }

    .sidebar-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .section-header {
      font-size: 14px;
      font-weight: 600;
      color: var(--lpx-text-color, #212529);
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: rgba(0, 123, 255, 0.1);
      border-radius: 6px;
    }

    .section-header i {
      color: #007bff;
      font-size: 16px;
    }

    .action-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: var(--lpx-card-bg, #ffffff);
      border: 1px solid var(--lpx-border-color, #dee2e6);
      border-radius: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: #007bff;
    }

    .action-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
    }

    .action-content {
      flex: 1;
    }

    .action-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--lpx-text-color, #212529);
      margin-bottom: 2px;
    }

    .action-description {
      font-size: 12px;
      color: var(--lpx-text-muted, #6c757d);
    }

    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid var(--lpx-border-color, #f1f3f4);
    }

    .stat-item:last-child {
      border-bottom: none;
    }

    .stat-label {
      font-size: 13px;
      color: var(--lpx-text-color, #212529);
    }

    .stat-value {
      font-size: 16px;
      font-weight: 700;
      color: #007bff;
    }

    .event-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--lpx-border-color, #f1f3f4);
    }

    .event-item:last-child {
      border-bottom: none;
    }

    .event-date {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .event-content {
      flex: 1;
    }

    .event-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--lpx-text-color, #212529);
      margin-bottom: 2px;
    }

    .event-subtitle {
      font-size: 11px;
      color: var(--lpx-text-muted, #8e9297);
    }

    /* Theme Support */
    :host-context(.lpx-theme-dark) {
      .action-card {
        background: #2d3748;
        border-color: #4a5568;
      }

      .action-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
      }
    }

    :host-context(.lpx-theme-dim) {
      .action-card {
        background: #1a202c;
        border-color: #2d3748;
      }

      .action-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
      }
    }
  `]
})
export class EmployeesSidebarComponent {
  navigateToAddEmployee(): void {
    console.log('Navigate to add employee');
  }

  navigateToBulkImport(): void {
    console.log('Navigate to bulk import');
  }

  navigateToReports(): void {
    console.log('Navigate to employee reports');
  }
}
