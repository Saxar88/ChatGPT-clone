"use client";

import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {useSession} from "next-auth/react";
import {FormEvent, useState} from "react";
import {db} from "../firebase";
import toast from "react-hot-toast";

type Props = {chatId: string};

function ChatInput({chatId}: Props) {
	const [prompt, setPrompt] = useState("");
	const {data: session} = useSession();

	const model = "davinci";

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!prompt) return;

		const input = prompt.trim();
		setPrompt("");

		const message: Message = {
			text: input,
			createdAt: serverTimestamp(),
			user: {
				_id: session?.user?.email!,
				name: session?.user?.name!,
				avatar:
					session?.user?.image! ||
					`https://ui-avatars.com/api/?name=${session?.user?.name!}`,
			},
		};

		await addDoc(
			collection(
				db,
				"users",
				session?.user?.email!,
				"chats",
				chatId,
				"messages"
			),
			message
		);

		const notification = toast.loading("Compiling reply...");

		await fetch("/api/askQuestion", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({prompt: input, chatId, model, session}),
		}).then(() => {
			toast.success("Reply given!", {id: notification});
		});
	};

	return (
		<div className="w-1/2 bg-[#40414f] text-gray-400 text-sm rounded-lg">
			<form onSubmit={sendMessage} className="flex p-3 space-x-5">
				<input
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					type="text"
					placeholder="Type your message here..."
					disabled={!session}
					className="flex-1 bg-transparent focus:outline-none disabled:text-gray-300 disabled:cursor-not-allowed"
				/>
				<button
					type="submit"
					disabled={!prompt || !session}
					className="px-1.5 py-1 rounded-md hover:bg-[#202123]">
					<PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
				</button>
			</form>
			<div className=""></div>
		</div>
	);
}

export default ChatInput;
