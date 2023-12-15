import ESG from "./esg-helper"
const loggedIn = async () => {
    const session = await ESG.supabase.auth.getSession();
    if (!session.data.session){
        return false;
    }
    return true;
}

export default loggedIn;
