import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const CustomTabs = ({
  defaultValue,
  listTabContents,
  classNameTabs,
  classNameTabsList,
  classNameTabsTrigger,
}) => {
  return (
    <Tabs defaultValue={defaultValue} className={classNameTabs || ""}>
      <TabsList className={classNameTabsList || ""}>
        {listTabContents.map((item) => (
          <TabsTrigger
            key={item.name}
            value={item.value}
            className={classNameTabsTrigger || ""}
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {listTabContents.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
