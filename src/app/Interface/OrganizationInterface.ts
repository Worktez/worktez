export interface Organizations {
    AppKey: string;
    OrganizationId: string;
    OrganizationDomain: string;
  }

export interface OrganizationsDataId extends Organizations {id: string;}