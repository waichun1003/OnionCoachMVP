-- Connect as superuser first
ALTER DATABASE onioncoachmvp OWNER TO waichuncheng;

-- Grant all privileges on database
GRANT ALL PRIVILEGES ON DATABASE onioncoachmvp TO waichuncheng;

-- Connect to the database
\c onioncoachmvp;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO waichuncheng;
ALTER SCHEMA public OWNER TO waichuncheng;

-- Grant table privileges
GRANT ALL ON ALL TABLES IN SCHEMA public TO waichuncheng;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO waichuncheng;

-- Set search path
ALTER ROLE waichuncheng SET search_path TO public;

-- Grant future privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT ALL ON TABLES TO waichuncheng;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT ALL ON SEQUENCES TO waichuncheng;

-- Specifically grant privileges on the Article table
GRANT ALL PRIVILEGES ON TABLE "Article" TO waichuncheng;

-- Grant sequence permissions if needed
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO waichuncheng;

-- Set the owner of the Article table
ALTER TABLE "Article" OWNER TO waichuncheng; 