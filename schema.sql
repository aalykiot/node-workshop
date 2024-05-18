-- Creates the `accounts` table.
CREATE TABLE accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(30) NOT NULL,
  balance NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

-- Creates the `transactions` table.
CREATE TABLE transactions (
  id SERIAL NOT NULL,
  sender UUID NOT NULL,
  receiver UUID NOT NULL,
  amount DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
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
INSERT INTO accounts (name, balance) VALUES ('Charles Carmichael', 1000.50);
INSERT INTO accounts (name, balance) VALUES ('Don Quixote', 500.0);
INSERT INTO accounts (name, balance) VALUES ('Star-Lord', 1000000.90);
INSERT INTO accounts (name, balance) VALUES ('Princess Leia', 15000.0);
