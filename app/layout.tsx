import "styles/globals.css";
import LogIn from "../components/LogIn";
import SideBar from "../components/SideBar";
import {SessionProvider} from "../components/SessionProvider";
import {getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import ClientProvider from "../components/ClientProvider";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html>
			<head />
			<body>
				<SessionProvider session={session}>
					{!session ? (
						<LogIn />
					) : (
						<div className="flex space-x-0">
							<div className="bg-[#202123] max-w-xs md:min-w-[16.5rem] h-screen overflow-y-auto">
								<SideBar />
							</div>
							<ClientProvider />
							<div className="flex-1 bg-[#343541]">{children}</div>
						</div>
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
