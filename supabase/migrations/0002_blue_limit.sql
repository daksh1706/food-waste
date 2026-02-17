/*
  # Fix RLS Policies for Anonymous Access

  1. Changes
    - Update RLS policies to allow anonymous access using the anon key
    - Add explicit policies for INSERT operations
    
  2. Security
    - Maintain data integrity while allowing necessary operations
    - Enable public access for demo purposes
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read all waste records" ON waste_records;
DROP POLICY IF EXISTS "Users can insert waste records" ON waste_records;
DROP POLICY IF EXISTS "Users can read all recommendations" ON recommendations;

-- Create new policies for waste_records
CREATE POLICY "Enable read access for all users"
  ON waste_records FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON waste_records FOR INSERT
  TO public
  WITH CHECK (true);

-- Create new policies for recommendations
CREATE POLICY "Enable read access for recommendations"
  ON recommendations FOR SELECT
  TO public
  USING (true);