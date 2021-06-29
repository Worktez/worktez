export interface Organizations {
    AppKey: string;
    OrganizationId: string;
    OrganizationDomain: string;
    OrganizationName: string;
    TeamsId: [];
  }

export interface OrganizationsDataId extends Organizations {id: string;}