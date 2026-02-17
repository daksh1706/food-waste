/*
  # Initial Schema Setup

  1. New Tables
    - `waste_records`
      - `id` (uuid, primary key)
      - `date` (timestamp with timezone)
      - `waste_amount` (numeric)
      - `comments` (text)
      - `created_at` (timestamp with timezone)
    - `recommendations`
      - `id` (uuid, primary key)
      - `date` (timestamp with timezone)
      - `recommendation_text` (text)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create waste_records table
CREATE TABLE IF NOT EXISTS waste_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz NOT NULL DEFAULT now(),
  waste_amount numeric NOT NULL CHECK (waste_amount >= 0),
  comments text,
  created_at timestamptz DEFAULT now()
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz NOT NULL DEFAULT now(),
  recommendation_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waste_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all waste records"
  ON waste_records
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert waste records"
  ON waste_records
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read all recommendations"
  ON recommendations
  FOR SELECT
  TO authenticated
  USING (true);