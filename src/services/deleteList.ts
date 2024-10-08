import {supabase} from '../utils/supabase';

export const deleteList = async (id: number) => {
  const {error, data, status} = await supabase
    .from('shopping_lists')
    .delete()
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  if (status) {
    console.log('status', status);
  }
  if (data) {
    console.log('data', data);
  }
};
