/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 *  ***********************************************************/ 

export interface RoadmapEvent {
    startDate: Date;
    endDate: Date;
    name: string;
}

export interface RoadmapMileStone {
    name: string;
    date: Date;
}

export interface RoadmapRow {
    name: string;
    startDate: Date;
    endDate: Date;
    events: RoadmapEvent[];
    mileStones: RoadmapMileStone[];
}

export interface MonthAxis {
    monthName: string;
    monthDurationPercentage: number;
  }
