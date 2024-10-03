import { authApi } from "@/api/authApi";
import { ModeToggleTheme } from "@/components/mode-toggle";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { HubServices } from "@/services/HubServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import DialogAddFriend from "./DiaLogAddFriend";
import { useState } from "react";

const ChatContactHeader = () => {
  const { user, reset } = useAppStore();

  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpenDialogAddFriend, setIsOpenDialogAddFriend] = useState(false);
  const [isOpenDialogCreateGroupChat, setIsOpenDialogCreateGroupChat] =
    useState(false);
  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: (data) => {
      HubServices.disconnect();
      queryClient.removeQueries("getAllRoomChats");
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error,
      });
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };
  const handleOpenDialogAddFriend = () => {
    setIsOpenDialogAddFriend(true);
  };
  return (
    <div className="py-3 flex justify-between items-center shadow-lg">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-4 items-center ">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <p className="text-xl font-bold">{user?.name}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ModeToggleTheme className={"w-full border-none"} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="px-2 flex justify-end gap-4 items-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              className="p-2"
              variant="outline"
              onClick={handleOpenDialogAddFriend}
            >
              <RiUserAddLine size={25} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 max-w-32 text-center">
            Add Friend
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              className="p-2"
              variant="outline"
              onClick={() => setIsOpenDialogCreateGroupChat(true)}
            >
              <AiOutlineUsergroupAdd size={25} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 max-w-40 text-center">
            Create group chat
          </HoverCardContent>
        </HoverCard>
      </div>
      <DialogAddFriend
        isOpen={isOpenDialogAddFriend}
        onClose={() => setIsOpenDialogAddFriend(false)}
      />
    </div>
  );
};

export default ChatContactHeader;
