"use client"

import { useAtom } from "jotai"
import {
  offerFruitsAtom,
  requestFruitsAtom,
  offerPriceAtom,
  offerValueAtom,
  requestPriceAtom,
  requestValueAtom,
  isSelectModalOpenAtom,
  selectionTypeAtom,
} from "@/lib/store"
import FruitSelector from "./fruit-selector"
import FruitGrid from "./fruit-grid"
import { InfoIcon } from "lucide-react"

export default function Calculator() {
  const [offerFruits, setOfferFruits] = useAtom(offerFruitsAtom)
  const [requestFruits, setRequestFruits] = useAtom(requestFruitsAtom)
  const [offerPrice] = useAtom(offerPriceAtom)
  const [offerValue] = useAtom(offerValueAtom)
  const [requestPrice] = useAtom(requestPriceAtom)
  const [requestValue] = useAtom(requestValueAtom)
  const [isSelectModalOpen, setIsSelectModalOpen] = useAtom(isSelectModalOpenAtom)
  const [selectionType, setSelectionType] = useAtom(selectionTypeAtom)

  const handleAddFruit = (type: "offer" | "request") => {
    setSelectionType(type)
    setIsSelectModalOpen(true)
  }

  const handleRemoveFruit = (type: "offer" | "request", fruitId: string) => {
    if (type === "offer") {
      setOfferFruits(offerFruits.filter((fruit) => fruit.id !== fruitId))
    } else {
      setRequestFruits(requestFruits.filter((fruit) => fruit.id !== fruitId))
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div className="w-full max-w-5xl">
      {/* First Row: Fruit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8  p-12 rounded-2xl border border-[#1a1a40] ">
        <div>
          <h2 className="text-white text-xl font-light mb-4 text-center">Offer (you)</h2>
          <FruitGrid
            fruits={offerFruits}
            onAddClick={() => handleAddFruit("offer")}
            onRemove={(fruitId) => handleRemoveFruit("offer", fruitId)}
          />
        </div>
        <div>
          <h2 className="text-white text-xl font-light mb-4 text-center">Request (them)</h2>
          <FruitGrid
            fruits={requestFruits}
            onAddClick={() => handleAddFruit("request")}
            onRemove={(fruitId) => handleRemoveFruit("request", fruitId)}
          />
        </div>
      </div>

      {/* Second Row: Price, Value Difference, Price */}
      <div className="mt-8 flex justify-around">
        <div className="bg-[#0c0c2a] rounded-full px-6 py-2 text-white">
          <span className="font-normal">Price : </span>
          <span>{formatNumber(offerPrice)}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <InfoIcon className="h-4 w-4 mr-2" />
          <span>Value Differences</span>
        </div>
        <div className="bg-[#0c0c2a] rounded-full px-6 py-2 text-white">
          <span className="font-normal">Price : </span>
          <span>{formatNumber(requestPrice)}</span>
        </div>
      </div>

      {/* Third Row: Value Provider */}
      <div className="mt-4 text-center text-gray-400 text-sm">
        Value provider: <span className="text-blue-500">Gamersberg</span>
      </div>

      {/* Fourth Row: Value, No Items Selected, Value */}
      <div className="mt-4 flex justify-around items-center">
        <div className="bg-[#0c0c2a] rounded-full px-6 py-2 text-white">
          <span className="font-normal">Value : </span>
          <span>{formatNumber(offerValue)}</span>
        </div>
        {offerFruits.length === 0 && requestFruits.length === 0 && (
          <div className="text-gray-400">no items selected</div>
        )}
        <div className="bg-[#0c0c2a] rounded-full px-6 py-2 text-white">
          <span className="font-normal">Value : </span>
          <span>{formatNumber(requestValue)}</span>
        </div>
      </div>

      {/* Fruit Selection Modal */}
      {isSelectModalOpen && <FruitSelector onClose={() => setIsSelectModalOpen(false)} selectionType={selectionType} />}
    </div>
  )
}
