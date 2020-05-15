import { Pagination } from "./common";
export interface Zone extends Pagination  {
    name: string,
    pollerTimeout: number,
    provider: string,
    providerRegion: string,
    sourceIpAddresses: string[],
    createdTimestamp: string,
    updatedTimestamp: string,
    public: boolean
}