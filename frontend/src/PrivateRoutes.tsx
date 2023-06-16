import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes({ auth, redirectPath }: {
    auth: boolean,
    redirectPath: string
}) {



    if (!auth) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
}

export default PrivateRoutes;
