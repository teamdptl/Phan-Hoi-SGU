import Header from "@/Layouts/Header.jsx";
import Footer from "@/Layouts/Footer.jsx";

export default function AppLayout({children}) {
    return <>
        <Header/>
            {children}
        <Footer/>
    </>
}
