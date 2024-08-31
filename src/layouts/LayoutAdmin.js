import Footer from "@/components/Footer/Footer";
import NavbarAdmin from "@/components/Navigation/NavbarAdmin";


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