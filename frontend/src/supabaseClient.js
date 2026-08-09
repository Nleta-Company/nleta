import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btzxiljkgkjgqfzhhnfe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0enhpbGprZ2tqZ3FmemhobmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMjMwNDQsImV4cCI6MjA5MDY5OTA0NH0.91bQo1AkRjfWmTBSukr6t4Gh3sPT_qjll0oUhW-ZEus';

export const supabase = createClient(supabaseUrl, supabaseKey);
