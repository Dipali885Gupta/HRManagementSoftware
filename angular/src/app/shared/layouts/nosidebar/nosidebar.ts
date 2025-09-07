import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LpxResponsiveModule } from '@volo/ngx-lepton-x.core';
import { LpxSideMenuLayoutModule } from '@volosoft/ngx-lepton-x/layouts';
@Component({
  selector: 'app-no-sidebar',
  imports: [CommonModule, RouterModule, LpxResponsiveModule, LpxSideMenuLayoutModule],
  templateUrl: './nosidebar.html',
  styleUrl: './nosidebar.scss'
})
export class NoSidebar {

}