import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44330/',
  redirectUri: baseUrl,
  clientId: 'HRManagementSoftware_App',
  responseType: 'code',
  scope: 'offline_access HRManagementSoftware',
  requireHttps: true,
  impersonation: {
    tenantImpersonation: true,
    userImpersonation: true,
  }
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'HRManagementSoftware',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44330',
      rootNamespace: 'HRManagementSoftware',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
