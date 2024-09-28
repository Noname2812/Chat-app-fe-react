import { authApi } from "@/api/authApi";
import Logo from "./Logo";
import { ModeToggleTheme } from "@/components/mode-toggle";

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
import OpenListContacts from "./OpenListContact";
import { useToast } from "@/hooks/use-toast";

const ChatContactHeader = () => {
  const { user, logOut } = useAppStore();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: (data) => {
      HubServices.disconnect();
      queryClient.removeQueries("getAllRoomChats");
      logOut();
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
  return (
    <div className="py-3 flex justify-between items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-4 items-center">
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
      <OpenListContacts />
    </div>
  );
};

export default ChatContactHeader;
