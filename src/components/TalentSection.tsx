
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Star, Music, BookOpen, Award, Mic, FileVideo, Heart, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Initial talent data
const initialTalents = [
  {
    id: "1",
    name: "Ram",
    type: "Singer",
    bio: "Ram has a soulful voice and performs both classical and modern songs.",
    achievements: "Won first place in the district-level singing competition."
  },
  {
    id: "2",
    name: "Chellatha",
    type: "Storyteller",
    bio: "Chellatha captivates everyone with her imaginative stories and expressive narration.",
    achievements: "Published a collection of short stories in the local newspaper."
  },
  {
    id: "3",
    name: "Mariyappan",
    type: "Self-defence",
    bio: "Mariyappan teaches valuable self-defence techniques to others.",
    achievements: "Black belt in Karate and certified instructor."
  }
];

const TalentSection = () => {
  const [talents, setTalents] = useState(initialTalents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTalent, setNewTalent] = useState({
    name: "",
    type: "",
    bio: "",
    achievements: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTalent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new talent
    const updatedTalents = [
      ...talents,
      {
        id: (talents.length + 1).toString(),
        ...newTalent
      }
    ];
    
    setTalents(updatedTalents);
    setIsDialogOpen(false);
    
    // Reset form
    setNewTalent({
      name: "",
      type: "",
      bio: "",
      achievements: ""
    });
    
    toast({
      title: "Talent Added!",
      description: "The new talent has been added to the showcase.",
    });
  };

  // Icon mapping for different talent types
  const getIconForTalentType = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("sing") || lowerType.includes("music")) return <Music className="h-6 w-6 text-primary" />;
    if (lowerType.includes("story") || lowerType.includes("write")) return <BookOpen className="h-6 w-6 text-primary" />;
    if (lowerType.includes("self") || lowerType.includes("defence") || lowerType.includes("martial")) return <Award className="h-6 w-6 text-primary" />;
    if (lowerType.includes("speak") || lowerType.includes("poetry")) return <Mic className="h-6 w-6 text-primary" />;
    if (lowerType.includes("dance") || lowerType.includes("act")) return <FileVideo className="h-6 w-6 text-primary" />;
    if (lowerType.includes("art") || lowerType.includes("paint") || lowerType.includes("draw")) return <Pencil className="h-6 w-6 text-primary" />;
    return <Star className="h-6 w-6 text-primary" />;
  };

  return (
    <section id="talent" className="section-padding bg-lovely-soft-peach">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Talent Showcase</h2>
            <p className="text-gray-600 max-w-2xl">
              Celebrating and showcasing the amazing talents of our residents.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 flex items-center gap-2 bg-primary hover:bg-primary/90">
                <PlusCircle className="h-4 w-4" />
                <span>Add Talent</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Talent</DialogTitle>
                  <DialogDescription>
                    Add a new talent to the showcase. Fill in all the fields below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newTalent.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Talent Type</Label>
                      <Input
                        id="type"
                        name="type"
                        value={newTalent.type}
                        onChange={handleInputChange}
                        placeholder="e.g., Singer, Dancer"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={newTalent.bio}
                      onChange={handleInputChange}
                      placeholder="Brief description of the talent"
                      className="resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="achievements">Achievements</Label>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      value={newTalent.achievements}
                      onChange={handleInputChange}
                      placeholder="Notable achievements (optional)"
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">Add Talent</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talents.map(talent => (
            <Card key={talent.id} className="overflow-hidden hover-scale card-shadow bg-white">
              <CardHeader className="bg-lovely-soft-purple pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{talent.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      {getIconForTalentType(talent.type)}
                      <span className="ml-1">{talent.type}</span>
                    </CardDescription>
                  </div>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4">{talent.bio}</p>
                {talent.achievements && (
                  <div className="bg-lovely-soft-yellow p-3 rounded-md">
                    <div className="font-semibold text-sm text-gray-700 mb-1">Achievements:</div>
                    <p className="text-sm text-gray-600">{talent.achievements}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  Support This Talent
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentSection;
