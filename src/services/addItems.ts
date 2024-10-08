import {supabase} from '../utils/supabase';

export const addItems = async (listId: number, items: any) => {
  const {data, error} = await supabase
    .from('shopping_lists')
    .update({list: items})
    .eq('id', listId);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    console.log('data', data);
  }
};
