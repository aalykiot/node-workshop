-- Set the local timezone in the DB.
ALTER DATABASE "node-workshop" SET timezone TO 'Europe/Athens';
SELECT pg_reload_conf();

-- Creates the `accounts` table.
CREATE TABLE accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  full_name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  balance NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Creates the `transfers` table.
CREATE TABLE transfers (
  id SERIAL NOT NULL,
  from_account UUID NOT NULL,
  to_account UUID NOT NULL,
  amount DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Creates a procedure to automatically update the `updated_at`
-- field with the current timestamp on row updates.
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON accounts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Populates the DB with some data.
INSERT INTO accounts (full_name, email, balance) VALUES 
  ('Charles Carmichael', 'charles.carmichael@gmail.com', 1000.50),
  ('Don Quixote', 'don.quixote@hotmail.com', 500.25),
  ('Star-Lord', 'start-lord@marvel.com', 1000000),
  ('Princess Leia', 'princess.leia@hotmail.com', 15000);
