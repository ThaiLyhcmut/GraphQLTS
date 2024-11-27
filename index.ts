import express, { Express, Request, Response } from "express";
const app: Express = express();
const port: number = 3000;

app.get("/article", (req: Request, res: Response) => {
  res.json({
    articles: []
  })
})

app.listen(port , () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})