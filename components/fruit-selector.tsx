"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { offerFruitsAtom, requestFruitsAtom, isSelectModalOpenAtom } from "@/lib/store"
import { fruits } from "@/data/fruits"
import type { Fruit } from "@/types/fruit"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Image from "next/image"

interface FruitSelectorProps {
  onClose: () => void
  selectionType: "offer" | "request"
}

export default function FruitSelector({ onClose, selectionType }: FruitSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [offerFruits, setOfferFruits] = useAtom(offerFruitsAtom)
  const [requestFruits, setRequestFruits] = useAtom(requestFruitsAtom)
  const [isOpen, setIsOpen] = useAtom(isSelectModalOpenAtom)

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const handleSelect = (fruit: Fruit) => {
    if (selectionType === "offer") {
      // Check if fruit is already in the offer list
      if (!offerFruits.some((f) => f.id === fruit.id)) {
        // Only add if we have less than 4 fruits
        if (offerFruits.length < 4) {
          setOfferFruits([...offerFruits, fruit])
        }
      }
    } else {
      // Check if fruit is already in the request list
      if (!requestFruits.some((f) => f.id === fruit.id)) {
        // Only add if we have less than 4 fruits
        if (requestFruits.length < 4) {
          setRequestFruits([...requestFruits, fruit])
        }
      }
    }
    handleClose()
  }

  const filteredFruits = fruits.filter((fruit) => fruit.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#0c0c2a] text-white border-[#2e2e5a] max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Select a Fruit</DialogTitle>
          <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search fruits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a1a4a] border-[#2e2e5a] text-white pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
          {filteredFruits.map((fruit) => (
            <div
              key={fruit.id}
              onClick={() => handleSelect(fruit)}
              className="bg-[#1a1a4a] rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-[#2e2e5a] transition-colors"
            >
              <Image
                src={fruit.image || "/placeholder.svg"}
                alt={fruit.name}
                width={60}
                height={60}
                className="object-contain mb-2"
              />
              <span className="font-medium">{fruit.name}</span>
              <span className="text-sm text-gray-400">Value: {fruit.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

