export interface User {
    uid: string;
    photoURL: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    providerId: string;
}

export interface UserAppSetting extends User {
    AppKey: string;
    TeamId: string;
    AboutMe: string;
    AppTheme: string;
    GithubProfile: string;
    LinkedInProfile: string;
}
