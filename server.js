const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL 연동 설정
const dbConfig = {
    host: 'localhost',
    user: 'root',      // 본인의 MySQL 사용자명
    password: 'Ych103883!', // 본인의 MySQL 비밀번호
    database: 'belluna_db'
};

// 회원가입 API 엔드포인트
app.post('/api/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ success: false, message: '모든 항목을 입력해 주세요.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);

        // 1. 이메일 중복 확인
        const [rows] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            await connection.end();
            return res.status(409).json({ success: false, message: '이미 가입된 이메일 주소입니다.' });
        }

        // 2. 비밀번호 단방향 암호화 (Salt / Hash)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. DB에 회원 정보 저장
        const sql = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
        await connection.execute(sql, [name, email, hashedPassword, phone]);

        await connection.end();
        return res.status(201).json({ success: true, message: '회원가입이 완료되었습니다.' });

    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
