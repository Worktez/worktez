export interface Organizations {
    AppKey: string;
    OrganizationId: string;
    OrganizationDomain: string;
    TeamsId: [];
  }

export interface OrganizationsDataId extends Organizations {id: string;}