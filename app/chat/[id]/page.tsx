import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {params: {id: string}};

function ChatPage({params: {id}}: Props) {
	return (
		<div className="flex flex-col items-center h-screen w-full py-3 overflow-y-auto scrollbar">
			<Chat chatId={id} />
			<ChatInput chatId={id} />
		</div>
	);
}

export default ChatPage;
