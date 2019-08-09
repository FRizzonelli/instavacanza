import { GOOGLE_PHOTO_CATEGORY } from "../api/photos";

export type FilterCriteria = {
    favoriteCategory?: GOOGLE_PHOTO_CATEGORY;
}

export type Activity = {
    GpsPoints: any;
    LTSTags: any[];
    Id: string;
    OutdooractiveID: string
    OutdooractiveElevationID: string
    CopyrightChecked: boolean
    Active: boolean
    Shortname: string
    SmgId: string
    Highlight: boolean
    Difficulty: string
    Type: string
    SubType: string
    PoiType: string
    FirstImport: string
    LastChange: string
    SmgActive: boolean
    LocationInfo: any
    TourismorganizationId: string
    AreaId: any[];
    AltitudeDifference: number
    AltitudeHighestPoint: number
    AltitudeLowestPoint: number
    AltitudeSumUp: number
    AltitudeSumDown: number
    DistanceDuration: number
    DistanceLength: number
    IsOpen: boolean
    IsPrepared: boolean
    RunToValley: boolean
    IsWithLigth: boolean
    HasRentals: boolean
    HasFreeEntrance: boolean
    LiftAvailable: boolean
    FeetClimb: boolean
    BikeTransport: boolean
    OperationSchedule: any[];
    GpsInfo: any[]
    GpsTrack: any[]
    ImageGallery: any[]
    Detail: any
    ContactInfos: any
    AdditionalPoiInfos: any
    SmgTags: any[]
    HasLanguage: any[]
    Ratings: any
    Exposition: any[]
    OwnerRid: string
}