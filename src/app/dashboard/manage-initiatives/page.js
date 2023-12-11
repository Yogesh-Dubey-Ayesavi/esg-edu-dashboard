import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
  import { EnvironmentInitiative, SocialInitiative, GovernanceInitiative } from "@/components/ESGTabs/index";
  
  export default function TabsDemo() {
    return (
      <Tabs defaultValue="economical" className="w-[80vw] mx-auto mt-[3rem]">
        <TabsList className="grid w-full grid-cols-3 mb-[2.5rem] h-max bg-white">
          <TabsTrigger className="text-2xl font-bold text-black border-black/50 border-2 mx-2 rounded-xl data-[state=active]:bg-violet-400 data-[state=active]:text-white" value="economical">Environmental</TabsTrigger>
          <TabsTrigger className="text-2xl font-bold text-black border-black/50 border-2 mx-2 rounded-xl data-[state=active]:bg-violet-400 data-[state=active]:text-white" value="governance">Governance</TabsTrigger>
          <TabsTrigger className="text-2xl font-bold text-black border-black/50 border-2 mx-2 rounded-xl data-[state=active]:bg-violet-400 data-[state=active]:text-white" value="social">Social</TabsTrigger>
        </TabsList>
        <TabsContent value="economical" className='w-[95%] mx-auto' >
          <EnvironmentInitiative />
        </TabsContent>
        <TabsContent value="governance" className='w-[95%] mx-auto' >
          <GovernanceInitiative />
        </TabsContent>
        <TabsContent value="social" className='w-[95%] mx-auto' >
          <SocialInitiative />
        </TabsContent>
      </Tabs>
    );
  }
  