const { createClient } = require('@supabase/supabase-js')

class Db {
  constructor(url, key) {
    this._db = createClient(url, key);
  }
  getTable(name) {
    return new Table(this._db.from(name));
  }
}

class Table extends EventTarget {
  constructor(table) {
    super();
    this._table = table;
    this._items = [];
    this.getAllItems().then(e => {
      this.dispatchEvent(new Event("load"))
    }).catch(e => {
      console.log(e);
    })
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
  on(type, fns) {
    this.addEventListener(type, fns)
  }
  emit(type) {
    this.dispatchEvent(new Event({ type }))
  }
}

class Item {
  constructor(table, item) {
    this._table = table;
    this._item = item;
  }
}

module.exports = { Db }