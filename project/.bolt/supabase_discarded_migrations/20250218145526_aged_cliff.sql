/*
  # Initial Schema for Tarimfy

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `workspaces`
      - `id` (uuid, primary key)
      - `name` (text)
      - `owner_id` (uuid, references users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `boards`
      - `id` (uuid, primary key)
      - `name` (text)
      - `workspace_id` (uuid, references workspaces)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `lists`
      - `id` (uuid, primary key)
      - `name` (text)
      - `board_id` (uuid, references boards)
      - `position` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `cards`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `list_id` (uuid, references lists)
      - `position` (integer)
      - `due_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `workspace_members`
      - `workspace_id` (uuid, references workspaces)
      - `user_id` (uuid, references users)
      - `role` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for workspace members and owners
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create workspaces table
CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create boards table
CREATE TABLE boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  workspace_id uuid REFERENCES workspaces(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lists table
CREATE TABLE lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  board_id uuid REFERENCES boards(id) NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cards table
CREATE TABLE cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  list_id uuid REFERENCES lists(id) NOT NULL,
  position integer NOT NULL,
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create workspace_members table
CREATE TABLE workspace_members (
  workspace_id uuid REFERENCES workspaces(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'member')),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Workspace policies
CREATE POLICY "Workspace members can view workspaces" ON workspaces
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_id = workspaces.id
      AND user_id = auth.uid()
    )
    OR owner_id = auth.uid()
  );

CREATE POLICY "Workspace owners can update workspaces" ON workspaces
  FOR UPDATE TO authenticated
  USING (owner_id = auth.uid());

-- Board policies
CREATE POLICY "Workspace members can view boards" ON boards
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members wm
      JOIN workspaces w ON w.id = wm.workspace_id
      WHERE w.id = boards.workspace_id
      AND wm.user_id = auth.uid()
    )
  );

-- List policies
CREATE POLICY "Workspace members can view lists" ON lists
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members wm
      JOIN workspaces w ON w.id = wm.workspace_id
      JOIN boards b ON b.workspace_id = w.id
      WHERE b.id = lists.board_id
      AND wm.user_id = auth.uid()
    )
  );

-- Card policies
CREATE POLICY "Workspace members can view cards" ON cards
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members wm
      JOIN workspaces w ON w.id = wm.workspace_id
      JOIN boards b ON b.workspace_id = w.id
      JOIN lists l ON l.board_id = b.id
      WHERE l.id = cards.list_id
      AND wm.user_id = auth.uid()
    )
  );

-- Workspace members policies
CREATE POLICY "Users can view workspace members" ON workspace_members
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members wm
      WHERE wm.workspace_id = workspace_members.workspace_id
      AND wm.user_id = auth.uid()
    )
  );