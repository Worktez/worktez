export interface Organizations {
    AppKey: string;
    OrganizationId: string;
    OrganizationDomain: string;
    OrganizationName: string;
    OrganizationEmail: string;
    OrganizationDescription: string;
    OrganizationLogoURL: string;
    TeamsId: [];
  }

export interface OrganizationsDataId extends Organizations {id: string;}