"use client";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem } from "@/types/Cart";
import { CartItemBundled } from "@/types/CartBundled";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: Dispatch<React.SetStateAction<CartItem[]>>;
  addProductToCart: (newItem: CartItem, quantity?: number) => void;
  removeItemFromCart: (item: CartItem, quantity?: number) => void;
  cartTotal: number;
  cartBadge: number;
  previousCartBadge: number;
  cartTotalAbrivated?: string;
  cartItemsBundled: CartItemBundled[]
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const abbreviateNumber = (value: number): string => {
  if (value >= 1_000 && value < 1_000_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else {
    return value.toString();
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsBundled, setCartItemsBundled] = useState<CartItemBundled[]>(
    []
  );
  const [cartBadge, setCartBadge] = useState<number>(0);
  const [cartBadegCopy, setCartBadegCopy] = useState<number>(cartBadge);
  const [previousCartBadge, setPreviousCartBadge] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartTotalAbrivated, setcartTotalAbrivated] = useState<string>("0");

  useEffect(() => {
    setPreviousCartBadge(cartBadegCopy);
    setCartBadegCopy(cartBadge);
  }, [cartBadge]);

  useEffect(() => {
    setCartBadge(cartItems.reduce((total, item) => total + item.quantity, 0));
    const newTotal = cartItems.reduce(
      (total, items) => total + items.price * items.quantity,
      0
    );
    setCartTotal(newTotal);
    setcartTotalAbrivated(abbreviateNumber(newTotal));
    const newCartBundled: CartItemBundled[] = [];
    cartItems.forEach((item) => {
      const vaiationIndex = newCartBundled.findIndex(
        (product) => product.handle === item.handle
      );
      if (vaiationIndex !== -1) {
        newCartBundled[vaiationIndex].variation.push({
          name: item.variation || "Default",
          image: {
            src: item.image.src,
            alt: item.image.alt,
          },
          quantity: item.quantity,
          price: item.price,
          compare_at_price: item.compare_at_price,
        });
      } else {
        newCartBundled.push({
          id: item.id,
          name: item.name,
          handle: item.handle,
          variation: [
            {
              name: item.variation || "Default",
              image: {
                src: item.image.src,
                alt: item.image.alt,
              },
              quantity: item.quantity,
              price: item.price,
              compare_at_price: item.compare_at_price,
            },
          ],
        });
      }
    });
    setCartItemsBundled(newCartBundled);
  }, [cartItems]);

  function addProductToCart(newItem: CartItem, quantity: number = 1) {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (item) => item.id === newItem.id && item.variation === newItem.variation
    );
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity += quantity;
    } else {
      updatedCartItems.push({ ...newItem, quantity });
    }
    setCartItems(updatedCartItems);
  }
  function removeItemFromCart(item: CartItem, quantity: number = 1) {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id && cartItem.variation === item.variation
    );
    if (quantity === -1)
      quantity = updatedCartItems[existingItemIndex].quantity;
    if (existingItemIndex !== -1) {
      if (updatedCartItems[existingItemIndex].quantity > quantity) {
        updatedCartItems[existingItemIndex].quantity -= quantity;
      } else {
        updatedCartItems.splice(existingItemIndex, 1);
      }
      setCartItems(updatedCartItems);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addProductToCart,
        removeItemFromCart,
        cartBadge,
        previousCartBadge,
        cartTotal,
        cartTotalAbrivated,
        cartItemsBundled
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
