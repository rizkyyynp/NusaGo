import Navbar from "@/components/Navigation/Navbar"
import Footer from "@/components/Footer/Footer"


export default function Layout({ children }) {
    return (
        <>  
            <Navbar />
            {children}
            <Footer />
        </>
    )
}