import { atom } from "jotai"
import type { Fruit } from "@/types/fruit"

// Define atoms for selected fruits
export const offerFruitsAtom = atom<Fruit[]>([])
export const requestFruitsAtom = atom<Fruit[]>([])

// Derived atoms for calculations
export const offerPriceAtom = atom((get) => {
  const fruits = get(offerFruitsAtom)
  return fruits.reduce((total, fruit) => total + fruit.price, 0)
})

export const offerValueAtom = atom((get) => {
  const fruits = get(offerFruitsAtom)
  return fruits.reduce((total, fruit) => total + fruit.value, 0)
})

export const requestPriceAtom = atom((get) => {
  const fruits = get(requestFruitsAtom)
  return fruits.reduce((total, fruit) => total + fruit.price, 0)
})

export const requestValueAtom = atom((get) => {
  const fruits = get(requestFruitsAtom)
  return fruits.reduce((total, fruit) => total + fruit.value, 0)
})

// Atom for showing the fruit selection modal
export const isSelectModalOpenAtom = atom(false)
export const selectionTypeAtom = atom<"offer" | "request">("offer")

