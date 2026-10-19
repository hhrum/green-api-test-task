import { ChatItem } from "@/entities/chat";

export function ChatsList() {
    return (
        <div className="flex flex-col md:max-w-100">
            <div className="text-2xl font-medium px-4 py-2">Чаты</div>
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
        </div>
    )
}