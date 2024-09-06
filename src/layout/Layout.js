import SidebarUser from "@/components/Navigation/sidebarUser"
import Footer from "@/components/Navigation/Footer"


export default function Layout({ children }) {
    return (
        <>
            <SidebarUser>
                {children}
                <Footer />
            </SidebarUser>
        </>
    )
}