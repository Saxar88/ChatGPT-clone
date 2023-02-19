import {DocumentData} from "firebase/firestore";

type Props = {message: DocumentData};

function Message({message}: Props) {
	const isChatGPT = message.user.name === "ChatGPT";

	return (
		<div
			className={`py-5 text-white ${
				isChatGPT && "bg-[#444654] text-gray-300"
			}`}>
			<div className="flex space-x-5 px-10 max-w-3xl mx-auto">
				<img
					src={message.user.avatar}
					alt="profile picture"
					className="h-8 w-8 rounded-sm"
				/>
				<p className="pt-1 text-base">{message.text}</p>
			</div>
		</div>
	);
}

export default Message;
