export type HomeStackParamList = {
  ShoppingLists: undefined;
  AddNewList: undefined;
  SingleList: {
    title: string;
    id: number;
  };
  AddProduct: undefined;
  ProfileScreen: undefined;
};

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}
