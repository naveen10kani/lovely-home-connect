
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus, Calendar, Clock, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Initial session data
const initialSessions = [
  {
    id: "1",
    name: "Gayatri Mam",
    role: "Motivational Speaker",
    topic: "Building Self Confidence",
    date: "2025-04-15",
    time: "10:00 AM",
    duration: "60 min",
    description: "An interactive session on developing self-confidence and positive outlook."
  },
  {
    id: "2",
    name: "Dr. Rajan",
    role: "Psychologist",
    topic: "Emotional Well-being",
    date: "2025-04-18",
    time: "11:30 AM",
    duration: "90 min",
    description: "Understanding and managing emotions for a balanced life."
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Mentor",
    topic: "Career Guidance",
    date: "2025-04-20",
    time: "2:00 PM",
    duration: "120 min",
    description: "Exploring various career paths and opportunities for young adults."
  }
];

const ScheduleSection = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [newSession, setNewSession] = useState({
    name: "",
    role: "Motivational Speaker",
    topic: "",
    date: "",
    time: "",
    duration: "60 min",
    description: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSession(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewSession(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new session
    const updatedSessions = [
      ...sessions,
      {
        id: (sessions.length + 1).toString(),
        ...newSession
      }
    ];
    
    setSessions(updatedSessions);
    setIsDialogOpen(false);
    
    // Reset form
    setNewSession({
      name: "",
      role: "Motivational Speaker",
      topic: "",
      date: "",
      time: "",
      duration: "60 min",
      description: ""
    });
    
    toast({
      title: "Session Added!",
      description: "The new session has been scheduled successfully.",
    });
  };
  
  // Group sessions by date for better organization
  const groupedSessions = sessions.reduce((groups, session) => {
    const date = session.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, typeof sessions>);
  
  // Sort dates
  const sortedDates = Object.keys(groupedSessions).sort();

  return (
    <section id="schedule" className="section-padding bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Session Schedule</h2>
            <p className="text-gray-600 max-w-2xl">
              Join our sessions with motivational speakers, mentors, and psychologists.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 flex items-center gap-2 bg-primary hover:bg-primary/90">
                <CalendarPlus className="h-4 w-4" />
                <span>Add Session</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Session</DialogTitle>
                  <DialogDescription>
                    Create a new session to the schedule. Fill in all the fields below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Presenter Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newSession.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={newSession.role} 
                        onValueChange={(value) => handleSelectChange("role", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Motivational Speaker">Motivational Speaker</SelectItem>
                          <SelectItem value="Mentor">Mentor</SelectItem>
                          <SelectItem value="Psychologist">Psychologist</SelectItem>
                          <SelectItem value="Coach">Coach</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      name="topic"
                      value={newSession.topic}
                      onChange={handleInputChange}
                      placeholder="Session topic"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={newSession.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={newSession.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select 
                        value={newSession.duration} 
                        onValueChange={(value) => handleSelectChange("duration", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30 min">30 min</SelectItem>
                          <SelectItem value="60 min">60 min</SelectItem>
                          <SelectItem value="90 min">90 min</SelectItem>
                          <SelectItem value="120 min">120 min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newSession.description}
                      onChange={handleInputChange}
                      placeholder="Provide a brief description of the session"
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">Add Session</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {sortedDates.length > 0 ? (
          <Tabs defaultValue={sortedDates[0]} className="w-full">
            <TabsList className="mb-6 flex flex-wrap justify-start">
              {sortedDates.map(date => (
                <TabsTrigger key={date} value={date} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {sortedDates.map(date => (
              <TabsContent key={date} value={date} className="space-y-4">
                {groupedSessions[date].map(session => (
                  <Card key={session.id} className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="bg-lovely-soft-blue pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{session.topic}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>{session.name} - {session.role}</span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-600 mb-4">{session.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-primary">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(session.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-primary">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{session.time} ({session.duration})</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                        Register for Session
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No sessions scheduled yet. Add a new session to get started.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleSection;
