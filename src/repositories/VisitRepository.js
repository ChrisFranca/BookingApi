// src/repositories/VisitRepository.js
const { pool } = require('../config/database');

class VisitRepository {
  constructor() {
    this.tableName = 'visits';
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName} ORDER BY visit_date DESC`;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async findByProperty(propertyId) {
    const query = `SELECT * FROM ${this.tableName} WHERE property_id = $1 ORDER BY visit_date DESC`;
    const result = await pool.query(query, [propertyId]);
    return result.rows;
  }

  async findByDateRange(startDate, endDate) {
    const query = `
      SELECT * FROM ${this.tableName} 
      WHERE visit_date BETWEEN $1 AND $2 
      ORDER BY visit_date ASC
    `;
    const result = await pool.query(query, [startDate, endDate]);
    return result.rows;
  }

  async create(visitData) {
    const { 
      property_id, 
      client_name, 
      client_phone, 
      client_email, 
      visit_date, 
      status = 'scheduled', 
      notes = '' 
    } = visitData;

    const query = `
      INSERT INTO ${this.tableName} 
        (property_id, client_name, client_phone, client_email, visit_date, status, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      property_id,
      client_name,
      client_phone,
      client_email,
      visit_date,
      status,
      notes
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, visitData) {
    const { 
      property_id, 
      client_name, 
      client_phone, 
      client_email, 
      visit_date, 
      status, 
      notes 
    } = visitData;

    const query = `
      UPDATE ${this.tableName}
      SET 
        property_id = $1,
        client_name = $2,
        client_phone = $3,
        client_email = $4,
        visit_date = $5,
        status = $6,
        notes = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `;
    
    const values = [
      property_id,
      client_name,
      client_phone,
      client_email,
      visit_date,
      status,
      notes,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateStatus(id, status) {
    const query = `
      UPDATE ${this.tableName}
      SET 
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

// Exporta uma instância única (singleton)
module.exports = new VisitRepository();