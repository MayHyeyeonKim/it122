import { Maybuck } from './models/Items.js';

const items = [
  {id: 1, name: 'Americano', price: 3.95, calorie: 15},
  {id: 2, name: 'Pink Drink', price: 5.45, calorie: 140},
  {id: 3, name: 'Hot Chocolate', price: 4.91, calorie: 370},
  {id: 4, name: 'Mocha Cookie Crumble Frappuccino', price: 5.95, calorie: 480},
  {id: 5, name: 'Caramel Frappuccino', price: 6.25, calorie: 380}
];

export const getAll = async () => {
  const items = await Maybuck.find().exec();
  return items;
};

export const getItem = async (id) => {
  const item = await Maybuck.findOne({ id: id }).exec();
  return item;
};

export const deleteItem = async (id) => {
  try {
    const result = await Maybuck.deleteOne({ id: id }).exec();
    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
export const handleDelete = async (id) => {
  // 서버로 해당 아이템의 id를 전송하고 삭제 요청
  const res = await fetch(`/delete?id=${id}`, { method: 'DELETE' });
  const result = await res.json();
  if (result.success) {
    // 삭제가 성공하면 화면에서 해당 아이템을 삭제
    setItems(items.filter(item => item.id !== id));
  } else {
    // 삭제가 실패하면 에러 메시지를 보여줌
    setError('Failed to delete item');
  }
};