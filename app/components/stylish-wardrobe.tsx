"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Define the structure of a wardrobe item and the whole wardrobe
interface WardrobeItem {
  id: string;
  imageSrc: string;
}

type WardrobeCategory = "tops" | "bottoms" | "dresses" | "outerwear";

interface Wardrobe {
  tops: WardrobeItem[];
  bottoms: WardrobeItem[];
  dresses: WardrobeItem[];
  outerwear: WardrobeItem[];
}

// Define the props for the component
interface MyWardrobeProps {
  onGarmentSelect: (imageSrc: string) => void;
}

const STORAGE_KEY = "styleai_wardrobe";

// --- Define Default Photos ---
const DEFAULT_PHOTOS: Wardrobe = {
  tops: [
    { id: "default-top-1", imageSrc: "cloth/Top/01_white_shirt.webp" },
    { id: "default-top-2", imageSrc: "cloth/Top/02_stripped_tank_top.jpg" },
    { id: "default-top-3", imageSrc: "cloth/Top/03_polo_shirt.jpg" },
    { id: "default-top-4", imageSrc: "cloth/Top/04_stripped_button_up_shirt_2.jpg" },
    { id: "default-top-5", imageSrc: "cloth/Top/05_stripped_knit_top.jpg" },
    { id: "default-top-6", imageSrc: "cloth/Top/06_printed_shirt.jpg" },
    { id: "default-top-7", imageSrc: "cloth/Top/07_green_blouse.jpg" },
    { id: "default-top-8", imageSrc: "cloth/Top/08_stripped_button_up_shirt.png" },
    { id: "default-top-9", imageSrc: "cloth/Top/09_white_blouse.jpg" },
    { id: "default-top-10", imageSrc: "cloth/Top/10_yellow_sleeveless_top.jpg" },
    { id: "default-top-11", imageSrc: "cloth/Top/11_floral_shirt.jpg" },
    { id: "default-top-12", imageSrc: "cloth/Top/12_ivory_vest.webp" },
    { id: "default-top-13", imageSrc: "cloth/Top/13_black_camisole.jpg" },
  ],
  bottoms: [
    { id: "default-bottom-1", imageSrc: "cloth/Bottoms/01_white_shorts.jpg"},
    { id: "default-bottom-2", imageSrc: "cloth/Bottoms/02_white_maxi_skirt.png"},
    { id: "default-bottom-3", imageSrc: "cloth/Bottoms/03_white_wide_leg_pants.jpg"},
    { id: "default-bottom-4", imageSrc: "cloth/Bottoms/04_denim_wide_leg_pants.jpg"},
    { id: "default-bottom-5", imageSrc: "cloth/Bottoms/05_denim_shorts.jpg"},
    { id: "default-bottom-6", imageSrc: "cloth/Bottoms/06_black_jeans.jpg"},
    { id: "default-bottom-7", imageSrc: "cloth/Bottoms/07_black_satin_dress.png"},
    { id: "default-bottom-8", imageSrc: "cloth/Bottoms/08_pencil_skirt.jpg"},
    { id: "default-bottom-9", imageSrc: "cloth/Bottoms/09_pink_satin_skirt.jpg"},
    { id: "default-bottom-10", imageSrc: "cloth/Bottoms/10_leopard_satin_skirt.jpg"},
    { id: "default-bottom-11", imageSrc: "cloth/Bottoms/11_floral_maxi_skirt.jpg"},
    { id: "default-bottom-12", imageSrc: "cloth/Bottoms/12_lemon_skirt.jpg"},
    { id: "default-bottom-13", imageSrc: "cloth/Bottoms/13_white_plated_skirt.jpg"},
  ],
  dresses: [
    { id: "default-dress-1", imageSrc: "cloth/Dress/01_black_dress.webp"},
    { id: "default-dress-2", imageSrc: "cloth/Dress/02_black_dress2.jpg"},
    { id: "default-dress-3", imageSrc: "cloth/Dress/03_ivory_dress.jpg"},
    { id: "default-dress-4", imageSrc: "cloth/Dress/04_red_dress.jpg"},
    { id: "default-dress-5", imageSrc: "cloth/Dress/05_black_dress_with_white_silk.jpg"},
    { id: "default-dress-6", imageSrc: "cloth/Dress/06_whide_dress2.jpg"},
    { id: "default-dress-7", imageSrc: "cloth/Dress/07_preppy_dress.jpg"},
    { id: "default-dress-8", imageSrc: "cloth/Dress/08_floral_dress.webp"},
    { id: "default-dress-9", imageSrc: "cloth/Dress/09_butter_yellow_dress2.webp"},
    { id: "default-dress-10", imageSrc: "cloth/Dress/10_green_dress.jpg"},
    { id: "default-dress-11", imageSrc: "cloth/Dress/11_black_jumpsuit.jpg"},
    { id: "default-dress-12", imageSrc: "cloth/Dress/12_cemaral_jumpsuit.png"},
    { id: "default-dress-13", imageSrc: "cloth/Dress/13_white_jumpsuit.jpg"},
    { id: "default-dress-14", imageSrc: "cloth/Dress/14_black_dress.jpg"},
  ],
  outerwear: [
    { id: "default-outerwear-1", imageSrc: "cloth/Outwear/01_white_blazer.jpg"},
    { id: "default-outerwear-2", imageSrc: "cloth/Outwear/02_beige_blazer.jpg"},
    { id: "default-outerwear-3", imageSrc: "cloth/Outwear/03_black_leather_jacket.jpg"},
    { id: "default-outerwear-4", imageSrc: "cloth/Outwear/04_denim_jacket.jpg"},
    { id: "default-outerwear-5", imageSrc: "cloth/Outwear/05_white_denim_jacket.jpg"},
    { id: "default-outerwear-6", imageSrc: "cloth/Outwear/06_cardigan_coat.webp"},
    { id: "default-outerwear-7", imageSrc: "cloth/Outwear/07_yellow_oversize_cardigan.jpg"},
    { id: "default-outerwear-8", imageSrc: "cloth/Outwear/08_black_short_trench_coat.jpg"},
    { id: "default-outerwear-9", imageSrc: "cloth/Outwear/09_blue_cropped_blazer.jpg"},
    { id: "default-outerwear-10", imageSrc: "cloth/Outwear/10_ivory_cropped_blazer.webp"},
    { id: "default-outerwear-11", imageSrc: "cloth/Outwear/11_cropped_jacket.jpg"},
    { id: "default-outerwear-12", imageSrc: "cloth/Outwear/12_trench_coat.webp"},
    { id: "default-outerwear-13", imageSrc: "cloth/Outwear/13_trench_coat.jpg"},
    { id: "default-outerwear-14", imageSrc: "cloth/Outwear/14_black_blazer.jpg"},
    { id: "default-outerwear-15", imageSrc: "cloth/Outwear/15_pink_blazer.jpg"},
    { id: "default-outerwear-16", imageSrc: "cloth/Outwear/16_leather_jacket2.jpg"},
    { id: "default-outerwear-17", imageSrc: "cloth/Outwear/17_leather_jacket.jpg"},
    { id: "default-outerwear-18", imageSrc: "cloth/Outwear/18_baseball_jeacket.jpg"},
    { id: "default-outerwear-19", imageSrc: "cloth/Outwear/19_varsity_jacket.jpg"},
  ],
};

const INITIAL_WARDROBE: Wardrobe = {
  tops: [],
  bottoms: [],
  dresses: [],
  outerwear: [],
};

export default function MyWardrobe({ onGarmentSelect }: MyWardrobeProps) {
  const [wardrobe, setWardrobe] = useState<Wardrobe>(INITIAL_WARDROBE);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentCategoryRef = useRef<WardrobeCategory | null>(null);

  // Effect to load from localStorage on mount
  useEffect(() => {
    try {
      const storedItem = window.localStorage.getItem(STORAGE_KEY);
      if (storedItem) {
        setWardrobe(JSON.parse(storedItem));
      }
    } catch (error) {
      console.error("Failed to parse wardrobe from localStorage", error);
    }
  }, []);

  // Effect to persist wardrobe changes to localStorage
  useEffect(() => {
    // Only save if the wardrobe is not the initial empty state.
    if (JSON.stringify(wardrobe) !== JSON.stringify(INITIAL_WARDROBE)) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wardrobe));
      } catch (error) {
        console.error("Failed to save wardrobe to localStorage", error);
      }
    }
  }, [wardrobe]);

  // --- Start: New validation AND RESIZING logic ---

  const processAndResizeImage = async (file: File): Promise<string | null> => {
    // 1. Validate file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file format. Please upload a JPG or PNG image.");
      return null;
    }

    // 2. Validate file size (max 10MB) - this is for the RAW upload
    const maxSizeInBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("File is too large. Please upload an image smaller than 10MB.");
      return null;
    }

    // 3. Resize the image to a thumbnail and validate original dimensions
    return new Promise((resolve) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        if (img.width < 300 || img.height < 300) {
          alert(
            "Image dimensions are too small. Please use an image that is at least 300x300 pixels.",
          );
          URL.revokeObjectURL(objectUrl);
          resolve(null);
          return;
        }

        // Create canvas for resizing
        const canvas = document.createElement("canvas");
        const MAX_DIMENSION = 1024; // Increased from 512 to 1024 for higher quality
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIMENSION) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          alert("Could not get canvas context for resizing.");
          URL.revokeObjectURL(objectUrl);
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Get the resized image as a JPEG Data URL (more efficient for photos)
        const resizedImageSrc = canvas.toDataURL("image/jpeg", 0.85); // Use JPEG with 85% quality
        URL.revokeObjectURL(objectUrl);
        resolve(resizedImageSrc);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        alert("Could not read image file. It might be corrupted.");
        resolve(null);
      };
      img.src = objectUrl;
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const category = currentCategoryRef.current;

    if (file && category) {
      const imageSrc = await processAndResizeImage(file); // Use the new resizing function
      if (imageSrc) {
        const newItem: WardrobeItem = {
          id: `item-${Date.now()}`,
          imageSrc,
        };
        setWardrobe((prev) => {
          // Filter out default items before adding the new one
          const userItems = prev[category].filter((item) => !item.id.startsWith("default-"));
          return {
            ...prev,
            [category]: [newItem, ...userItems],
          };
        });
      }
    }

    // Reset the input value to allow uploading the same file again
    if (event.target) {
      event.target.value = "";
    }
  };

  // --- End: New validation and resizing logic ---

  const handleAddClick = (category: WardrobeCategory) => {
    currentCategoryRef.current = category;
    fileInputRef.current?.click();
  };

  const handleDeleteItem = (category: WardrobeCategory, itemId: string) => {
    // Add a confirmation dialog to prevent accidental deletion
    if (window.confirm("Are you sure you want to delete this item?")) {
      setWardrobe((prev) => {
        const updatedItems = prev[category].filter((item) => item.id !== itemId);
        return {
          ...prev,
          [category]: updatedItems,
        };
      });
    }
  };

  // This is a simplified render function for one category.
  // We will build this out with proper styling.
  const renderCategory = (
    category: WardrobeCategory,
    name: string,
    emoji: string,
    colorClass: string,
  ) => {
    const userItems = wardrobe[category];
    const defaultItems = DEFAULT_PHOTOS[category];
    const itemsToDisplay = [
      ...userItems,
      ...defaultItems.filter(
        (dItem) => !userItems.some((uItem) => uItem.imageSrc === dItem.imageSrc),
      ),
    ];

    return (
      <div className={`${colorClass} rounded-3xl p-4 shadow-lg`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-lg">{emoji}</span>
            </div>
            <span className="font-playfair text-base font-bold text-white">{name}</span>
          </div>
          <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs font-sans font-medium text-white">
            {itemsToDisplay.length}
          </span>
        </div>
        
        {/* Horizontal scrollable container */}
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {/* Add Button - Always visible at the start */}
            <div
              onClick={() => handleAddClick(category)}
              className="flex-shrink-0 w-16 h-16 bg-white/30 rounded-xl shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-white/40 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center mb-1">
                <span className="text-sm text-white">+</span>
              </div>
              <p className="text-xs text-white font-medium">Add</p>
            </div>
            
            {/* Item List - All items in horizontal scroll */}
            {itemsToDisplay.map((item) => (
              <div
                key={item.id}
                onClick={() => onGarmentSelect(item.imageSrc)}
                className="relative group w-16 h-16 bg-white rounded-xl shadow-sm cursor-pointer overflow-hidden flex-shrink-0"
              >
                <img
                  src={item.imageSrc}
                  alt="wardrobe item"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the main card's click event
                    handleDeleteItem(category, item.id);
                  }}
                  className="absolute top-1 right-1 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-red-500"
                  aria-label="Delete item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          {/* Gradient fade effect on the right to indicate more content */}
          {itemsToDisplay.length > 4 && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload guidance section */}
      <div className="mb-4 p-3 bg-blue-50 rounded-2xl border border-blue-200">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">💡</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="font-medium text-blue-900">Upload Tips for Best Results:</p>
            <p className="text-blue-700">✅ Product photos or clothing on white/clean background</p>
            <p className="text-blue-700">✅ Clear, well-lit clothing items without people</p>
            <p className="text-red-600">❌ Avoid photos with people wearing the clothes</p>
          </div>
        </div>
      </div>

      {/* Container to ensure vertical stacking */}
      <div className="flex flex-col gap-y-4">
        {renderCategory("tops", "Tops", "👚", "bg-rose-400")}
        {renderCategory("bottoms", "Bottoms", "👖", "bg-sky-400")}
        {renderCategory("dresses", "Dresses", "👗", "bg-amber-400")}
        {renderCategory("outerwear", "Outerwear", "🧥", "bg-emerald-400")}
      </div>
    </div>
  );
}
