// const cluster = require("cluster")
// const os = require("os")

// const totalCPUs = os.cpus().length;

// console.log(totalCPUs)

// const os = require("os");

// const totalCPUs = os.cpus().length;
// console.log(`Total CPU Cores: ${totalCPUs}`);
// console.log("CPU Details:", os.cpus());


const cluster = require("node:cluster");
const os = require("os");
const express = require("express");

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork(); // Creates worker processes
    }
} else {
    const app = express();
    const PORT = 8000;

    app.get("/", (req, res) => {
        return res.json({
            message: `Hello from Express Server ${process.pid} 🚀`,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server running on process ${process.pid} at http://localhost:${PORT}`);
    });
}
