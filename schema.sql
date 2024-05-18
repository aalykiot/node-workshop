CREATE TABLE accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(30) NOT NULL,
  balance NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

CREATE TABLE transactions (
  id SERIAL NOT NULL,
  from UUID NOT NULL,
  to UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

INSERT INTO accounts (name, balance) VALUES ("Charles Carmichael", 1000.50);
INSERT INTO accounts (name, balance) VALUES ("Don Quixote", 500.0);
INSERT INTO accounts (name, balance) VALUES ("Star-Lord", 1000000.90);
INSERT INTO accounts (name, balance) VALUES ("Princess Leia", 15000.0);
