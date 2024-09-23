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
import { useQueryClient } from "@tanstack/react-query";

const ChatContactHeader = () => {
  const { user, logOut } = useAppStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    authApi
      .logout()
      .then(() => {
        HubServices.disconnect();
        queryClient.removeQueries("getAllRoomChats");
        logOut();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="py-3 flex justify-between items-center">
      <Logo />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
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
    </div>
  );
};

export default ChatContactHeader;
