var pool = require('./bd');

async function getNovedades () {
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
}

async function deleteNovedadesById(id_emp) {
    var query = 'delete from novedades where id_emp = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertNovedades(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getNovedadesById(id_emp) {
    var query = 'select * from novedades where id_emp = ?';
    var rows = await pool.query(query, [id_emp]);
    return rows;
}

async function modificarNovedadesById(id_emp, obj) {
    try {
        var query = "update novedades set ? where id_emp = ?";
        var rows = await pool.query(query, [obj, id_emp]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports= {getNovedades, deleteNovedadesById, insertNovedades, getNovedadesById, modificarNovedadesById};