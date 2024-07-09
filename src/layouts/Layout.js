import Navbar from "@/components/Navigation/Navbar"
import Hero from "@/components/Hero/Hero"
import Footer from "@/components/Footer/Footer"


export default function Layout({ children }) {
    return (
        <>  
            <Navbar />
            <Hero />
            {children}
            <Footer />
        </>
    )
}