const { Product } = require('../models/product');

class ProductController {
  async create(req, res, next) {
    try {
      const { name, description, category, price } = req.body;
      const product = await Product.create({ name, description, category, price, description });
      res.status(200).json({
        success: true,
        product
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, category, price } = req.body;
      const product = await Product.update({ name, description, category, price, description }, { where: { id } });
      res.status(200).json({
        success: true,
        product
      })
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        product
      })
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json({
        success: true,
        products
      })
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });
      res.status(200).json({
        success: true,
        product
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProductController();