"use client";

import {signOut, useSession} from "next-auth/react";
import {useCollection} from "react-firebase-hooks/firestore";
import Image from "next/image";
import NewChat from "./NewChat";
import {collection, orderBy, query} from "firebase/firestore";
import {db} from "../firebase";
import ChatRow from "./ChatRow";

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
					{chats?.docs.map((chat) => (
						<ChatRow key={chat.id} id={chat.id} />
					))}
				</div>
			</div>
			{session && (
				<Image
					src={session.user?.image!}
					alt="profile picture"
					width={48}
					height={48}
					onClick={() => {
						signOut();
					}}
					className="mx-auto mb-2 rounded-full cursor-pointer hover:opacity-50"
				/>
			)}
		</div>
	);
}

export default SideBar;
