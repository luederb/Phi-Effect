import {ReactNode} from "react";
import Header from "./Header.tsx";
import Navigation from "./Navigation.tsx";

type LayoutProps = {
    children: ReactNode,
}
export default function Layout({children}: Readonly<LayoutProps>) {
    return (
        <>
            <Header />
            <Navigation />
            <main>
                {children}
            </main>
            <footer>
                <p>&copy;2024 Lüder</p>
            </footer>
        </>
    );
}