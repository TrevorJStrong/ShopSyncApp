export interface SubItem {
  id: number;
  name: string;
}

export interface DataList {
  list: DataItem[];
}

export interface DataItem {
  id: number;
  title: string;
  category: string;
  items: SubItem[];
}

export interface Categories {
  categories: CategoryItem[];
}

export type CategoryItem = {
  id: number;
  category: string;
};

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  identities: {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};

export type Session = {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
};
