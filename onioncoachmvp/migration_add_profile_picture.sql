-- Migration: Add profile_picture column to coaches table
-- Date: $(date '+%Y-%m-%d %H:%M:%S')
-- Description: Add support for profile picture uploads in coach applications

-- Add profile_picture column to coaches table
ALTER TABLE coaches 
ADD COLUMN profile_picture TEXT;

-- Add comment for documentation
COMMENT ON COLUMN coaches.profile_picture IS 'Base64 encoded profile picture data (optional)';

-- Optional: Create index if needed for faster queries (uncomment if required)
-- CREATE INDEX idx_coaches_profile_picture ON coaches(profile_picture) WHERE profile_picture IS NOT NULL;

-- Verify the column was added (PostgreSQL specific)
-- \d coaches; 