import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Users, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

interface Poll {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  status: "Active" | "Ended" | "Upcoming";
  endTime: string;
}

const MOCK_POLLS: Poll[] = [
  {
    id: "1",
    title: "Should we adopt Base as our primary L2?",
    description: "Community vote on moving the main treasury to Base Sepolia for better gas efficiency.",
    category: "Governance",
    votes: 1240,
    status: "Active",
    endTime: "2026-05-01",
  },
  {
    id: "2",
    title: "Best UI Framework for 2026",
    description: "Voting for the standard frontend library to be used in all internal projects.",
    category: "Tech",
    votes: 856,
    status: "Active",
    endTime: "2026-04-25",
  },
  {
    id: "3",
    title: "Logo Redesign Competition",
    description: "Choose your favorite design from the top 3 community submissions.",
    category: "Design",
    votes: 2100,
    status: "Ended",
    endTime: "2026-04-10",
  },
  {
    id: "4",
    title: "Quarterly Roadmap Review",
    description: "Provide feedback and vote on the priority of upcoming features for Q3.",
    category: "Governance",
    votes: 450,
    status: "Upcoming",
    endTime: "2026-05-15",
  },
];

export const PollsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Governance", "Tech", "Design", "Community"];

  const filteredPolls = MOCK_POLLS.filter((poll) => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || poll.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12" id="explore">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-6">
        <div className="space-y-4 max-w-lg">
          <h2 className="text-4xl font-bold tracking-tight">Active Polls</h2>
          <p className="text-muted-foreground">
            Explore and participate in transparent decision-making processes across the ecosystem.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search polls..." 
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11 gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar px-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "secondary"}
            className="rounded-full px-6 transition-all"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
        {filteredPolls.map((poll) => (
          <Card key={poll.id} className="group hover:border-primary/50 transition-all flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  poll.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                  poll.status === "Ended" ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" :
                  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                }`}>
                  {poll.status}
                </span>
                <span className="text-xs text-muted-foreground font-medium">{poll.category}</span>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{poll.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {poll.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{poll.votes.toLocaleString()}</span>
                  <span className="text-muted-foreground text-xs text-nowrap">Votes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{poll.endTime}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full mt-4 group/btn" variant={poll.status === "Active" ? "default" : "secondary"} disabled={poll.status !== "Active"}>
                {poll.status === "Active" ? (
                  <>Vote Now <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /></>
                ) : poll.status === "Ended" ? (
                  <>View Results <CheckCircle2 className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Register to Vote</>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredPolls.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">No polls found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
            <Button variant="link" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>Clear all filters</Button>
          </div>
        )}
      </div>
    </section>
  );
};
