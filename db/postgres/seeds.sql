INSERT INTO salts (salt_name, salt_strength, therapeutic_class) VALUES
  ('Metformin Hydrochloride', '500 mg', 'Antidiabetic'),
  ('Amlodipine Besylate', '5 mg', 'Antihypertensive'),
  ('Atorvastatin Calcium', '10 mg', 'Lipid-lowering'),
  ('Levothyroxine Sodium', '50 mcg', 'Thyroid hormone'),
  ('Cetirizine Hydrochloride', '10 mg', 'Antihistamine'),
  ('Amoxicillin', '500 mg', 'Antibiotic'),
  ('Pantoprazole Sodium', '40 mg', 'Proton pump inhibitor'),
  ('Montelukast Sodium', '10 mg', 'Anti-asthmatic'),
  ('Aceclofenac', '100 mg', 'Analgesic'),
  ('Paracetamol', '650 mg', 'Analgesic');

INSERT INTO platforms (platform_name, platform_slug, base_url) VALUES
  ('Tata 1mg', '1mg', 'https://www.1mg.com'),
  ('PharmEasy', 'pharmeasy', 'https://pharmeasy.in'),
  ('Netmeds', 'netmeds', 'https://www.netmeds.com'),
  ('Truemeds', 'truemeds', 'https://www.truemeds.in'),
  ('Apollo 24/7', 'apollo247', 'https://www.apollo247.com');

INSERT INTO medicines (medicine_name, brand_name, salt_id, dosage_form, strength, manufacturer) VALUES
  ('Metformin 500 Tablet', 'Glycomet 500', 1, 'Tablet', '500 mg', 'USV'),
  ('Amlodipine 5 Tablet', 'Amlong 5', 2, 'Tablet', '5 mg', 'Micro Labs'),
  ('Atorvastatin 10 Tablet', 'Lipitor 10', 3, 'Tablet', '10 mg', 'Pfizer'),
  ('Thyrox 50 Tablet', 'Thyrox 50', 4, 'Tablet', '50 mcg', 'Abbott'),
  ('Cetirizine 10 Tablet', 'Cetzine 10', 5, 'Tablet', '10 mg', 'Dr. Reddy''s'),
  ('Amoxicillin 500 Capsule', 'Novamox 500', 6, 'Capsule', '500 mg', 'Cipla'),
  ('Pantoprazole 40 Tablet', 'Pantocid 40', 7, 'Tablet', '40 mg', 'Sun Pharma'),
  ('Montelukast 10 Tablet', 'Montair 10', 8, 'Tablet', '10 mg', 'Cipla'),
  ('Aceclofenac 100 Tablet', 'Hifenac 100', 9, 'Tablet', '100 mg', 'Intas'),
  ('Paracetamol 650 Tablet', 'Dolo 650', 10, 'Tablet', '650 mg', 'Micro Labs'),
  ('Metformin 1000 Tablet', 'Glycomet 1000', 1, 'Tablet', '1000 mg', 'USV'),
  ('Amlodipine 10 Tablet', 'Amlong 10', 2, 'Tablet', '10 mg', 'Micro Labs'),
  ('Atorvastatin 20 Tablet', 'Lipitor 20', 3, 'Tablet', '20 mg', 'Pfizer'),
  ('Thyrox 100 Tablet', 'Thyrox 100', 4, 'Tablet', '100 mcg', 'Abbott'),
  ('Cetirizine 5 Tablet', 'Cetzine 5', 5, 'Tablet', '5 mg', 'Dr. Reddy''s'),
  ('Amoxicillin 250 Capsule', 'Novamox 250', 6, 'Capsule', '250 mg', 'Cipla'),
  ('Pantoprazole 20 Tablet', 'Pantocid 20', 7, 'Tablet', '20 mg', 'Sun Pharma'),
  ('Montelukast 5 Tablet', 'Montair 5', 8, 'Tablet', '5 mg', 'Cipla'),
  ('Aceclofenac 50 Tablet', 'Hifenac 50', 9, 'Tablet', '50 mg', 'Intas'),
  ('Paracetamol 500 Tablet', 'Dolo 500', 10, 'Tablet', '500 mg', 'Micro Labs'),
  ('Metformin SR 500 Tablet', 'Glycomet SR 500', 1, 'Tablet', '500 mg SR', 'USV'),
  ('Amlodipine 2.5 Tablet', 'Amlong 2.5', 2, 'Tablet', '2.5 mg', 'Micro Labs'),
  ('Atorvastatin 40 Tablet', 'Lipitor 40', 3, 'Tablet', '40 mg', 'Pfizer'),
  ('Pantoprazole 40 DR Tablet', 'Pantocid DR 40', 7, 'Tablet', '40 mg DR', 'Sun Pharma');

INSERT INTO substitutes (medicine_id, substitute_medicine_id, rationale, trust_score) VALUES
  (1, 11, 'Same salt and higher strength alternative', 0.92),
  (2, 12, 'Same salt and different pack variation', 0.91),
  (3, 13, 'Same active ingredient with higher strength', 0.90),
  (7, 17, 'Same salt and lower pack strength', 0.88),
  (10, 20, 'Same salt and lower strength option', 0.95);

INSERT INTO prices (medicine_id, platform_id, mrp, selling_price, pack_size, source_url) VALUES
  (1, 1, 68.00, 52.00, '10 tablets', 'https://www.1mg.com'),
  (1, 2, 70.00, 49.00, '10 tablets', 'https://pharmeasy.in'),
  (1, 3, 69.00, 51.00, '10 tablets', 'https://www.netmeds.com'),
  (1, 4, 66.00, 47.00, '10 tablets', 'https://www.truemeds.in'),
  (1, 5, 71.00, 50.00, '10 tablets', 'https://www.apollo247.com'),
  (10, 1, 38.00, 27.00, '15 tablets', 'https://www.1mg.com'),
  (10, 2, 40.00, 25.00, '15 tablets', 'https://pharmeasy.in'),
  (10, 3, 39.00, 26.00, '15 tablets', 'https://www.netmeds.com'),
  (10, 4, 37.00, 24.00, '15 tablets', 'https://www.truemeds.in'),
  (10, 5, 41.00, 28.00, '15 tablets', 'https://www.apollo247.com');

INSERT INTO users (email, password_hash, full_name) VALUES
  ('demo@medcompare.ai', NULL, 'Demo User');
