import React, { useEffect } from "react";
import {
  Listbox,
  ListboxItem,
  Avatar,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";

import { fetchChatIds } from "@/api/fetch-chat-ids";
import useCharacters from "@/hooks/use-characters";
import ChatSidebarSkeleton from "@/components/skeletons/chat-sidebar";
import { ComposeNewChatIcon } from "@/components/icons";

interface ChatSidebarProps {
  threadId: string;
  characterId: Number;
}

export default function ChatSidebar({
  threadId,
  characterId,
}: ChatSidebarProps) {
  const [filteredChats, setFilteredChats] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const characters = useCharacters();

  useEffect(() => {
    if (characters) {
      fetchChatIds(threadId).then((chatIds) => {
        setFilteredChats(
          characters.filter((character) =>
            [...chatIds, Number(characterId)].includes(character.id),
          ),
        );
        setLoading(false);
      });
    }
  }, [characters]);

  if (loading) return <ChatSidebarSkeleton />;

  return (
    <div className="w-full max-w-[260px] max-h-[100%]  px-2 mx-2 bg-content2 rounded-xl flex flex-col">
      <Listbox
        classNames={{
          base: "max-w-xs p-0 gap-0 rounded-md max-h-full flex-grow",
          list: "overflow-scroll",
        }}
        items={filteredChats}
        label={"Chats"}
        selectionMode="single"
        topContent={
          <div className="font-bold text-start self-start py-4 px-3 bg-content2 min-w-full rounded-md mb-2">
            Chats
          </div>
        }
        variant="faded"
      >
        {(character) => (
          <ListboxItem
            key={character.id}
            hideSelectedIcon
            shouldHighlightOnFocus
            className={
              character.id === Number(characterId) ? "bg-content1" : ""
            }
            href={`/chat/${character.id}`}
            textValue={character.name}
          >
            <div className="flex gap-2 items-center">
              <Avatar
                alt={character.name}
                className="flex-shrink-0"
                size="sm"
                src={character.image_url}
              />
              <div className="flex flex-col">
                <span className="text-small text-start">{character.name}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
      <div className="mt-auto py-4 self-end">
        <Link href={"/"}>
          <Tooltip
            className="capitalize"
            color="foreground"
            content={"New chat"}
          >
            <Button
              isIconOnly
              aria-label="Delete"
              className="capitalize ml-auto mr-2"
              variant={"bordered"}
            >
              <ComposeNewChatIcon />
            </Button>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
}
