import { Route, Routes } from "react-router-dom";
import ProductList from "@/pages/ProductList";
import Counter from "@/pages/Counter";
import ProductDetail from "@/pages/ProductDetail";
import ProvincesList from "@/pages/Address/ProvincesList";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";


function AppRoute(){
    return(
        <>
            <Routes>
                {/* Routes sử dụng DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/" element={<ProductList />} />
                    <Route path="/counter" element={<Counter/>} />
                    <Route path="/provinces" element={<ProvincesList />} />
                </Route>

                {/* Routes sử dụng AuthLayout cho đăng nhập/đăng ký */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRoute;