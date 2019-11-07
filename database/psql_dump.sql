DROP TABLE IF EXISTS author CASCADE;
DROP TABLE category CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;

CREATE table author (
    id serial primary key,
    fullname VARCHAR(64) not null UNIQUE
);

CREATE table category (
    id serial PRIMARY KEY,
    title VARCHAR(64) not null UNIQUE
);


CREATE table quotes (
    id serial primary key,
    -- uuid varchar(64) not null unique,
    quote text,
    category VARCHAR(40),
    author VARCHAR(40),
    category_id integer REFERENCES category(id),
    author_id integer REFERENCES author(id),
    created_at timestamp not null
);

-- psql -U postgres -f psql_dump.sql -d postgres