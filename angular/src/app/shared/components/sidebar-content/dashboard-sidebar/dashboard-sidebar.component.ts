import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-speedometer2 me-2"></i>
          <span>Dashboard Overview</span>
        </h5>
        <div class="mt-3">
          <div class="metric-card">
            <div class="metric-icon">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="metric-content">
              <div class="metric-value">1,247</div>
              <div class="metric-label">Total Employees</div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">
              <i class="bi bi-calendar-event"></i>
            </div>
            <div class="metric-content">
              <div class="metric-value">23</div>
              <div class="metric-label">Pending Leave Requests</div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">
              <i class="bi bi-cash-coin"></i>
            </div>
            <div class="metric-content">
              <div class="metric-value">$2.4M</div>
              <div class="metric-label">Monthly Payroll</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="p-2">
        <h5 class="section-header d-flex align-items-center">
          <i class="bi bi-bell me-2"></i>
          <span>Recent Updates</span>
        </h5>
        <div class="mt-3">
          <div class="update-item">
            <div class="update-dot"></div>
            <div class="update-content">
              <div class="update-text">New employee onboarding completed</div>
              <div class="update-time">2 hours ago</div>
            </div>
          </div>

          <div class="update-item">
            <div class="update-dot"></div>
            <div class="update-content">
              <div class="update-text">Payroll processing started</div>
              <div class="update-time">4 hours ago</div>
            </div>
          </div>

          <div class="update-item">
            <div class="update-dot"></div>
            <div class="update-content">
              <div class="update-text">Leave policy updated</div>
              <div class="update-time">1 day ago</div>
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

    .metric-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: var(--lpx-card-bg, #ffffff);
      border: 1px solid var(--lpx-border-color, #dee2e6);
      border-radius: 8px;
      margin-bottom: 8px;
      transition: all 0.2s ease;
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .metric-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
    }

    .metric-content {
      flex: 1;
    }

    .metric-value {
      font-size: 18px;
      font-weight: 700;
      color: var(--lpx-text-color, #212529);
      line-height: 1.2;
    }

    .metric-label {
      font-size: 12px;
      color: var(--lpx-text-muted, #6c757d);
      margin-top: 2px;
    }

    .update-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--lpx-border-color, #f1f3f4);
    }

    .update-item:last-child {
      border-bottom: none;
    }

    .update-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #007bff;
      margin-top: 6px;
      flex-shrink: 0;
    }

    .update-content {
      flex: 1;
      min-width: 0;
    }

    .update-text {
      font-size: 13px;
      color: var(--lpx-text-color, #212529);
      line-height: 1.4;
      margin-bottom: 2px;
    }

    .update-time {
      font-size: 11px;
      color: var(--lpx-text-muted, #8e9297);
    }

    /* Theme Support */
    :host-context(.lpx-theme-dark) {
      .metric-card {
        background: #2d3748;
        border-color: #4a5568;
      }

      .metric-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
      }
    }

    :host-context(.lpx-theme-dim) {
      .metric-card {
        background: #1a202c;
        border-color: #2d3748;
      }

      .metric-card:hover {
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
      }
    }
  `]
})
export class DashboardSidebarComponent {}
