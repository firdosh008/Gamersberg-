"use client";

import Image from "next/image";
import type { Fruit } from "@/types/fruit";
import { Plus, X } from "lucide-react";

interface FruitGridProps {
  fruits: Fruit[];
  onAddClick: () => void;
  onRemove: (fruitId: string) => void;
}

export default function FruitGrid({ fruits, onAddClick, onRemove }: FruitGridProps) {
  // Create a grid with 4 slots, filling empty slots with null
  const gridSlots: (Fruit | null)[] = [...fruits];
  while (gridSlots.length < 4) {
    gridSlots.push(null);
  }

  return (
    <div
      className="border border-[#2e2e5a] rounded-xl shadow-[0px_0px_15px_3px_rgba(14,0,130,0.6)] p-4"
      style={{
        background: "linear-gradient(to bottom right, rgba(3, 0, 28, 1), rgba(8, 0, 77, 1))",
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        {gridSlots.map((fruit, index) => (
          <div
            key={fruit?.id || `empty-${index}`}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center
            border-2 transition-colors`}
            style={{
              background: "linear-gradient(to bottom right, rgba(19, 11, 79, 1), rgba(44, 25, 181, 1))",
              borderRadius: "12px",
            }}
          >
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 rounded-lg"
              style={{
                background: "linear-gradient(to bottom right, rgba(3, 0, 28, 1), rgba(8, 0, 77, 1))",
              }}
            ></div>

            {fruit ? (
              <>
                <div className="flex flex-col items-center justify-center p-2 relative">
                  <Image
                    src={fruit.image || "/placeholder.svg"}
                    alt={fruit.name}
                    width={60}
                    height={60}
                    className="object-contain mb-2"
                  />
                  <span className="text-white text-sm font-medium">{fruit.name}</span>
                </div>
                <button
                  onClick={() => onRemove(fruit.id)}
                  className="absolute top-1 right-1 bg-[#0c0c2a] rounded-full p-1 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : gridSlots.findIndex((slot) => !slot) === index ? (
              // **Green Border for + Button Only**
              <button
                onClick={onAddClick}
                className="w-full h-full flex items-center justify-center relative border-2 rounded-lg"
                style={{
                  borderImage: "linear-gradient(to bottom, rgba(21, 245, 186, 1), rgba(0, 90, 66, 1)) 1",
                  borderImageSlice: 1,
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors">
                  <Plus className="h-6 w-6 text-white" />
                </div>
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
