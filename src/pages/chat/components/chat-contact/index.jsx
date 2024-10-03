import CustomTabs from "@/components/CustomTabs";
import TabsListRoomChat from "./list-rooms-chat";
import TabListContacts from "./list-contacts";
import ChatContactHeader from "./components/ChatContactHeader";
const ListTabsChatContact = [
  {
    name: "Rooms",
    value: "room",
    content: <TabsListRoomChat />,
  },
  {
    name: "Contacts",
    value: "contact",
    content: <TabListContacts />,
  },
];
const ChatContact = () => {
  return (
    <div className=" md:flex flex-col p-2 hidden  w-1/4  border-[#F0F0F0] gap-2 border-r-2">
      <ChatContactHeader />
      <CustomTabs
        listTabContents={ListTabsChatContact}
        defaultValue={"room"}
        classNameTabsList={"w-full justify-start bg-[#F0F2F5] px-2"}
        classNameTabsTrigger={"bg-[#F0F2F5] rounded-xl text-sm "}
      />
    </div>
  );
};

export default ChatContact;
