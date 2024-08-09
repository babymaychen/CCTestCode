var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("my-database.db");

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS profiles ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    userName TEXT NOT NULL, \
    email TEXT NOT NULL, \
    phone TEXT NOT NULL \
  )"
  );
  db.run(
    `INSERT INTO profiles (username, email, phone) VALUES ('张三', '18609855455@163.com', '18609855455')`
  );
});

//查找用户信息
exports.getProfiles = function (callback) {
  const query = "SELECT * FROM profiles";
  db.get(query, function (error, profiles) {
    callback(error, profiles);
  });
};

//根据ID更新用户信息
exports.updateProfileById = function (id, userName, email, phone, callback) {
  const query = `
    UPDATE profiles SET
      userName = ?,
      email = ?,
      phone = ?
    WHERE
      id = ?
	`;
  const values = [userName, email, phone, id];
  db.get(query, values, function (error) {
    callback(error);
  });
};
//创建用户信息
exports.createProfile = function (username, email, phone, callback) {
  const query =
    "INSERT INTO profiles (username, email, phone) VALUES (?, ?, ?)";
  const values = [username, email, phone];
  db.run(query, values, function (error) {
    callback(error, this.lastID);
  });
};
