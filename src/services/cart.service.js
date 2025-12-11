// server/src/services/cart.service.js
const Cart = require('../models/CartTemp');
const Product = require('../models/Product');

class CartService {
  async getUserCart(userId) {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
  }

  async addToCart(userId, { productId, quantity = 1, size = null, color = null }) {
    // basic validations
    if (!productId) throw new Error('productId is required');
    if (quantity < 1) throw new Error('quantity must be >= 1');

    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    // optional: check stock
    if (typeof product.quantity === 'number' && product.quantity < quantity) {
      throw new Error('Not enough stock available');
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    // find existing item with same product + size + color
    const existing = cart.items.find(
      (it) =>
        it.product.toString() === productId.toString() &&
        (it.size || null) === (size || null) &&
        (it.color || null) === (color || null)
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        size,
        color,
        price: product.price
      });
    }

    // recalc total
    cart.totalPrice = cart.items.reduce((sum, it) => sum + it.quantity * it.price, 0);

    await cart.save();
    return await cart.populate('items.product');
  }

    async updateItemQuantity(userId, itemId, newQuantity) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    const item = cart.items.id(itemId);
    if (!item) throw new Error('Item not found');

    if (newQuantity <= 0) {
      // remove the item
      item.remove();
    } else {
      item.quantity = newQuantity;
    }

    cart.totalPrice = cart.items.reduce((sum, it) => sum + it.quantity * it.price, 0);
    await cart.save();
    return await cart.populate('items.product');
  }

  async removeItem(userId, itemId) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter((i) => i._id.toString() !== itemId.toString());
    cart.totalPrice = cart.items.reduce((sum, it) => sum + it.quantity * it.price, 0);

    await cart.save();
    return await cart.populate('items.product');
  }

  async clearCart(userId) {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items: [], totalPrice: 0 },
      { new: true, upsert: true }
    );
    return cart;
  }
}

module.exports = new CartService();
