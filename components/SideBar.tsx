"use client";

import {signOut, useSession} from "next-auth/react";
import {useCollection} from "react-firebase-hooks/firestore";
import Image from "next/image";
import NewChat from "./NewChat";
import {collection, orderBy, query} from "firebase/firestore";
import {db} from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import {ArrowUpTrayIcon} from "@heroicons/react/24/outline";

function SideBar() {
	const {data: session} = useSession();

	const [chats, loading, error] = useCollection(
		session &&
			query(
				collection(db, "users", session.user?.email!, "chats"),
				orderBy("createdAt", "desc")
			)
	);

	return (
		<div className="p-2 flex flex-col h-screen">
			<div className="flex-1">
				<div>
					<NewChat />
					<div className="hidden sm:inline">
						<ModelSelection />
					</div>
					<div className="flex flex-col space-y-2 my-2">
						{loading && (
							<div className="text-center text-white animate-pulse">
								<p>Loading chats...</p>
							</div>
						)}
						{chats?.docs.map((chat) => (
							<ChatRow key={chat.id} id={chat.id} />
						))}
					</div>
				</div>
			</div>
			{session && (
				<>
					<Image
						src={session.user?.image!}
						alt="profile picture"
						width={48}
						height={48}
						className="mx-auto mb-2 rounded-full"
					/>
					<div
						onClick={() => {
							signOut();
						}}
						className="flex items-center justify-center text-white p-3 space-x-2 rounded-md cursor-pointer hover:bg-[#2b2c2f] transition duration-100">
						<ArrowUpTrayIcon className="h-6 w-6 rotate-90" />
						<p>Log out</p>
					</div>
				</>
			)}
		</div>
	);
}

export default SideBar;
