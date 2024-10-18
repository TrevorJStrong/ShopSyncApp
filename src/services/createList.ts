import {supabase} from '../utils/supabase';

export const createList = async (data: any) => {
  const {data: user} = await supabase.auth.getUser();
  const {error} = await supabase.from('shopping_lists').insert({
    title: data.listName,
    user_id: user.user?.id,
    list: [],
  });
  if (error) {
    throw new Error(error.message);
  }

  return true;
};
