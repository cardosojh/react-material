
class MyTableUtils {
   
  static createData(id, nome, tipo, fat, carbs, protein) {    
    return { id, nome, tipo, fat, carbs, protein };
  }

  static getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }

  static generateKey() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

}

export default MyTableUtils;