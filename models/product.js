const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/products.json');

class Product {
  static getAll(options = {}) {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      let products = JSON.parse(data);
      
      // Aplicar filtros
      if (options.categoria) {
        products = products.filter(p => 
          p.categoria.toLowerCase().includes(options.categoria.toLowerCase())
        );
      }
      
      if (options.search) {
        products = products.filter(p => 
          p.nome.toLowerCase().includes(options.search.toLowerCase()) ||
          (p.descricao && p.descricao.toLowerCase().includes(options.search.toLowerCase()))
        );
      }
      
      // Ordenar por data de criação (mais recentes primeiro)
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Aplicar paginação
      const page = options.page || 1;
      const limit = options.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return {
        data: products.slice(startIndex, endIndex),
        total: products.length,
        page,
        limit
      };
    } catch (error) {
      return { data: [], total: 0, page: 1, limit: 10 };
    }
  }

  static getAllRaw() {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static saveAll(products) {
    const dir = path.dirname(dataPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  }

  static create(productData) {
    const products = this.getAllRaw();
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    this.saveAll(products);
    
    return newProduct;
  }

  static getById(id) {
    const products = this.getAllRaw();
    return products.find(product => product.id === id);
  }

  static updateById(id, updateData) {
    const products = this.getAllRaw();
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
      return null;
    }
    
    products[index] = {
      ...products[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this.saveAll(products);
    return products[index];
  }

  static deleteById(id) {
    const products = this.getAllRaw();
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
      return false;
    }
    
    products.splice(index, 1);
    this.saveAll(products);
    
    return true;
  }

  static validateImageUrl(url) {
    if (!url) return true; // URL vazia é permitida
    
    const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\S*)?$/i;
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    
    return urlPattern.test(url) && imageExtensions.test(url);
  }
}

module.exports = Product;