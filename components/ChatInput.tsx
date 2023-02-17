"use client";

import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
import {useSession} from "next-auth/react";
import {useState} from "react";

type Props = {chatId: string};

function ChatInput({chatId}: Props) {
	const [prompt, setPrompt] = useState("");
	const {data: session} = useSession();

	return (
		<div className="w-1/2 bg-gray-700/50 text-gray-400 text-sm rounded-lg">
			<form className="flex p-5 space-x-5">
				<input
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					type="text"
					placeholder="Type your message here..."
					disabled={!session}
					className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
				/>
				<button
					type="submit"
					disabled={!prompt || !session}
					className="px-1.5 py-1 rounded-md hover:bg-gray-900/50">
					<PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
				</button>
			</form>
			<div className=""></div>
		</div>
	);
}

export default ChatInput;
