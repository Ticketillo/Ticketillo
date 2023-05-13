import Logo from "../components/Logo";
import UserMenu from "../components/UserMenu";

export default function HomePage() {
    return (
        <main className="sm:mx-auto flex w-full max-w-5xl flex-col items-start p-5">
            <header className="flex items-center justify-between w-full">
                <Logo />
                <UserMenu />
            </header>
        </main>
    );
}
