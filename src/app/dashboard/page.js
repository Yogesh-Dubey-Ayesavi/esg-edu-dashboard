import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
  import { EnvironmentInitiative, SocialInitiative, GovernanceInitiative } from "@/components/ESGTabs/index";
  
  export default function TabsDemo() {
    return (
      <Tabs defaultValue="economical" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger className="border-stone-500 border-2 mx-2 rounded-xl data-[state=active]:bg-slate-600" value="economical">Environmental</TabsTrigger>
          <TabsTrigger className="border-stone-500 border-2 mx-2 rounded-xl data-[state=active]:bg-slate-600" value="governance">Governance</TabsTrigger>
          <TabsTrigger className="border-stone-500 border-2 mx-2 rounded-xl data-[state=active]:bg-slate-600" value="social">Social</TabsTrigger>
        </TabsList>
        <TabsContent value="economical">
          <EnvironmentInitiative />
        </TabsContent>
        <TabsContent value="governance">
          <GovernanceInitiative />
        </TabsContent>
        <TabsContent value="social">
          <SocialInitiative />
        </TabsContent>
      </Tabs>
    );
  }
  