import {useState, useEffect} from 'react';
import {supabase} from '../utils/supabase';

export const useShoppingList = (id: number) => {
  const [shoppingList, setShoppingList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const {data, error} = await supabase
          .from('shopping_lists')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        setShoppingList(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingList();
  }, [id]);

  return {shoppingList, loading, error};
};
