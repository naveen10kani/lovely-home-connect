
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="section-padding bg-lovely-soft-blue">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or want to get involved? Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>8438386610</li>
                    <li>9080558409</li>
                    <li>7539954582</li>
                    <li>9600630208</li>
                    <li>9360877990</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-full mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a href="mailto:lovelyhome010@gmail.com" className="text-primary hover:underline">
                    lovelyhome010@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    Contact us for location details of our homes and centers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter subject" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here..." 
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
