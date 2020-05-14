export interface Zone {
    name: string,
    pollerTimeout: number,
    provider: string,
    providerRegion: string,
    sourceIpAddresses: string[],
    createdTimestamp: string,
    updatedTimestamp: string,
    public: boolean
}