"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Check, Minus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ShoppingItem {
  id: string
  name: string
  checked: boolean
  quantity: number
  category: string
}

const CATEGORIES = [
  { id: "alimentaire", name: "Alimentaire", icon: "🍎", color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "meubles", name: "Meubles", icon: "🪑", color: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: "hygiene", name: "Hygiène", icon: "🧼", color: "bg-purple-100 text-purple-600 border-purple-200" },
  { id: "autre", name: "Autres", icon: "📦", color: "bg-slate-100 text-slate-600 border-slate-200" },
]

export function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("alimentaire")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ndugu-items")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse saved items:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ndugu-items", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (name: string) => {
    const trimmedName = name.trim()
    if (!trimmedName) return

    const newItemObj: ShoppingItem = {
      id: Date.now().toString(),
      name: trimmedName,
      checked: false,
      quantity: 1,
      category: selectedCategory,
    }
    setItems((prev) => [newItemObj, ...prev])
    setNewItem("")
  }

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    // Haptic feedback
    if (typeof window !== "undefined" && window.navigator.vibrate) {
      window.navigator.vibrate(50)
    }
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearAll = () => {
    setItems([])
  }

  const clearChecked = () => {
    setItems((prev) => prev.filter((item) => !item.checked))
  }

  // Sort items: unchecked first, then checked
  const sortedItems = [...items].sort((a, b) => {
    if (a.checked === b.checked) return 0
    return a.checked ? 1 : -1
  })

  const uncheckedCount = items.filter((item) => !item.checked).length
  const checkedCount = items.filter((item) => item.checked).length

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">
          Chargement...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center shadow-sm p-1">
              <Image 
                src="/ndugu.png" 
                alt="Logo" 
                width={56} 
                height={56} 
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Liste d'achats</h1>
              <p className="text-base text-muted-foreground font-medium">
                {uncheckedCount > 0
                  ? `${uncheckedCount} article${uncheckedCount > 1 ? "s" : ""} à prendre`
                  : "Liste vide"}
              </p>
            </div>
          </div>

          {/* Add item form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              addItem(newItem)
            }}
            className="flex flex-col gap-3"
          >
            <div className="flex gap-2">
              <Input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Ajouter un article..."
                className="flex-1 text-xl h-16 bg-white border-3 border-border focus:border-primary placeholder:text-muted-foreground font-medium"
              />
              <Button
                type="submit"
                size="lg"
                className="h-16 w-16 p-0 bg-primary hover:bg-primary/90"
              >
                <Plus className="w-8 h-8" strokeWidth={3} />
                <span className="sr-only">Ajouter</span>
              </Button>
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-14 px-4 rounded-xl border-3 border-border bg-white text-lg font-bold text-foreground focus:border-primary outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5rem'
              }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </header>

      {/* Shopping List */}
      <main className="max-w-lg mx-auto px-4 mt-4">
        {sortedItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-xl p-4">
              <Image 
                src="/ndugu.png" 
                alt="Ndugu Logo" 
                width={128} 
                height={128} 
                className="object-contain"
                priority
              />
            </div>
            <p className="text-xl text-muted-foreground">
              Aucun article pour le moment
            </p>
            <p className="text-muted-foreground mt-2">
              Ajoutez vos courses ci-dessus !
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {CATEGORIES.map((cat) => {
              const categoryItems = sortedItems.filter(item => item.category === cat.id);
              if (categoryItems.length === 0) return null;

              return (
                <div key={cat.id} className="space-y-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 w-fit font-bold text-sm ${cat.color}`}>
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <ul className="space-y-3">
                    {categoryItems.map((item) => (
                      <li key={item.id}>
                        <div
                          className={`w-full flex items-center gap-3 p-4 rounded-2xl border-3 transition-all min-h-[80px] ${
                            item.checked
                              ? "bg-success/10 border-success opacity-75"
                              : "bg-white border-border"
                          }`}
                        >
                          <button
                            onClick={() => toggleItem(item.id)}
                            className={`w-12 h-12 rounded-full border-3 flex items-center justify-center shrink-0 ${
                              item.checked
                                ? "bg-success border-success"
                                : "border-pending bg-white"
                            }`}
                          >
                            {item.checked && (
                              <Check className="w-7 h-7 text-success-foreground" strokeWidth={3} />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <span
                              className={`block text-xl ${
                                item.checked ? "line-through text-success/60 font-semibold" : "font-bold text-foreground"
                              }`}
                            >
                              {item.name}
                            </span>
                            {!item.checked && (
                              <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={item.quantity <= 1}
                                    className={`w-12 h-12 rounded-xl border-3 flex items-center justify-center transition-colors ${
                                      item.quantity <= 1
                                        ? "bg-muted border-muted text-muted-foreground"
                                        : "bg-white border-border text-foreground"
                                    }`}
                                  >
                                    <Minus className="w-6 h-6" strokeWidth={3} />
                                  </button>
                                  <span className="w-12 text-center text-2xl font-black text-foreground">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-12 h-12 rounded-xl bg-primary border-3 border-primary flex items-center justify-center text-primary-foreground"
                                  >
                                    <Plus className="w-6 h-6" strokeWidth={3} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-12 h-12 rounded-xl border-3 border-destructive bg-destructive/10 text-destructive flex items-center justify-center shrink-0 hover:bg-destructive hover:text-white transition-colors"
                          >
                            <Trash2 className="w-6 h-6" strokeWidth={3} />
                          </button>
                          {item.checked && (
                            <span className="text-success font-bold text-xl shrink-0 bg-success/10 w-12 h-12 flex items-center justify-center rounded-full border-2 border-success">
                              {item.quantity}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Action buttons */}
        {items.length > 0 && (
          <div className="mt-8 flex flex-col gap-4">
            {checkedCount > 0 && (
              <Button
                onClick={clearChecked}
                variant="outline"
                size="lg"
                className="w-full h-16 text-xl border-3 font-semibold"
              >
                <Trash2 className="w-6 h-6 mr-3" />
                Supprimer achetés ({checkedCount})
              </Button>
            )}
            <Button
              onClick={clearAll}
              variant="destructive"
              size="lg"
              className="w-full h-16 text-xl font-semibold"
            >
              <Trash2 className="w-6 h-6 mr-3" />
              Tout effacer
            </Button>
          </div>
        )}
      </main>

      {/* Footer / Signature */}
      <footer className="mt-auto py-8 text-center">
        <p className="text-muted-foreground font-medium">
          réalisé par{" "}
          <a
            href="https://www.wockytech.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-bold"
          >
            wockytech
          </a>
        </p>
      </footer>
    </div>
  )
}
