CREATE TABLE t_crime_method (
    id SERIAL PRIMARY KEY,
    method_type VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL
);

INSERT INTO t_crime_method (method_type, is_active) VALUES
    ('Weapons', true),
    ('Brute Force', true);