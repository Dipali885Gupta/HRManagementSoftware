import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-requests-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-calendar-event me-2"></i>
          <span>Leave Management</span>
        </h5>
        <div class="mt-3">
          <div class="action-card" (click)="navigateToNewRequest()">
            <div class="action-icon">
              <i class="bi bi-plus-circle"></i>
            </div>
            <div class="action-content">
              <div class="action-title">New Leave Request</div>
              <div class="action-description">Submit a new leave request</div>
            </div>
          </div>

          <div class="action-card" (click)="navigateToCalendar()">
            <div class="action-icon">
              <i class="bi bi-calendar"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Leave Calendar</div>
              <div class="action-description">View team leave schedule</div>
            </div>
          </div>

          <div class="action-card" (click)="navigateToApprovals()">
            <div class="action-icon">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="action-content">
              <div class="action-title">Pending Approvals</div>
              <div class="action-description">Review leave requests</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-bar-chart me-2"></i>
          <span>Leave Statistics</span>
        </h5>
        <div class="mt-3">
          <div class="stat-item">
            <div class="stat-label">Pending Requests</div>
            <div class="stat-value">23</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Approved This Month</div>
            <div class="stat-value">45</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Total Leave Days</div>
            <div class="stat-value">1,234</div>
          </div>

          <div class="stat-item">
            <div class="stat-label">Average Approval Time</div>
            <div class="stat-value">2.3 days</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-clock me-2"></i>
          <span>Upcoming Leaves</span>
        </h5>
        <div class="mt-3">
          <div class="leave-item">
            <div class="leave-avatar">JD</div>
            <div class="leave-content">
              <div class="leave-name">John Doe</div>
              <div class="leave-details">Annual Leave • 5 days</div>
              <div class="leave-dates">Dec 15-19, 2024</div>
            </div>
          </div>

          <div class="leave-item">
            <div class="leave-avatar">SJ</div>
            <div class="leave-content">
              <div class="leave-name">Sarah Johnson</div>
              <div class="leave-details">Sick Leave • 2 days</div>
              <div class="leave-dates">Dec 20-21, 2024</div>
            </div>
          </div>

          <div class="leave-item">
            <div class="leave-avatar">MR</div>
            <div class="leave-content">
              <div class="leave-name">Mike Ross</div>
              <div class="leave-details">Maternity Leave • 90 days</div>
              <div class="leave-dates">Jan 1 - Mar 31, 2025</div>
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
      background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
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

    .leave-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: var(--lpx-card-bg, #ffffff);
      border: 1px solid var(--lpx-border-color, #dee2e6);
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .leave-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .leave-content {
      flex: 1;
    }

    .leave-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--lpx-text-color, #212529);
      margin-bottom: 2px;
    }

    .leave-details {
      font-size: 12px;
      color: #007bff;
      margin-bottom: 2px;
    }

    .leave-dates {
      font-size: 11px;
      color: var(--lpx-text-muted, #8e9297);
    }

    /* Theme Support */
    :host-context(.lpx-theme-dark) {
      .action-card, .leave-item {
        background: #2d3748;
        border-color: #4a5568;
      }

      .action-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
      }
    }

    :host-context(.lpx-theme-dim) {
      .action-card, .leave-item {
        background: #1a202c;
        border-color: #2d3748;
      }

      .action-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
      }
    }
  `]
})
export class LeaveRequestsSidebarComponent {
  navigateToNewRequest(): void {
    console.log('Navigate to new leave request');
  }

  navigateToCalendar(): void {
    console.log('Navigate to leave calendar');
  }

  navigateToApprovals(): void {
    console.log('Navigate to pending approvals');
  }
}
