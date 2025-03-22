const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem");
const Food = require("../models/food.model");

module.exports = {
  async createCart(user) {
    const cart = new Cart({ customer: user });
    const createdCart = await cart.save();
    return createdCart;
  },

  async findCartByUserId(userId) {
    let cart;

    cart = await Cart.findOne({ customer: userId }).populate([
      {
        path: "items",
        populate: {
          path: "food",
          populate: { path: "restaurant", select: "_id" },
        },
      },
    ]);

    if (!cart) {
      throw new Error("Cart not found u - ", userId);
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("food");


    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const item of cart.items) {
      totalPrice += item.price;
      totalDiscountedPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discounte = totalPrice - totalDiscountedPrice;

    // const updatedCart = await cart.save();
    return cart;
  },

  async addItemToCart(req, userId) {
    const cart = await Cart.findOne({ customer: userId });
    const food = await Food.findById(req.menuItemId);

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      food: food._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        food: food._id,
        cart: cart._id,
        quantity: 1,
        userId,
        totalPrice: food.price,
      });

      const createdCartItem = await cartItem.save();
      cart.items.push(createdCartItem);
      await cart.save();
      return createdCartItem;
    }
    return isPresent;
    // return 'Item added to cart';
  },

  async updateCartItemQuantity(cartItemId, quantity) {
    const cartItem = await CartItem.findById(cartItemId).populate([
      { path: "food", populate: { path: "restaurant", select: "_id" } },
    ]);
    if (!cartItem) {
      throw new Error(`Cart item not found with ID ${cartItemId}`);
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = quantity * cartItem.food.price;
    await cartItem.save();
    return cartItem;
  },

  async removeItemFromCart(cartItemId, user) {
    // Retrieve user ID from JWT token

    // Find the cart for the user
    const cart = await Cart.findOne({ customer: user._id });
    if (!cart) {
      throw new Error(`Cart not found for user ID ${user._id}`);
    }

    // Remove the item from the cart
    cart.items = cart.items.filter((item) => !item.equals(cartItemId));
    await cart.save();
    return cart;
  },

  async clearCart(user) {
    const cart = await Cart.findOne({ customer: user._id });
    if (!cart) {
      throw new Error(`Cart not found for user ID ${user._id}`);
    }

    cart.items = [];
    await cart.save();
    return cart;
  },

  async calculateCartTotals(cart) {
    try {
      let total = 0;

      for (let cartItem of cart.items) {
        total += cartItem.food.price * cartItem.quantity;
      }
      return total;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
