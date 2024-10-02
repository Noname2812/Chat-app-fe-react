import { authApi } from "@/api/authApi";
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
import { useToast } from "@/hooks/use-toast";
import DiaLogListContacts from "./DiaLogListContacts";

const ChatContactHeader = () => {
  const { user, reset } = useAppStore();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
      {/* <DiaLogListContacts /> */}
    </div>
  );
};

export default ChatContactHeader;
