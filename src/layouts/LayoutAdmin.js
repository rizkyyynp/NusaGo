import NavbarAdmin from "@/components/Navigation/NavbarAdmin";
import Footer from "@/components/Footer/Footer";


export default function LayoutAdmin({ children }) {
    return (
        <>
            <NavbarAdmin />
            {children}
            <Footer />
        </>
    )
}