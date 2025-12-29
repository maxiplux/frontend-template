import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'bookmarks',
        loadChildren: () =>
          import('./features/bookmarks/bookmarks.routes').then((m) => m.BOOKMARKS_ROUTES),
      },
      {
        path: 'team',
        loadChildren: () =>
          import('./features/team/team.routes').then((m) => m.TEAM_ROUTES),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./features/messages/messages.routes').then((m) => m.MESSAGES_ROUTES),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./features/calendar/calendar.routes').then((m) => m.CALENDAR_ROUTES),
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('./features/overview/overview.routes').then((m) => m.OVERVIEW_ROUTES),
      },
      {
        path: 'domains',
        loadChildren: () =>
          import('./features/domains/domains.routes').then((m) => m.DOMAINS_ROUTES),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.routes').then((m) => m.REPORTS_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
