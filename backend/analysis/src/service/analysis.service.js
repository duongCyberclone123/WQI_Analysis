const pool = require("../config/db.js");

class AnalysisService {
  async nb_of_observation_points() {
    const rows = await pool.query("SELECT DISTINCT observation_point FROM alldata");
    return rows;
  }

  async nb_of_observations() {
    const count = await pool.query("SELECT COUNT (*) AS count FROM alldata");
    return count;
  }

  async valid_quality() {
    const count = await pool.query("SELECT COUNT (*) AS count FROM alldata WHERE water_quality > 3");
    return count[0][0].count;
  }

  async water_quality() {
    const w0 = await pool.query("SELECT COUNT (*) AS count FROM alldata WHERE water_quality = 0");
    const w1 = await pool.query("SELECT COUNT (*) AS count FROM alldata WHERE water_quality = 1");
    const w2 = await pool.query("SELECT COUNT (*) AS count FROM alldata WHERE water_quality = 2");
    const w3 = await pool.query("SELECT COUNT (*) AS count FROM alldata WHERE water_quality = 3");
    const w4 = await pool.query("SELECT COUNT (*) AS count FROM alldata WHERE water_quality = 4");
    return [w0[0][0].count, w1[0][0].count, w2[0][0].count, w3[0][0].count, w4[0][0].count];
  }

  async Place_data() {
    const provinces = await pool.query("SELECT * FROM province");
    const districts = await pool.query("SELECT * FROM district");
    const ob_places = await pool.query("SELECT * FROM observe_place");
    return {provinces: provinces[0], districts: districts[0], ob_places: ob_places[0]};
  }

  async getObservationAt(province, district, ob_place) {
    let query = "";
    let parameters = [];
    if (province && district && ob_place) {
      query = `SELECT wqi, date FROM alldata WHERE province = ? AND district = ? AND observation_point = ?`;
      parameters = [province, district, ob_place];
    }
    else if (province && district) {
      query = `SELECT wqi, date FROM alldata WHERE province = ? AND district = ?`;
      parameters = [province, district];
    } else if (province) {
      query = `SELECT wqi, date FROM alldata WHERE province = ?`;
      parameters = [province];
    } else {
      query = `SELECT wqi, date FROM alldata`;
    }
    const rows = await pool.query(query, parameters);
    return rows[0];
  }
  
  async getDataSet(limit, ub, lb, startDate, endDate, i){
    console.log(limit);
    
    let query = "SELECT * FROM alldata WHERE wqi <= ? AND wqi >= ? AND date BETWEEN ? AND ? LIMIT ? OFFSET ?";
    let params = [ub || 100, lb || 0, startDate || "2022/01/01", endDate || "2025/01/01", Number(limit) || 10, Number(i) || 0];
    const rows = await pool.query(query,params);
    return rows[0];
  }
}

module.exports = new AnalysisService();