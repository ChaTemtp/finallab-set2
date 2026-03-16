const { Pool } = require('pg');
const fs   = require('fs');
const path = require('path');

const pool = new Pool({
  // เปลี่ยนเป็น 'postgres' ให้ตรงกับชื่อ service ใน docker-compose.yml ของคุณ
  host:     process.env.DB_HOST     || 'postgres', 
  port:     5432,
  database: process.env.DB_NAME     || 'finallab', // แก้ให้ตรงกับที่ตั้งใน docker-compose
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function initDB(retries = 10) {
  while (retries > 0) {
    try {
      // 1. ตรวจสอบการเชื่อมต่อก่อน
      const client = await pool.connect();
      console.log('[task-service] Database connected!');
      
      // 2. รัน SQL Init (ถ้าจำเป็น)
      // หมายเหตุ: ปกติ init.sql ควรอยู่ที่โฟลเดอร์ /db/ ใน project root 
      // และถูกจัดการโดย Docker Volume แต่ถ้าจะรันผ่าน Node ให้เช็ค path ให้ดีครับ
      try {
        const sqlPath = path.join(__dirname, '../../db/init.sql'); // ปรับ path ให้ไปที่ root/db/init.sql
        if (fs.existsSync(sqlPath)) {
          const sql = fs.readFileSync(sqlPath, 'utf8');
          await client.query(sql);
          console.log('[task-service] Schema initialized successfully');
        }
      } catch (sqlErr) {
        console.error('[task-service] SQL Init Error (maybe table exists):', sqlErr.message);
      }

      client.release();
      break; 
    } catch (err) {
      retries -= 1;
      console.error(`[task-service] DB not ready, retrying... (${retries} left)`);
      await new Promise(res => setTimeout(res, 2000)); // รอ 2 วินาที
    }
  }
}

// ส่ง pool ออกไปให้ router ใช้ และ initDB ไปเรียกใช้ใน index.js
module.exports = { pool, initDB };