import { Pool } from 'pg';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    organization_name,
    industry,
    size,
    contact_name,
    contact_email,
    contact_phone,
    website,
    country,
    message,
  } = req.body;

  // --- Validation ---
  if (!organization_name || !contact_name || !contact_email) {
    return res.status(400).json({
      error: 'organization_name, contact_name, and contact_email are required.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact_email)) {
    return res.status(400).json({ error: 'A valid contact email address is required.' });
  }

  console.log(`Organization registration request: ${organization_name} (${contact_email})`);

  // --- 1. Supabase REST API (Primary) ---
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      const supabaseUrl = process.env.SUPABASE_URL.replace(/\/$/, '');
      const response = await fetch(`${supabaseUrl}/rest/v1/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          organization_name,
          industry: industry || null,
          size: size || null,
          contact_name,
          contact_email,
          contact_phone: contact_phone || null,
          website: website || null,
          country: country || null,
          message: message || null,
          created_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Supabase organization insert failed:', errText);
        throw new Error(`Database error status ${response.status}`);
      }

      const data = await response.json();
      return res.status(201).json({
        message: 'Organization registered successfully.',
        provider: 'supabase',
        data,
      });
    } catch (error) {
      console.error('Supabase organization registration failed:', error);
      return res.status(500).json({ error: 'Database operations failed.' });
    }
  }

  // --- 2. Direct PostgreSQL / Supabase Postgres (POSTGRES_URL) ---
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
      const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
      });

      // Auto-create table if it does not exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS organizations (
          id                SERIAL PRIMARY KEY,
          organization_name VARCHAR(255) NOT NULL,
          industry          VARCHAR(100),
          size              VARCHAR(50),
          contact_name      VARCHAR(255) NOT NULL,
          contact_email     VARCHAR(255) NOT NULL,
          contact_phone     VARCHAR(50),
          website           VARCHAR(255),
          country           VARCHAR(100),
          message           TEXT,
          status            VARCHAR(50) DEFAULT 'pending',
          created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const result = await pool.query(
        `INSERT INTO organizations
           (organization_name, industry, size, contact_name, contact_email, contact_phone, website, country, message)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          organization_name,
          industry || null,
          size || null,
          contact_name,
          contact_email,
          contact_phone || null,
          website || null,
          country || null,
          message || null,
        ]
      );

      await pool.end();
      return res.status(201).json({
        message: 'Organization registered successfully.',
        provider: 'postgres',
        data: result.rows[0],
      });
    } catch (error) {
      console.error('Postgres organization registration failed:', error);

      if (error.code === '23505') {
        return res.status(409).json({
          error: 'An organization with this email is already registered.',
        });
      }

      return res.status(500).json({ error: 'Database operations failed.' });
    }
  }

  // --- 3. Dev Sandbox Fallback ---
  console.log(
    `[Dev Sandbox Mode] Organization saved: ${organization_name} — ${contact_name} (${contact_email})`
  );
  return res.status(201).json({
    message: 'Organization registered successfully (Sandbox Mode).',
    provider: 'local_sandbox',
    organization_name,
    contact_name,
    contact_email,
  });
}
