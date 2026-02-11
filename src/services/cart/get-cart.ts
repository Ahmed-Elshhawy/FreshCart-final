export type CartResponseFromAPI = {
  products?: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
};

export const getCart = async (): Promise<CartResponseFromAPI> => {
  const res = await fetch("/api/cart");
  const data = await res.json();
  return data;
};
