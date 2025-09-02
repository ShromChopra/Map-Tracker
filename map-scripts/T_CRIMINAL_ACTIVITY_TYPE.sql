-- Create table for criminal activity types
CREATE TABLE t_criminal_activity_type (
    id SERIAL PRIMARY KEY,
    crime_type VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL
);

INSERT INTO t_criminal_activity_type (crime_type, is_active) VALUES
    ('Terrorism', true),
    ('Kidnapping', true);
