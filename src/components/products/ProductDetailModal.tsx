
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Heart, ShoppingCart, Camera, Package, Calendar, Eye } from "lucide-react";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onAddToOrder: (product: any) => void;
}

export const ProductDetailModal = ({ isOpen, onClose, product, onAddToOrder }: ProductDetailModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  // Mock additional images for the product
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582461072011-e7d78c6e0e76?w=400&h=300&fit=crop",
  ];

  const productSpecs = [
    { label: "Brand", value: product.name.split(" ")[0] },
    { label: "Condition", value: product.condition === "new" ? "Brand New" : "Used - Good" },
    { label: "Warranty", value: product.condition === "new" ? "1 Year International" : "3 Months Store" },
    { label: "Stock Available", value: `${product.stock} units` },
    { label: "Category", value: product.category },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? "border-emerald-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant={product.condition === "new" ? "default" : "secondary"}>
                  {product.condition === "new" ? "New" : "Used"}
                </Badge>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-emerald-600">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Package size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="font-semibold mb-3">Specifications</h3>
              <div className="space-y-2">
                {productSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This high-quality {product.category.toLowerCase()} offers exceptional performance and reliability. 
                Perfect for both professional and enthusiast photographers. 
                {product.condition === "new" 
                  ? "Brand new with full warranty and original packaging." 
                  : "Pre-owned in excellent condition, thoroughly tested and guaranteed to work perfectly."
                }
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                disabled
              >
                <Heart size={16} className="mr-2" />
                Add to Wishlist
              </Button>
              <Button
                onClick={() => {
                  onAddToOrder(product);
                  onClose();
                }}
                disabled={product.stock === 0}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                <ShoppingCart size={16} className="mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Order"}
              </Button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Eye size={16} />
                <span>127 views today</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>Added 3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
