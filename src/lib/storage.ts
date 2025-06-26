
// Local Storage Service for data persistence
export class StorageService {
  static setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  // Specific methods for our app data
  static saveProductData(products: any[]): void {
    this.setItem('pos_products', products);
  }

  static getProductData(): any[] {
    return this.getItem('pos_products', []);
  }

  static saveStockData(stock: any[]): void {
    this.setItem('pos_stock', stock);
  }

  static getStockData(): any[] {
    return this.getItem('pos_stock', []);
  }

  static saveSettings(settings: any): void {
    this.setItem('pos_settings', settings);
  }

  static getSettings(): any {
    return this.getItem('pos_settings', {});
  }

  // Financial data for profit/loss tracking
  static saveFinancialData(data: any): void {
    this.setItem('pos_financial', data);
  }

  static getFinancialData(): any {
    return this.getItem('pos_financial', {
      revenue: 0,
      costs: 0,
      profit: 0,
      transactions: []
    });
  }
}
