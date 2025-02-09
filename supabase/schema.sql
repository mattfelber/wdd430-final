-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  email text unique not null,
  bio text,
  is_seller boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint username_length check (char_length(full_name) >= 3)
);

-- Create products table
create table products (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  price decimal(10,2) not null,
  images text[] default array[]::text[],
  category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint title_length check (char_length(title) >= 3),
  constraint price_positive check (price > 0)
);

-- Create reviews table
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  rating integer not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint rating_range check (rating >= 1 and rating <= 5),
  constraint one_review_per_user_per_product unique (product_id, user_id)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table products enable row level security;
alter table reviews enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Products policies
create policy "Products are viewable by everyone"
  on products for select
  using ( true );

create policy "Sellers can create products"
  on products for insert
  with check ( 
    auth.uid() = seller_id 
    and 
    exists (
      select 1 from profiles
      where id = auth.uid()
      and is_seller = true
    )
  );

create policy "Sellers can update their own products"
  on products for update
  using (
    auth.uid() = seller_id
    and
    exists (
      select 1 from profiles
      where id = auth.uid()
      and is_seller = true
    )
  );

create policy "Sellers can delete their own products"
  on products for delete
  using ( auth.uid() = seller_id );

-- Reviews policies
create policy "Reviews are viewable by everyone"
  on reviews for select
  using ( true );

create policy "Authenticated users can create reviews"
  on reviews for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own reviews"
  on reviews for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own reviews"
  on reviews for delete
  using ( auth.uid() = user_id );
