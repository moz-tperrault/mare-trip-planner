import { notFound } from "next/navigation";
import { MoreVertical, Paperclip, Send, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatThreads, conversations } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";

const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: false });

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conversation = conversations.find((c) => c.id === id);
  if (!conversation) notFound();
  const thread = chatThreads[id] ?? [];

  return (
    <div className="-mt-6 flex h-[calc(100dvh-12rem)] flex-col gap-3 md:h-[calc(100dvh-10rem)]">
      <PageHeader
        title={conversation.name}
        action={
          <button
            type="button"
            aria-label="More"
            className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80"
          >
            <MoreVertical className="size-5" />
          </button>
        }
      />
      <p className="-mt-3 text-center text-sm text-success">
        {conversation.online ? "Active Now" : "Offline"}
      </p>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto border-t border-border/60 pt-4">
        <div className="self-center">
          <span className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
            Today
          </span>
        </div>

        {thread.map((msg) => {
          const isMe = msg.authorId === "me";
          return (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[80%] flex-col gap-1",
                isMe ? "self-end items-end" : "self-start items-start",
              )}
            >
              <div className="flex items-end gap-2">
                {!isMe && (
                  <Avatar className="size-8">
                    <AvatarImage src={conversation.avatarUrl} alt={conversation.name} />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <p
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    isMe
                      ? "rounded-br-md bg-frame-shape text-foreground"
                      : "rounded-bl-md bg-muted text-foreground",
                  )}
                >
                  {msg.content}
                </p>
              </div>
              <span className={cn("text-xs text-muted-foreground", isMe ? "pr-1" : "pl-10")}>
                {timeFmt.format(new Date(msg.createdAt))}
              </span>
            </div>
          );
        })}
      </div>

      <form className="flex items-center gap-2 border-t border-border/60 pt-3">
        <div className="relative flex-1">
          <Paperclip className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Type your message"
            className="h-12 w-full rounded-2xl border-none bg-muted pl-11 pr-12 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            aria-label="Emoji"
            className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <Smile className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          aria-label="Send"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
}
