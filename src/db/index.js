const { createClient } = require('@supabase/supabase-js')

class Db {
  constructor(url, key) {
    this._db = createClient(url, key);
  }
  getTable(name) {
    return new Table(this._db.from(name));
  }
}

class Table {
  constructor(table) {
    this._table = table;
    this._items = [];
  }
  async getAllItems() {
    let { data, error } = await this._table.select('*')
    if (error) throw error;
    return data.map(e => new Item(this, e))
  }
  getItemsForColumn(name) {
    return new Promise((res, rej) => {
      console.log(this);
    })
  }
  async getItem(id) {
    return this._items.filter(e => e.id == id);
  }
}

class Item {
  constructor(table, item) {
    this._table = table;
    this._item = item;
  }
}

module.exports = { Db }