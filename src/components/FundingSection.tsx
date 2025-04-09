
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BookHeart, User, Home, Users } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import { useToast } from "@/hooks/use-toast";

const DONATION_AMOUNTS = [500, 1000, 5000, 10000];

const FundingSection = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(DONATION_AMOUNTS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState({ code: "INR", symbol: "₹", name: "Indian Rupee" });
  const [category, setCategory] = useState("general");
  const { toast } = useToast();

  const handleAmountSelect = (amount: number | "custom") => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount(amount.toString());
    } else {
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = selectedAmount === "custom" ? customAmount : selectedAmount.toString();
    
    toast({
      title: "Thank you for your donation!",
      description: `Your ${currency.symbol}${donationAmount} donation to ${categoryLabel(category)} is being processed.`,
      variant: "default",
    });
  };

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case "general": return "General Support";
      case "education": return "Education";
      case "healthcare": return "Healthcare";
      case "nutrition": return "Nutrition & Food";
      default: return "General Support";
    }
  };

  const handleCurrencyChange = (newCurrency: { code: string; symbol: string; name: string }) => {
    setCurrency(newCurrency);
  };

  return (
    <section id="funding" className="section-padding bg-lovely-soft-green">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fund a Cause</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your generous contributions help us provide better care, facilities, and opportunities for those in need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-2" />
              <CardTitle>General Support</CardTitle>
              <CardDescription>
                Provide overall support to our homes and the individuals we care for
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <BookHeart className="w-12 h-12 text-primary mx-auto mb-2" />
              <CardTitle>Education Fund</CardTitle>
              <CardDescription>
                Support educational needs, resources, and learning opportunities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <User className="w-12 h-12 text-primary mx-auto mb-2" />
              <CardTitle>Healthcare Support</CardTitle>
              <CardDescription>
                Fund medical needs, regular check-ups, and health facilities
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="amount">Select Donation Amount</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {DONATION_AMOUNTS.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={selectedAmount === amount ? "default" : "outline"}
                      className={selectedAmount === amount ? "bg-primary text-white" : "border-primary text-primary"}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      {currency.symbol}{amount}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant={selectedAmount === "custom" ? "default" : "outline"}
                    className={selectedAmount === "custom" ? "bg-primary text-white col-span-2" : "border-primary text-primary col-span-2"}
                    onClick={() => handleAmountSelect("custom")}
                  >
                    Custom Amount
                  </Button>
                </div>
              </div>

              {selectedAmount === "custom" && (
                <div>
                  <Label htmlFor="customAmount">Enter Custom Amount</Label>
                  <div className="flex items-center mt-2">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">{currency.symbol}</span>
                      </div>
                      <Input
                        id="customAmount"
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="pl-8"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label>Currency</Label>
                <div className="mt-2">
                  <CurrencySelector onCurrencyChange={handleCurrencyChange} />
                </div>
              </div>

              <div>
                <Label>Select Category</Label>
                <RadioGroup 
                  defaultValue="general" 
                  value={category}
                  onValueChange={setCategory}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="cursor-pointer">General Support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="education" id="education" />
                    <Label htmlFor="education" className="cursor-pointer">Education</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="healthcare" id="healthcare" />
                    <Label htmlFor="healthcare" className="cursor-pointer">Healthcare</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nutrition" id="nutrition" />
                    <Label htmlFor="nutrition" className="cursor-pointer">Nutrition & Food</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Donate Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FundingSection;
