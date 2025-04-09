
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserPlus, Database, Home, User, FileEdit, Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Initial home data
const initialHomes = [
  {
    id: "1",
    name: "Sunshine Children's Home",
    type: "Orphanage",
    location: "Chennai",
    capacity: 35,
    currentOccupancy: 28,
    contactPerson: "Ravi Kumar",
    contactNumber: "9876543210"
  },
  {
    id: "2",
    name: "Golden Years Haven",
    type: "Old Age Home",
    location: "Coimbatore",
    capacity: 40,
    currentOccupancy: 32,
    contactPerson: "Lakshmi Devi",
    contactNumber: "8765432109"
  }
];

// Initial residents data
const initialResidents = [
  {
    id: "1",
    homeId: "1",
    name: "Arun",
    age: 12,
    medicalCondition: "Asthma",
    checkupFrequency: "Monthly",
    lastCheckup: "2025-03-15",
    nextCheckup: "2025-04-15",
    notes: "Requires regular inhaler. Doing well in studies."
  },
  {
    id: "2",
    homeId: "1",
    name: "Priya",
    age: 9,
    medicalCondition: "None",
    checkupFrequency: "Quarterly",
    lastCheckup: "2025-02-20",
    nextCheckup: "2025-05-20",
    notes: "Interested in art and craft. Healthy development."
  },
  {
    id: "3",
    homeId: "2",
    name: "Krishnan",
    age: 72,
    medicalCondition: "High Blood Pressure",
    checkupFrequency: "Bi-weekly",
    lastCheckup: "2025-04-02",
    nextCheckup: "2025-04-16",
    notes: "Taking medication regularly. Enjoys reading."
  }
];

interface Home {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  contactPerson: string;
  contactNumber: string;
}

interface Resident {
  id: string;
  homeId: string;
  name: string;
  age: number;
  medicalCondition: string;
  checkupFrequency: string;
  lastCheckup: string;
  nextCheckup: string;
  notes: string;
}

// Mock login for admin access
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [homes, setHomes] = useState<Home[]>(initialHomes);
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [newHome, setNewHome] = useState<Partial<Home>>({});
  const [newResident, setNewResident] = useState<Partial<Resident>>({});
  const [isHomeDialogOpen, setIsHomeDialogOpen] = useState(false);
  const [isResidentDialogOpen, setIsResidentDialogOpen] = useState(false);
  const [selectedHomeId, setSelectedHomeId] = useState<string | null>(null);
  const [editingHome, setEditingHome] = useState<Home | null>(null);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleHomeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingHome) {
      setEditingHome({ ...editingHome, [name]: value });
    } else {
      setNewHome({ ...newHome, [name]: value });
    }
  };

  const handleHomeIntegerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const intValue = parseInt(value) || 0;
    if (editingHome) {
      setEditingHome({ ...editingHome, [name]: intValue });
    } else {
      setNewHome({ ...newHome, [name]: intValue });
    }
  };

  const handleHomeTypeChange = (value: string) => {
    if (editingHome) {
      setEditingHome({ ...editingHome, type: value });
    } else {
      setNewHome({ ...newHome, type: value });
    }
  };

  const handleResidentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingResident) {
      setEditingResident({ ...editingResident, [name]: value });
    } else {
      setNewResident({ ...newResident, [name]: value });
    }
  };

  const handleResidentIntegerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const intValue = parseInt(value) || 0;
    if (editingResident) {
      setEditingResident({ ...editingResident, [name]: intValue });
    } else {
      setNewResident({ ...newResident, [name]: intValue });
    }
  };

  const handleResidentSelectChange = (name: string, value: string) => {
    if (editingResident) {
      setEditingResident({ ...editingResident, [name]: value });
    } else {
      setNewResident({ ...newResident, [name]: value });
    }
  };

  const addHome = () => {
    const homeData = {
      id: (homes.length + 1).toString(),
      name: newHome.name || "",
      type: newHome.type || "Orphanage",
      location: newHome.location || "",
      capacity: newHome.capacity || 0,
      currentOccupancy: newHome.currentOccupancy || 0,
      contactPerson: newHome.contactPerson || "",
      contactNumber: newHome.contactNumber || ""
    };
    
    setHomes([...homes, homeData]);
    setNewHome({});
    setIsHomeDialogOpen(false);
    
    toast({
      title: "Home Added",
      description: `${homeData.name} has been added successfully.`,
    });
  };

  const updateHome = () => {
    if (!editingHome) return;
    
    const updatedHomes = homes.map(home => 
      home.id === editingHome.id ? editingHome : home
    );
    
    setHomes(updatedHomes);
    setEditingHome(null);
    setIsHomeDialogOpen(false);
    
    toast({
      title: "Home Updated",
      description: `${editingHome.name} has been updated successfully.`,
    });
  };

  const deleteHome = (id: string) => {
    // Also delete all residents associated with this home
    const updatedHomes = homes.filter(home => home.id !== id);
    const updatedResidents = residents.filter(resident => resident.homeId !== id);
    
    setHomes(updatedHomes);
    setResidents(updatedResidents);
    
    toast({
      title: "Home Deleted",
      description: "The home and all its residents have been removed.",
    });
  };

  const addResident = () => {
    if (!selectedHomeId) return;
    
    const residentData = {
      id: (residents.length + 1).toString(),
      homeId: selectedHomeId,
      name: newResident.name || "",
      age: newResident.age || 0,
      medicalCondition: newResident.medicalCondition || "None",
      checkupFrequency: newResident.checkupFrequency || "Monthly",
      lastCheckup: newResident.lastCheckup || "",
      nextCheckup: newResident.nextCheckup || "",
      notes: newResident.notes || ""
    };
    
    setResidents([...residents, residentData]);
    
    // Update occupancy of the home
    const updatedHomes = homes.map(home => {
      if (home.id === selectedHomeId) {
        return {
          ...home,
          currentOccupancy: home.currentOccupancy + 1
        };
      }
      return home;
    });
    
    setHomes(updatedHomes);
    setNewResident({});
    setIsResidentDialogOpen(false);
    
    toast({
      title: "Resident Added",
      description: `${residentData.name} has been added successfully.`,
    });
  };

  const updateResident = () => {
    if (!editingResident) return;
    
    const updatedResidents = residents.map(resident => 
      resident.id === editingResident.id ? editingResident : resident
    );
    
    setResidents(updatedResidents);
    setEditingResident(null);
    setIsResidentDialogOpen(false);
    
    toast({
      title: "Resident Updated",
      description: `${editingResident.name}'s information has been updated.`,
    });
  };

  const deleteResident = (id: string) => {
    const residentToDelete = residents.find(resident => resident.id === id);
    if (!residentToDelete) return;
    
    const updatedResidents = residents.filter(resident => resident.id !== id);
    
    // Update occupancy of the home
    const updatedHomes = homes.map(home => {
      if (home.id === residentToDelete.homeId) {
        return {
          ...home,
          currentOccupancy: Math.max(0, home.currentOccupancy - 1)
        };
      }
      return home;
    });
    
    setResidents(updatedResidents);
    setHomes(updatedHomes);
    
    toast({
      title: "Resident Removed",
      description: "The resident has been removed from the database.",
    });
  };

  const editHome = (home: Home) => {
    setEditingHome(home);
    setIsHomeDialogOpen(true);
  };

  const editResident = (resident: Resident) => {
    setEditingResident(resident);
    setSelectedHomeId(resident.homeId);
    setIsResidentDialogOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lovely-soft-blue p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Database className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/" className="text-sm text-primary hover:underline">
              Return to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-primary">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Homepage</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setIsAuthenticated(false)}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage homes, residents, and system data</p>
        
        <Tabs defaultValue="homes" className="space-y-8">
          <TabsList className="mb-8">
            <TabsTrigger value="homes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Homes & Facilities
            </TabsTrigger>
            <TabsTrigger value="residents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Residents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="homes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Homes & Facilities</h2>
              <Dialog open={isHomeDialogOpen} onOpenChange={setIsHomeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90" onClick={() => setEditingHome(null)}>
                    <Home className="h-4 w-4" />
                    <span>Add Home</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    editingHome ? updateHome() : addHome();
                  }}>
                    <DialogHeader>
                      <DialogTitle>{editingHome ? "Edit Home" : "Add New Home"}</DialogTitle>
                      <DialogDescription>
                        {editingHome ? "Update the home's information" : "Add a new home or facility to the database"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Facility Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editingHome ? editingHome.name : newHome.name || ""}
                            onChange={handleHomeInputChange}
                            placeholder="Enter facility name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <Select 
                            value={editingHome ? editingHome.type : newHome.type || "Orphanage"} 
                            onValueChange={handleHomeTypeChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Orphanage">Orphanage</SelectItem>
                              <SelectItem value="Old Age Home">Old Age Home</SelectItem>
                              <SelectItem value="Shelter Home">Shelter Home</SelectItem>
                              <SelectItem value="Care Center">Care Center</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={editingHome ? editingHome.location : newHome.location || ""}
                          onChange={handleHomeInputChange}
                          placeholder="City/Town"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Total Capacity</Label>
                          <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            value={editingHome ? editingHome.capacity : newHome.capacity || ""}
                            onChange={handleHomeIntegerChange}
                            placeholder="0"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currentOccupancy">Current Occupancy</Label>
                          <Input
                            id="currentOccupancy"
                            name="currentOccupancy"
                            type="number"
                            value={editingHome ? editingHome.currentOccupancy : newHome.currentOccupancy || ""}
                            onChange={handleHomeIntegerChange}
                            placeholder="0"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactPerson">Contact Person</Label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            value={editingHome ? editingHome.contactPerson : newHome.contactPerson || ""}
                            onChange={handleHomeInputChange}
                            placeholder="Full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactNumber">Contact Number</Label>
                          <Input
                            id="contactNumber"
                            name="contactNumber"
                            value={editingHome ? editingHome.contactNumber : newHome.contactNumber || ""}
                            onChange={handleHomeInputChange}
                            placeholder="Phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        {editingHome ? "Update Home" : "Add Home"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableCaption>List of all homes and facilities</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {homes.length > 0 ? (
                    homes.map((home) => (
                      <TableRow key={home.id}>
                        <TableCell className="font-semibold">{home.name}</TableCell>
                        <TableCell>{home.type}</TableCell>
                        <TableCell>{home.location}</TableCell>
                        <TableCell>{home.capacity}</TableCell>
                        <TableCell>{home.currentOccupancy}</TableCell>
                        <TableCell>
                          <div>{home.contactPerson}</div>
                          <div className="text-xs text-gray-500">{home.contactNumber}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => editHome(home)}
                              className="h-8 px-2"
                            >
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  className="h-8 px-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete {home.name} and all associated residents from the database.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deleteHome(home.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        No homes added yet. Click "Add Home" to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="residents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Residents</h2>
              <Dialog open={isResidentDialogOpen} onOpenChange={setIsResidentDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90" 
                    onClick={() => {
                      setEditingResident(null);
                      if (homes.length > 0 && !selectedHomeId) {
                        setSelectedHomeId(homes[0].id);
                      }
                    }}
                    disabled={homes.length === 0}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Add Resident</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    editingResident ? updateResident() : addResident();
                  }}>
                    <DialogHeader>
                      <DialogTitle>{editingResident ? "Edit Resident" : "Add New Resident"}</DialogTitle>
                      <DialogDescription>
                        {editingResident 
                          ? "Update the resident's information" 
                          : "Add a new resident to the selected home"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {!editingResident && (
                        <div className="space-y-2">
                          <Label htmlFor="homeId">Select Home</Label>
                          <Select 
                            value={selectedHomeId || ""} 
                            onValueChange={setSelectedHomeId}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select home" />
                            </SelectTrigger>
                            <SelectContent>
                              {homes.map(home => (
                                <SelectItem key={home.id} value={home.id}>
                                  {home.name} ({home.type})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editingResident ? editingResident.name : newResident.name || ""}
                            onChange={handleResidentInputChange}
                            placeholder="Full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            name="age"
                            type="number"
                            value={editingResident ? editingResident.age : newResident.age || ""}
                            onChange={handleResidentIntegerChange}
                            placeholder="0"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medicalCondition">Medical Condition</Label>
                        <Input
                          id="medicalCondition"
                          name="medicalCondition"
                          value={editingResident ? editingResident.medicalCondition : newResident.medicalCondition || ""}
                          onChange={handleResidentInputChange}
                          placeholder="Enter medical condition (if any)"
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="checkupFrequency">Checkup Frequency</Label>
                          <Select 
                            value={editingResident ? editingResident.checkupFrequency : newResident.checkupFrequency || "Monthly"} 
                            onValueChange={(value) => handleResidentSelectChange("checkupFrequency", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Weekly">Weekly</SelectItem>
                              <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                              <SelectItem value="Monthly">Monthly</SelectItem>
                              <SelectItem value="Quarterly">Quarterly</SelectItem>
                              <SelectItem value="Semi-annually">Semi-annually</SelectItem>
                              <SelectItem value="Annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastCheckup">Last Checkup</Label>
                          <Input
                            id="lastCheckup"
                            name="lastCheckup"
                            type="date"
                            value={editingResident ? editingResident.lastCheckup : newResident.lastCheckup || ""}
                            onChange={handleResidentInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nextCheckup">Next Checkup</Label>
                          <Input
                            id="nextCheckup"
                            name="nextCheckup"
                            type="date"
                            value={editingResident ? editingResident.nextCheckup : newResident.nextCheckup || ""}
                            onChange={handleResidentInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={editingResident ? editingResident.notes : newResident.notes || ""}
                          onChange={handleResidentInputChange}
                          placeholder="Additional notes or information"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        {editingResident ? "Update Resident" : "Add Resident"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {homes.length > 0 ? (
              <div className="space-y-8">
                {homes.map(home => {
                  const homeResidents = residents.filter(resident => resident.homeId === home.id);
                  
                  return (
                    <div key={home.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="bg-primary bg-opacity-10 p-4 border-b">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-primary">{home.name}</h3>
                            <p className="text-sm text-gray-600">{home.location} • {homeResidents.length} residents</p>
                          </div>
                          <Button 
                            onClick={() => {
                              setSelectedHomeId(home.id);
                              setEditingResident(null);
                              setIsResidentDialogOpen(true);
                            }}
                            className="flex items-center gap-1 bg-primary hover:bg-primary/90"
                            size="sm"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add to {home.type}</span>
                          </Button>
                        </div>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Medical Condition</TableHead>
                            <TableHead>Checkup Frequency</TableHead>
                            <TableHead>Last/Next Checkup</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {homeResidents.length > 0 ? (
                            homeResidents.map(resident => (
                              <TableRow key={resident.id}>
                                <TableCell className="font-semibold">{resident.name}</TableCell>
                                <TableCell>{resident.age}</TableCell>
                                <TableCell>{resident.medicalCondition || "None"}</TableCell>
                                <TableCell>{resident.checkupFrequency}</TableCell>
                                <TableCell>
                                  {resident.lastCheckup && (
                                    <div className="text-xs">
                                      Last: {new Date(resident.lastCheckup).toLocaleDateString()}
                                    </div>
                                  )}
                                  {resident.nextCheckup && (
                                    <div className="text-xs">
                                      Next: {new Date(resident.nextCheckup).toLocaleDateString()}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">{resident.notes}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={() => editResident(resident)}
                                      className="h-8 px-2"
                                    >
                                      <FileEdit className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button 
                                          variant="destructive" 
                                          size="sm"
                                          className="h-8 px-2"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently delete {resident.name}'s record from the database.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction 
                                            onClick={() => deleteResident(resident.id)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                No residents added to this home yet.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">No Homes Added Yet</h3>
                <p className="text-gray-500 mb-4">
                  You need to add homes or facilities before adding residents.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingHome(null);
                    setIsHomeDialogOpen(true);
                  }}
                >
                  Go to Homes & Add One
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
