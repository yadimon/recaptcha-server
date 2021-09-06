interface VerifyV3Response {
    isPassed: boolean;
    score: number;
    hostName: string;
    action: string;
    checkedAt: Date;
}
export default class Recaptcha {
    private secret;
    private timeout;
    private recapAxios;
    constructor(secret: string, timeout?: number);
    verifyV3Async(token: string, minScore?: number): Promise<VerifyV3Response>;
}
export {};
//# sourceMappingURL=recaptcha-server.d.ts.map