import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-[calc(100vh-0rem)] min-h-screen flex-col overflow-hidden bg-white">
            <Header />
            <div className="flex h-full w-screen overflow-hidden">
                <Sidebar/>
                <div className="h-[calc(100vh-4rem)] w-full overflow-auto bg-white p-4">{children}</div>
            </div>
        </div>
    );
}
