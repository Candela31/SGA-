import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LayoutPpal() {
    return (
        <>
        <Header />
        <div className="page-main">
            <Outlet />
        </div>
        <Footer />
        </>
    )
}