import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuthLoading, useCurrentUser} from "@/features/auth/hooks.js";
import Loading from "@/components/Loading";

function PrivateRoute() {
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const loading = useAuthLoading();

    if(loading) return <Loading />

    if(!currentUser) {
        return <Navigate to={`/login?redirectTo=${pathname}`} />
    }

    return <Outlet />;
}

export default PrivateRoute;