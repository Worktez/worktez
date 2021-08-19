export interface Activity {
    Comment: string;
    Date:string;
    Time:string;
    Type: string;
    Email: string;
    PhotoUrl: string;
}

export interface ActivityId extends Activity { id: string; }
