import { useState } from "react"
import { useData } from "./DataProvider"
import cartImg from "./assets/cart.jpg"
import "./ECommerce.css"
function ECommerce() {
    const { products, cart, loading, error, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, cartCount, cartTotal } = useData()
    const [showCart, setShowCart] = useState(false)
    return (
        <div className="ecommerce-container">
            <header className="ecommerce-header">
                <div>
                    <span className="ecommerce-eyebrow">ONLINE STORE</span>
                    <h1>Discover Products</h1>
                    <p>Find the products you need and add them to your cart.</p>
                </div>
                <div className="ecommerce-cart-summary">
                    <img src={cartImg} alt="Cart" className="ecommerce-cart-icon"/>
                    <div className="ecommerce-cart-count">
                        <strong>{cartCount}</strong>
                        <span>Cart Items</span>
                    </div>
                    <button className="ecommerce-view-cart-button" onClick={() => setShowCart(true)}>View Cart</button>
                </div>
            </header>
            {loading && <div className="ecommerce-message">Loading products...</div>}
            {error && <div className="ecommerce-message ecommerce-error">{error}</div>}
            {!loading && !error && (
                <main className="ecommerce-content">
                    <section className="ecommerce-products-section">
                        <div className="ecommerce-section-header">
                            <div>
                                <span className="ecommerce-section-label">PRODUCTS</span>
                                <h2>Explore our collection</h2>
                            </div>
                            <span>{products.length} Products</span>
                        </div>
                        <div className="ecommerce-product-grid">
                            {products.map((product) => (
                                <article className="ecommerce-product-card" key={product.id}>
                                    <div className="ecommerce-product-image-wrapper">
                                        <img src={product.thumbnail} alt={product.title} className="ecommerce-product-image"/>
                                    </div>
                                    <div className="ecommerce-product-details">
                                        <span className="ecommerce-product-category">{product.category}</span>
                                        <h3>{product.title}</h3>
                                        <p>{product.description.length > 75 ? `${product.description.slice(0, 75)}...` : product.description}</p>
                                        <div className="ecommerce-product-footer">
                                            <strong>₹{(product.price * 90).toLocaleString("en-IN")}</strong>
                                            <button className="ecommerce-add-button" onClick={() => addToCart(product)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>
            )}
            {showCart && (
                <div className="ecommerce-cart-overlay" onClick={() => setShowCart(false)}>
                    <div className="ecommerce-cart-modal" onClick={(event) => event.stopPropagation()}>
                        <div className="ecommerce-cart-header">
                            <div>
                                <span className="ecommerce-section-label">YOUR CART</span>
                                <h2>Shopping Cart</h2>
                            </div>
                            <div className="ecommerce-cart-header-actions">
                                <span className="ecommerce-cart-badge">{cartCount}</span>
                                <button className="ecommerce-close-cart-button" onClick={() => setShowCart(false)}>x</button>
                            </div>
                        </div>
                        {cart.length === 0 ? (
                            <div className="ecommerce-empty-cart">
                                <img src={cartImg} alt="Empty Cart" className="ecommerce-empty-cart-image"/>
                                <h3>Your cart is empty</h3>
                                <p>Add products to see them here.</p>
                            </div>
                        ) : (
                            <>
                                <div className="ecommerce-cart-items">
                                    {cart.map((item) => (
                                        <div className="ecommerce-cart-item" key={item.id}>
                                            <img src={item.thumbnail} alt={item.title} className="ecommerce-cart-image"/>
                                            <div className="ecommerce-cart-item-details">
                                                <h3>{item.title}</h3>
                                                <span>₹{(item.price * 90).toLocaleString("en-IN")} each</span>
                                                <div className="ecommerce-cart-actions">
                                                    <div className="ecommerce-quantity">
                                                        <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                    </div>
                                                    <button className="ecommerce-remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                                                </div>
                                            </div>
                                            <strong className="ecommerce-item-total">₹{(item.price * 90 * item.quantity).toLocaleString("en-IN")}</strong>
                                        </div>
                                    ))}
                                </div>
                                <div className="ecommerce-cart-total">
                                    <div>
                                        <span>Total Items</span>
                                        <strong>{cartCount}</strong>
                                    </div>
                                    <div>
                                        <span>Total Price</span>
                                        <strong>₹{(cartTotal * 90).toLocaleString("en-IN")}</strong>
                                    </div>
                                </div>
                                <button className="ecommerce-checkout-button" onClick={() => setShowCart(false)}>Proceed to Checkout</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default ECommerce