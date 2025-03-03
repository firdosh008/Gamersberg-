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
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {gridSlots.map((fruit, index) => {
          const isEmptySlot = !fruit && gridSlots.findIndex((slot) => !slot) === index;
          return (
            <div
              key={fruit?.id || `empty-${index}`}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center transition-all ${isEmptySlot ? "group" : ""
                }`}
              style={{
                background: "linear-gradient(to bottom right, rgba(19, 11, 79, 1), rgba(44, 25, 181, 1))",
                border: isEmptySlot ? "2px solid #15F5BA" : "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {fruit ? (
                <>
                  <div className="flex flex-col items-center justify-center h-full w-full relative z-10">
                      <Image
                        src={fruit.image || "/placeholder.svg"}
                        alt={fruit.name}
                        width={60}
                        height={60}
                        className="w-full h-full max-w-[80px] max-h-[80px] object-contain"
                      />
                      <span className="text-white text-sm md:text-base lg:text-medium">
                        {fruit.name}
                      </span>
                    </div>

                  <button
                    onClick={() => onRemove(fruit.id)}
                    className="absolute top-1 right-1 bg-[#0c0c2a] rounded-full p-1 text-gray-400 hover:text-white z-10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : isEmptySlot ? (
                <button
                  onClick={onAddClick}
                  className="w-full h-full flex items-center justify-center relative z-10"
                >
                  <div
                    className="flex items-center justify-center border-4 bg-transparent 
                               lg:w-14 lg:h-14 sm:w-5 sm:h-5 rounded-full transition-all"
                    style={{ borderColor: "#15F5BA" }}
                  >
                    <Plus className="h-8 w-8 sm:h-6 sm:w-6" style={{ color: "#15F5BA" }} />
                  </div>
                </button>
              ) : null}

              {/* **Apply hover effect to entire slot, but keep + sign on top** */}
              {isEmptySlot && (
                <div className="absolute inset-0 transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#130B4F] group-hover:to-[#000000]"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
