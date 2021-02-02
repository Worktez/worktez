import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingsService {

  constructor() { }
  status: string[] = [
    "Ice Box",
    "Ready to start",
    "Under Progress",
    "Blocked",
    "Completed"
  ]
  priority: string[] = [
    "High",
    "Medium",
    "Low"
  ]
  difficulty: string[] = [
    "High",
    "Medium",
    "Low"
  ]
  category: string[] = [
    "Business",
    "Development",
    "Marketing",
    "Other"
  ]
}
