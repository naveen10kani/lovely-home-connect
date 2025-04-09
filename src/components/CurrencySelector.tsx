
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

interface CurrencySelectorProps {
  onCurrencyChange: (currency: { code: string; symbol: string; name: string }) => void;
}

const CurrencySelector = ({ onCurrencyChange }: CurrencySelectorProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleCurrencySelect = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    onCurrencyChange(currency);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1 h-9 px-3 rounded-md border border-input">
          <span>{selectedCurrency.symbol}</span>
          <span>{selectedCurrency.code}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleCurrencySelect(currency)}
          >
            <div className="flex items-center gap-2">
              <span className="w-6">{currency.symbol}</span>
              <span>{currency.code}</span>
            </div>
            {selectedCurrency.code === currency.code && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
