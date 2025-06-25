
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export const FilterModal = ({ isOpen, onClose, onApplyFilters }: FilterModalProps) => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    condition: [] as string[],
    priceRange: [0, 100000000],
    brands: [] as string[],
    inStock: false,
    sortBy: "name"
  });

  const categories = ["Camera", "Lens", "Accessories"];
  const conditions = ["New", "Used"];
  const brands = ["Canon", "Sony", "Nikon", "Fujifilm", "Sigma", "Tamron"];
  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-low", label: "Price (Low to High)" },
    { value: "price-high", label: "Price (High to Low)" },
    { value: "stock", label: "Stock Level" },
    { value: "rating", label: "Rating" }
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] });
    } else {
      setFilters({ ...filters, categories: filters.categories.filter(c => c !== category) });
    }
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, condition: [...filters.condition, condition] });
    } else {
      setFilters({ ...filters, condition: filters.condition.filter(c => c !== condition) });
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, brands: [...filters.brands, brand] });
    } else {
      setFilters({ ...filters, brands: filters.brands.filter(b => b !== brand) });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      condition: [],
      priceRange: [0, 100000000],
      brands: [],
      inStock: false,
      sortBy: "name"
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.condition.length + 
    filters.brands.length + 
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000000 ? 1 : 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Filter Products
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <label htmlFor={category} className="text-sm">{category}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h3 className="font-medium mb-3">Condition</h3>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={filters.condition.includes(condition)}
                    onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                  />
                  <label htmlFor={condition} className="text-sm">{condition}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                max={100000000}
                step={1000000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Rp {filters.priceRange[0].toLocaleString('id-ID')}</span>
                <span>Rp {filters.priceRange[1].toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-medium mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <label htmlFor={brand} className="text-sm">{brand}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Filter */}
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) => setFilters({ ...filters, inStock: checked as boolean })}
              />
              <label htmlFor="inStock" className="text-sm">In Stock Only</label>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
