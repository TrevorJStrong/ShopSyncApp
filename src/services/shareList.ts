// share list via sms service
import {Share} from 'react-native';
import {supabase} from '../utils/supabase';

export const shareList = async (listId: number) => {
  const {data, error} = await supabase
    .from('shopping_lists')
    .select('name')
    .eq('id', listId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  const {data: user} = await supabase.auth.getUser();
  const {data: list} = await supabase
    .from('shopping_lists')
    .select('list')
    .eq('id', listId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  const listString = list.list
    .map(item => item.name)
    .join('\n')
    .toString();
  console.log('listString', listString);
  const result = await Share.share({
    message: `Hey! I found this list on ShopSync. Here's the title: ${data.name}\n${listString}`,
  });
  if (result.action === Share.sharedAction) {
    if (result.activityType) {
      console.log('activityType', result.activityType);
    } else {
      console.log('shared');
    }
  } else if (result.action === Share.dismissedAction) {
    console.log('dismissed');
  }
};
