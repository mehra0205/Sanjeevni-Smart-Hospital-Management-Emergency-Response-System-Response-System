// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://onvdwdyzggpjgaiavati.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9udmR3ZHl6Z2dwamdhaWF2YXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTgzNDcsImV4cCI6MjA2NDM3NDM0N30.mz2WBCKkVg1rvpaclqjHjOk5klJldRBS18E8sccreC4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);