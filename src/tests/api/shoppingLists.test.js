jest.mock('../../utils/supabase');

describe('ShoppingLists component', () => {
  const supabase = require('../../utils/supabase');

  it('should return all shopping lists when the query is successful', async () => {
    const mockData = [
      {id: 1, name: 'Groceries'},
      {id: 2, name: 'Electronics'},
    ];

    supabase.from = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({data: mockData, error: null}),
    });

    const fetchLists = async () => {
      const {data: shopping_lists, error} = await supabase
        .from('shopping_lists')
        .select('*');
      if (error) {
        throw new Error(error.message);
      }
      console.log('data', shopping_lists);
      return shopping_lists;
    };

    const result = await fetchLists();

    // Check that the result matches the mock data structure
    expect(result).toEqual(mockData);
    // Additional check for the structure
    result.forEach(item => {
      expect(item).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      });
    });
  });
});
