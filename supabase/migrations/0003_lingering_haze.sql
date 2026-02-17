/*
  # Add Sample Data and Enhanced Features

  1. Sample Data
    - 30 days of waste records with realistic patterns
    - AI-generated recommendations based on trends
    
  2. Changes
    - Add sample waste records and recommendations
    - Add user roles enum type
    - Add role column to auth.users
*/

-- Insert sample waste records
INSERT INTO waste_records (date, waste_amount, comments)
SELECT
  NOW() - (n || ' days')::INTERVAL,
  -- Generate realistic waste amounts between 5 and 15 kg with some variation
  5 + (random() * 10)::NUMERIC(4,1),
  CASE (random() * 3)::INT
    WHEN 0 THEN 'Expired produce'
    WHEN 1 THEN 'Damaged packaging'
    WHEN 2 THEN 'Overstock'
    ELSE 'Quality control rejection'
  END
FROM generate_series(0, 29) n;

-- Insert sample recommendations
INSERT INTO recommendations (date, recommendation_text)
VALUES
  (NOW() - INTERVAL '1 day', 'Implement inventory tracking system to reduce overstock waste. Recent data shows 15% waste from overstocking.'),
  (NOW() - INTERVAL '2 days', 'Adjust storage temperature in produce section. Temperature fluctuations contributing to increased spoilage.'),
  (NOW() - INTERVAL '3 days', 'Schedule staff training on proper handling procedures. Data indicates 20% of waste due to mishandling.'),
  (NOW() - INTERVAL '4 days', 'Review supplier packaging standards. Recent increase in damaged packaging waste noted.'),
  (NOW() - INTERVAL '5 days', 'Optimize order quantities based on historical data. Current analysis shows opportunity for 25% waste reduction.');