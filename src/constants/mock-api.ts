////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering
import usersData from './user-data.json';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data
export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

// Initialize sample products
fakeProducts.initialize();

// Define the shape of User data
export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  plan: string;
  billing: string;
  status: string;
  joinedDate: string;
  lastLogin: string;
};

// Mock user data store
export const fakeUsers = {
  records: usersData as User[],

  // Get all users with optional filtering and search
  async getAll({
    role = [],
    status = [],
    plan = [],
    search
  }: {
    role?: string[];
    status?: string[];
    plan?: string[];
    search?: string;
  }) {
    let users = [...this.records];

    // Filter users based on selected roles
    if (role.length > 0) {
      users = users.filter((user) => role.includes(user.role));
    }

    // Filter users based on selected statuses
    if (status.length > 0) {
      users = users.filter((user) => status.includes(user.status));
    }

    // Filter users based on selected plans
    if (plan.length > 0) {
      users = users.filter((user) => plan.includes(user.plan));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: ['name', 'email', 'role', 'plan', 'status']
      });
    }

    return users;
  },

  // Get paginated results with optional filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    role,
    status,
    plan,
    search
  }: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    plan?: string;
    search?: string;
  }) {
    await delay(1000);
    const roleArray = role ? role.split('.') : [];
    const statusArray = status ? status.split('.') : [];
    const planArray = plan ? plan.split('.') : [];

    const allUsers = await this.getAll({
      role: roleArray,
      status: statusArray,
      plan: planArray,
      search
    });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  },

  // Get a specific user by their ID
  async getUserById(id: number) {
    await delay(1000);

    // Find the user by their ID
    const user = this.records.find((user) => user.id === id);

    if (!user) {
      return {
        success: false,
        message: `User with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `User with ID ${id} found`,
      user
    };
  }
};
