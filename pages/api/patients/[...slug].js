import fs from "fs";

let mockData = [
  {
    _id: "1",
    name: "John Doe",
    email: "jhon@gmail.com",
    address: "1234 Main St",
    phone: "123-456-7890",
  },
  {
    _id: "2",
    name: "Jane Doe",
    email: "jane@gmail.com",
    address: "1234 Main St",
    phone: "123-456-7890",
  },
];

export default async (req, res) => {
  const { method } = req;

  if (req.query.slug[0] === "all") {
    switch (method) {
      case "GET":
        try {

          return res.status(200).json({
            success: true,
            data: mockData,
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
          });
        }
      case "POST":
        try {

          const newPatient = {
            _id: mockData.length + 1,
            ...req.body,
          };
          
          mockData.push(newPatient);

          return res.status(200).json({
            success: true,
            data: newPatient,
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
          });
        }
      default:
        res.setHeaders("Allow", ["GET", "POST"]);
        return res
          .status(405)
          .json({ success: false })
          .end(`Method ${method} Not Allowed`);
    }
  } else {
    let id = req.query.slug[0];

    switch (method) {
      case "GET":
        try {

          const patient = mockData.find((patient) => patient._id === id);

          return res.status(200).json({
            success: true,
            data: patient,
          });
        } catch (error) {
          return res.status(404).json({
            success: false,
          });
        }
      case "PUT":
        try {

          let patient = mockData.find((patient) => patient._id === id);

          patient = { ...patient, ...req.body };

          const newMockData = mockData.map((patient) =>
            patient._id === id ? patient : patient
          );

          mockData = newMockData;

          return res.status(200).json({
            success: true,
            data: patient,
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
          });
        }
      case "DELETE":
        try {

          let newMockData = mockData.filter((patient) => patient._id !== id);

          mockData = newMockData;

          return res.status(200).json({
            success: true,
            data: { id },
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message,
          });
        }
      default:
        res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ success: false })
          .end(`Method ${method} Not Allowed`);
    }
  }
};
