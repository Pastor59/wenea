const DB = require(process.cwd() + '/src/db/');

module.exports = {
    get: {
        byID(id) {
            return DB.query("SELECT * FROM chargepoint WHERE id = $1", [id]);
        },
        all(){
            return DB.query("SELECT * FROM chargepoint WHERE deleted_at IS NULL"); 
        }
    },

    insert: {
        save(name, status) {
            return DB.query("INSERT INTO chargepoint (name, status, created_at) VALUES ($1,$2,$3) RETURNING *", [name, status, new Date().getTime()]); 
        }
    },

    update: {
        statusByID(id, status){
            return DB.query("UPDATE chargepoint SET status = $1 WHERE id = $2 RETURNING *", 
            [status, id]
            ); 
        }
    },

    delete: {
        byID(id){
            return DB.query("UPDATE chargepoint SET deleted_at = $1 WHERE id = $2 RETURNING *", 
            [new Date().getTime(), id]
            );             
        }
    }
}