import Footer from "@/components/Navigation/Footer";
import NavbarAdmin from "@/components/Navigation/sidebarAdmin";


export default function LayoutAdmin({ children }) {
    return (
        <>
            <NavbarAdmin >
                {children }
                <Footer />
            </NavbarAdmin>
        </>
    )
}