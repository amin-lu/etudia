CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value_fr TEXT NOT NULL,
  value_en TEXT,
  section TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_site_content_section ON site_content(section);
CREATE INDEX idx_site_content_key ON site_content(key);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique" ON site_content FOR SELECT USING (true);

CREATE POLICY "Admin écriture" ON site_content FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE TRIGGER set_updated_at BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
