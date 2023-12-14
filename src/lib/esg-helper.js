import { EsgSDK } from "esg-sdk";

const ESG = EsgSDK.initialize({
  analyticsApiKey: process.env.NEXT_PUBLIC_ANALYTICSAPI,
  supabaseApiKey: process.env.NEXT_PUBLIC_SDKAPI,
  supabaseApiUrl: process.env.NEXT_PUBLIC_SUPABASEURL,
});

export default ESG;