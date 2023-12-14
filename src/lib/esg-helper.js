import { EsgSDK } from "esg-sdk";

const ESG = EsgSDK.initialize(process.env.NEXT_PUBLIC_ANALYTICSAPI, process.env.NEXT_PUBLIC_SDKAPI, process.env.NEXT_PUBLIC_SUPABASEURL);

export default ESG;