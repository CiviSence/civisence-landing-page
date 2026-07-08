import { Pool } from "pg";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // --- 1. Supabase REST API (Primary) ---
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      const supabaseUrl = process.env.SUPABASE_URL.replace(/\/$/, "");
      const response = await fetch(
        `${supabaseUrl}/rest/v1/organizations?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: process.env.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Supabase organizations fetch failed:", errText);
        throw new Error(`Database error status ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Supabase organizations fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch organizations." });
    }
  }

  // --- 2. Direct PostgreSQL / Supabase Postgres (POSTGRES_URL) ---
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const connectionString =
        process.env.POSTGRES_URL || process.env.DATABASE_URL;
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
          created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          verified          BOOL
        );
      `);

      const result = await pool.query(
        "SELECT * FROM organizations ORDER BY created_at DESC",
      );

      await pool.end();
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error("Postgres organizations fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch organizations." });
    }
  }

  // --- 3. Dev Sandbox Fallback ---
  console.log(
    "[Dev Sandbox Mode] No database configured, returning empty organizations list.",
  );
  return res.status(200).json([]);
}
