export class Lots {
    $key?: string;
    name: string;
    address: string;
    lng: number;
    lat: number;
    free: number;
    occupied: number;
    booked: number;
    total: number;
    fk_areaKey: string;
    fk_areaName: string;
    creationDate: string;
}