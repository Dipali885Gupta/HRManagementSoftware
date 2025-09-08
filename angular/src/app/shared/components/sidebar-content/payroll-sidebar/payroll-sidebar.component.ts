import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-cash-coin me-2"></i>
          <span>Payroll Management</span>
        </h5>
        <div class="mt-3">
          <div class="action-card" (click)="navigateToProcessPayroll()">
            <div class="action-icon">
              <i class="bi bi-play-circle"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Process Payroll</div>
              <div class="action-description">Run monthly payroll cycle</div>
            </div>
          </div>

          <div class="action-card" (click)="navigateToAdjustments()">
            <div class="action-icon">
              <i class="bi bi-sliders"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Salary Adjustments</div>
              <div class="action-description">Manage pay adjustments</div>
            </div>
          </div>

          <div class="action-card" (click)="navigateToReports()">
            <div class="action-icon">
              <i class="bi bi-file-earmark-spreadsheet"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Payroll Reports</div>
              <div class="action-description">Generate financial reports</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-graph-up me-2"></i>
          <span>Payroll Overview</span>
        </h5>
        <div class="mt-3">
          <div class="stat-item">
            <div class="stat-label">Total Payroll</div>
            <div class="stat-value">$2.4M</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Employees Paid</div>
            <div class="stat-value">1,234</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Avg. Salary</div>
            <div class="stat-value">$85,200</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Tax Deductions</div>
            <div class="stat-value">$420K</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-calendar-check me-2"></i>
          <span>Payroll Schedule</span>
        </h5>
        <div class="mt-3">
          <div class="schedule-item">
            <div class="schedule-date">15th</div>
            <div class="schedule-content">
              <div class="schedule-title">Monthly Payroll</div>
              <div class="schedule-status status-upcoming">Upcoming</div>
            </div>
          </div>

          <div class="schedule-item">
            <div class="schedule-date">28th</div>
            <div class="schedule-content">
              <div class="schedule-title">Bonus Payment</div>
              <div class="schedule-status status-completed">Completed</div>
            </div>
          </div>

          <div class="schedule-item">
            <div class="schedule-date">31st</div>
            <div class="schedule-content">
              <div class="schedule-title">Year-end Adjustments</div>
              <div class="schedule-status status-pending">Pending</div>
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
      color: #28a745;
    }

    .schedule-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: var(--lpx-card-bg, #ffffff);
      border: 1px solid var(--lpx-border-color, #dee2e6);
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .schedule-date {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .schedule-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .schedule-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--lpx-text-color, #212529);
    }

    .schedule-status {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-upcoming {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
    }

    .status-completed {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }

    .status-pending {
      background: rgba(0, 123, 255, 0.1);
      color: #007bff;
    }

    /* Theme Support */
    :host-context(.lpx-theme-dark) {
      .action-card, .schedule-item {
        background: #2d3748;
        border-color: #4a5568;
      }

      .action-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
      }
    }

    :host-context(.lpx-theme-dim) {
      .action-card, .schedule-item {
        background: #1a202c;
        border-color: #2d3748;
      }

      .action-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
      }
    }
  `]
})
export class PayrollSidebarComponent {
  navigateToProcessPayroll(): void {
    console.log('Navigate to process payroll');
  }

  navigateToAdjustments(): void {
    console.log('Navigate to salary adjustments');
  }

  navigateToReports(): void {
    console.log('Navigate to payroll reports');
  }
}
