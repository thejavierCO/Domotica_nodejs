const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
)

class Db{
  constructor(url,key){
    this._db = createClient(url,key);
  }
  getTable(name){
    return new Table(this._db.from(name));
  }
}

class Table{
  constructor(table){
    this._table = table;
    this._items = [];
    this.getAllItems().then(e=>this._items = e);
  }
  async getAllItems(){
    let {data,error} = await this._table.select('*')
    if(error)throw error;
    return data.map(e=>new Item(this,e))
  }
  async getItemsForColumn(name){
    return this._items.map(e=>e[name])
  }
  async getItem(id){
    return this._items.filter(e=>e.id == id);
  }
}

class Item{
  constructor(table,item){
    this._table = table;
    this._item = item;
  }
}
module.exports = {Db}