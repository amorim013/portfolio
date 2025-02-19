/*
  # Schema for Tarimfy Course Platform

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `is_instructor` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `instructor_id` (uuid, references users)
      - `price` (decimal)
      - `thumbnail_url` (text)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `modules`
      - `id` (uuid, primary key)
      - `title` (text)
      - `course_id` (uuid, references courses)
      - `position` (integer)
      - `created_at` (timestamp)
    
    - `lessons`
      - `id` (uuid, primary key)
      - `title` (text)
      - `module_id` (uuid, references modules)
      - `video_url` (text)
      - `duration` (integer)
      - `position` (integer)
      - `created_at` (timestamp)
    
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `course_id` (uuid, references courses)
      - `payment_id` (text)
      - `payment_status` (text)
      - `created_at` (timestamp)
    
    - `progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `lesson_id` (uuid, references lessons)
      - `completed` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for instructors and students
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  is_instructor boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor_id uuid REFERENCES users(id) NOT NULL,
  price decimal(10,2) NOT NULL,
  thumbnail_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create modules table
CREATE TABLE modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  course_id uuid REFERENCES courses(id) NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  module_id uuid REFERENCES modules(id) NOT NULL,
  video_url text NOT NULL,
  duration integer NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  course_id uuid REFERENCES courses(id) NOT NULL,
  payment_id text,
  payment_status text CHECK (payment_status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create progress table
CREATE TABLE progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  lesson_id uuid REFERENCES lessons(id) NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Course policies
CREATE POLICY "Anyone can view published courses" ON courses
  FOR SELECT TO authenticated
  USING (published = true);

CREATE POLICY "Instructors can manage their courses" ON courses
  FOR ALL TO authenticated
  USING (instructor_id = auth.uid());

-- Module policies
CREATE POLICY "Anyone can view modules of enrolled courses" ON modules
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      WHERE e.course_id = modules.course_id
      AND e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM courses c
      WHERE c.id = modules.course_id
      AND c.instructor_id = auth.uid()
    )
  );

-- Lesson policies
CREATE POLICY "Anyone can view lessons of enrolled courses" ON lessons
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN modules m ON m.course_id = e.course_id
      WHERE m.id = lessons.module_id
      AND e.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM courses c
      JOIN modules m ON m.course_id = c.id
      WHERE m.id = lessons.module_id
      AND c.instructor_id = auth.uid()
    )
  );

-- Enrollment policies
CREATE POLICY "Users can view their enrollments" ON enrollments
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Progress policies
CREATE POLICY "Users can manage their progress" ON progress
  FOR ALL TO authenticated
  USING (user_id = auth.uid());