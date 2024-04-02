export type Project = {
    id: string;
    name: string;
    projectOwner: string;
    city: string;
    description: string;
    genre: string;
    status: string;
    gpsCoordinates: {latitude: number, longitude: number};
    projectStart: Date;
    projectEnd: Date;
}