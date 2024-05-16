CREATE TABLE accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  balance NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE transactions (
  id SERIAL NOT NULL,
  receiver UUID NOT NULL,
  sender UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);