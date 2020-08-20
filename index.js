const express = require("express");
const welcomeRouter = require("./welcome/welcome");
const accountsRouter = require("./routes/accountRoutes");

const server = express()
const port = process.env.PORT || 6000

server.use(express.json())
server.use("/", welcomeRouter)
server.use("/", accountsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

