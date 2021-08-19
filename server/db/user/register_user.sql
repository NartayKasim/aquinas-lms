INSERT INTO users (first_name, last_name, email, password, is_instructor)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;