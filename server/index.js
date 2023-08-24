const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const password = "adhimessicr7";

app.use(cors());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://adhithc:${password}@cluster0.qovfckv.mongodb.net/usermanagement?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
