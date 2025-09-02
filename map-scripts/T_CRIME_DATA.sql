-- Create table for crime data
CREATE TABLE t_crime_data (
    id SERIAL PRIMARY KEY,
    crime_type INTEGER NOT NULL,
    method_type INTEGER NOT NULL,
    country VARCHAR(255),
    state VARCHAR(255),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    affected_resources INTEGER,
    CONSTRAINT fk_crime_type FOREIGN KEY (crime_type)
        REFERENCES t_criminal_activity_type(id),
    CONSTRAINT fk_method_type FOREIGN KEY (method_type)
        REFERENCES t_crime_method(id)
);

INSERT INTO t_crime_data (crime_type, method_type, country, state, latitude, longitude, affected_resources) VALUES
    (1, 1, 'India', 'Delhi', 28.6139, 77.2090, 120),
    (2, 2, 'USA', 'Texas', 31.9686, -99.9018, 45),
    (1, 2, 'France', 'Île-de-France', 48.8566, 2.3522, 200),
    (2, 1, 'Brazil', 'Rio de Janeiro', -22.9068, -43.1729, 80),
    (1, 1, 'Egypt', 'Cairo', 30.0444, 31.2357, 60);
