import express from "express";
import pool from "./db.js";

const app = express();

// 요청 body의 JSON을 읽을 수 있게 해주는 설정(POST 인 경우)
app.use(express.json());

// let todos = [
//   { id: 1, title: "Express 배우기" },
//   { id: 2, title: "API 만들기" },
// ];

// 목록 조회
app.get("/todos", async (req, res) => {
  const result = await pool.query("select * from todos order by 1 desc");
  res.json(result.rows);
});

// 상세 조회
// app.get("/todos/:id", (req, res) => {
//   const todo = todos.find((t) => t.id === Number(req.params.id));

//   if (!todo) {
//     return res.status(404).json({ message: "없는 할 일입니다." });
//   }

//   res.json(todo);
// });

// 새 할일 추가
app.post("/todos", async (req, res) => {
  const result = await pool.query('insert into todos (text) values ($1) returning *', [req.body.text]);
  res.status(201).json(result.rows[0]);
});

// 할일 수정
// app.put("/todos/:id", (req, res) => {
//   const todo = todos.find((t) => t.id === Number(req.params.id));

//   if (!todo) {
//     return res.status(404).json({ message: "없는 할 일입니다." });
//   }
//   todo.text = req.body.text;
//   res.json(todo);
// });

// // 할일 삭제
// app.delete("/todos/:id", (req, res) => {
//   todos = todos.filter((t) => t.id !== Number(req.params.id));
//   res.status(204).end();
// });

app.listen(3000, () => {
  console.log("서버 실행중: http://localhost:3000");
});
