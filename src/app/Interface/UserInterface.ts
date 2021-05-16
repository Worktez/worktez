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
    Bio: string;
}
