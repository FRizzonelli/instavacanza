import { maxBy, sumBy } from 'lodash'
import { MediaItem } from "../models/mediaItem";
import { Activity, FilterCriteria } from "../models/activity";
import { GOOGLE_PHOTO_CATEGORY } from '../api/photos';

export function mapWithAILogic(gardensPhotos: MediaItem[], holidaysPhotos: MediaItem[], landscapesPhotos: MediaItem[], sportPhotos: MediaItem[], travelPhotos: MediaItem[]): FilterCriteria {
    const favoriteCategoryByGoogle = maxBy([{
        id: "GARDENS",
        count: gardensPhotos.length
    }, {
        id: "HOLIDAYS",
        count: holidaysPhotos.length
    }, {
        id: "LANDSCAPES",
        count: landscapesPhotos.length
    }, {
        id: "SPORTS",
        count: sportPhotos.length
    }, {
        id: "TRAVEL",
        count: travelPhotos.length
    }], item => item.count);

    return {
        favoriteCategory: favoriteCategoryByGoogle && favoriteCategoryByGoogle.id as GOOGLE_PHOTO_CATEGORY
    }
}

export function retrieveRandomPlaceholder(activityType: string, id: string): string {
    const randomById = sumBy(id, char => isNaN((Number(char))) ? 0 : Number(char)) % 4;

    switch (activityType) {
        default:
        case "Berg": // Mountains
            const mountainsPlaceholders =
                ["https://images.unsplash.com/photo-1556300936-48a075accaab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1534103362078-d07e750bd0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1502054107195-7bed90be084a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1557064348-ad29cacfb9c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1563229582-1455d62ba039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"];

            return mountainsPlaceholders[randomById];
        case "Radfahren": // Cycling
            const cyclingPlaceholders =
                ["https://images.unsplash.com/photo-1560982715-2c5936185c63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1508789454646-bef72439f197?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1545058746-b3cb62c0b05c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1545058802-67e0e08922fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1497514789819-4190972b5575?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"]


            return cyclingPlaceholders[randomById];
        case "Stadtrundgang": // Local tours
            const localToursPlaceholders =
                ["https://images.unsplash.com/photo-1547669662-3c9d2e0d4ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://www.gallorosso.it/smartedit/images/hoefe/vergroesserung/144006210-3644-neu.jpg",
                    "https://www.altoadige-tirolo.com/media/tscherms-3,16769575.jpg",
                    "https://www.altoadige-tirolo.com/media/meran-10,437227250.jpg",
                    "http://www.rebenhof.it/images/big/1_von_33.jpg"]

            return localToursPlaceholders[randomById];
        case "Pferdesport": // Cavalli
            const horsesPlaceholders =
                ["https://images.unsplash.com/photo-1523222167982-0b227abf728d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "http://www.reiturlaub-suedtirol.com/cache/img-fotos-bauernhof-oberfahrer-df5fa34d22-1500.jpg",
                    "https://www.gallorosso.it/smartedit/images/headerbilder/header_large/reiten_bauernhof-suedtirol.jpg",
                    "https://www.bremichhof.com/wp-content/uploads/2012/06/bremich01.jpg",
                    "https://www.suedtirol.info/activities/horse-trekking-mareo-446495602/horse-trekking-mareo--1100369660.jpg"]

            return horsesPlaceholders[randomById];
        case "Wandern": // Escursionismo
            const hikingPlaceholders =
                ["https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80",
                    "https://images.unsplash.com/photo-1440186347098-386b7459ad6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/uploads/1412533519888a485b488/bb9f9777?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1503093928907-326ec3f06115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1470949009549-5aada2a4b212?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"]

            return hikingPlaceholders[randomById];
        case "Laufen und Fitness": // Corsa e fitness
            const runningAndFitnessPlaceholders =
                ["http://www.sportsmall.it/wp-content/uploads/2019/06/Mezza-Maratona-Alpe-di-Siusi-Foto-archivio-fonte-Newspower.jpg",
                    "https://www.ritten.com/images/content/laufen.jpg?size=990&typ=5",
                    "https://images.sihosting.cloud/cms-v2/CustomerData/308/Files/Images/sport-freizeit/sommer-aktiv/highlights/drei-zinnen-lauf/drei-zinnen-lauf.jpg/image.jpg?v=637000965512",
                    "http://www.runninginitaly.com/photos/TrentinoAltoAdige_000382_BrixenMarathon002.jpg",
                    "https://www.prokulus.it/(cms)/media/resize/size=640x0%2CCinterlace=1%2Cquality=60/1620422"]

            return runningAndFitnessPlaceholders[randomById];
        case "Loipen": // Piste da fondo
            const skiTrackPlaceholders =
                ["https://d18z89ggtjsooz.cloudfront.net/cache-buster-1481292459/website/var/tmp/image-thumbnails/20000/27470/thumb__lightbox/langlaufen-auf-der-hoehenloipe.jpeg",
                    "https://images.unsplash.com/photo-1494548341409-42a17bfcf8fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1486078695445-0497c2f58cfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1518775053278-5a569f0be353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
                    "https://www.seiseralm.it/media/727_x_545/5d5c8af8-e042-428b-b8e8-2a06a6c001d8/langlaufen.jpg"]

            return skiTrackPlaceholders[randomById];
        case "Rodelbahnen": // Piste per slitte
            const tobboganRunPlaceholders =
                ["https://www.merano-suedtirol.it/media/download/640_x_480/?u=https://mapservices.eu/nefos/site-files/57/uploads/imagerender_74534086.aspxIDeeac5673918062af1e9adc05a8b6f09d",
                    "https://www.merano-suedtirol.it/media/download/640_x_480/?u=https://mapservices.eu/nefos/site-files/57/uploads/imagerender_45922415.aspxID3f7a2424857d32352a415d61052f3e05",
                    "https://i.ytimg.com/vi/msHpFpSHbWs/maxresdefault.jpg",
                    "https://www.sarntal.com/fileadmin/user_upload/Reinswald-Winter-Ski-15.jpg",
                    "https://www.merano-suedtirol.it/media/923fa5fd-d30a-4160-9a33-99f916fd559d/1900_x_900/slittare-alpinbob-inverno-avelengo-verano-merano2000-fb.jpg"]

            return tobboganRunPlaceholders[randomById];
        case "Piste": // Piste
            const slopesPlaceholders =
                ["https://www.suedtirol.info/ubersichtskacheln/03.05-winter/image-thumb__1132863__amp-teaser-big/altabadia.jpeg",
                    "https://www.ladurns.it/sites/default/files/styles/header/public/headerbilder/052519144.jpg?itok=tZEYj1vD",
                    "https://www.valleisarco.info/smartedit/images/content_mod_1/c-Kottersteger-Brixen-Tourismus-078-plose-ski.jpeg",
                    "https://images.unsplash.com/photo-1522575220427-ca4d3345c5e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
                    "https://www.skiresort.info/typo3temp/_processed_/85/55/5e/ed/8dd45ac989.jpg"]

            return slopesPlaceholders[randomById];
        case "Aufstiegsanlagen": // Impianti di risalita
            const liftsPlaceholders =
                ["http://www.mountcity.it/wp-content/uploads/2018/05/2016-03-18-Skilift-Riedlwirt-217-1800x1200.jpg",
                    "https://db-service.toubiz.de/var/plain_site/storage/images/orte/rigi-kaltbad/skilift-gratalp-rigi-kaltbad/skilift_gratalp_front_magnific/3299115-1-ger-DE/Skilift_Gratalp_front_magnific_front_large.jpg",
                    "https://www.kronplatz.com/website/var/tmp/image-thumbnails/60000/65799/thumb__media-block-600/skilift-taisten-georg-hofer-.jpeg",
                    "https://i.ytimg.com/vi/kfofmSgPMiU/maxresdefault.jpg",
                    "https://sk7.it/foto/albums/userpics/11320/n_skilift-panice.jpg"]

            return liftsPlaceholders[randomById];
    }
}

function getRandomId() {
    const min = 1;
    const max = 5
    return (Math.floor(Math.random() * (+max - +min)) + +min) - 1;
}