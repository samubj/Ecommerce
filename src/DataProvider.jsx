import { createContext, useContext, useEffect, useState } from "react"
const Context = createContext()
const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products?limit=12")
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json()
                setProducts(data.products)
            } catch (error) {
                setError("Unable to load products. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingProduct = currentCart.find((item) => item.id === product.id)
            if (existingProduct) {
                return currentCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...currentCart, { ...product, quantity: 1 }]
        })
    }
    const increaseQuantity = (productId) => {
        setCart((currentCart) => currentCart.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    }
    const decreaseQuantity = (productId) => {
        setCart((currentCart) => currentCart.map((item) => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    }
    const removeFromCart = (productId) => {
        setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
    }
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    return (
        <Context.Provider value={{ products, cart, loading, error, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cartCount, cartTotal }}>
            {children}
        </Context.Provider>
    )
}
export default DataProvider
export const useData = () => useContext(Context)