
// const express = require("express");
// const app = express();

// const admin = require("firebase-admin");
// const credentials = require('./key.json');

// admin.initializeApp({
//     credential: admin.credential.cert(credentials)
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const db = admin.firestore();

// let nextCustomerId = 1; 

// app.post("/createCustomer", async (req, res) => {
//     try {
//         const customerJson = {
//             email: req.body.email,
//             Name: req.body.Name,
//             PhoneNumber: req.body.PhoneNumber,
//             Address: req.body.Address,
//         };

//         const customerId = nextCustomerId.toString();
//         nextCustomerId++;
//         await db.collection("customers").doc(customerId).set(customerJson);
//         res.status(200).json({ message: "Customer added successfully", customerId });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "An error occurred while adding the customer" });
//     }
// });


// app.get('/allCustomers', async (req, res) => {
//     try {
//         const customersRef = db.collection("customers");
//         const response = await customersRef.get();
//         let responseArr = [];
//         response.forEach(doc => {
//             responseArr.push(doc.data());
//         });
//         res.send(responseArr);
//     } catch (error) {
//         res.send(error);
//     }
// });

// app.get('/customer/:id', async (req, res) => {
//     try {
//         const customerRef = db.collection("customers").doc(req.params.id);
//         const response = await customerRef.get();
//         res.send(response.data());
//     } catch (error) {
//         res.send(error);
//     }
// });

// app.put('/updateCustomer/:id', async (req, res) => {
//     try {
//         const customerRef = db.collection("customers").doc(req.params.id);
//         const updatedData = {
//             Name: req.body.Name,
//             PhoneNumber: req.body.PhoneNumber,
//             Address: req.body.Address,
//         };

//         await customerRef.update(updatedData);

//         res.send("Customer data updated successfully");
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });





// const express = require("express");
// const app = express();

// const admin = require("firebase-admin");
// const credentials = require('./key.json');

// admin.initializeApp({
//     credential: admin.credential.cert(credentials)
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const db = admin.firestore();

// let nextCustomerId = 1; 

// app.post("/createCustomer", async (req, res) => {
//     try {
//         const customerJson = {
//             email: req.body.email,
//             Name: req.body.Name,
//             PhoneNumber: req.body.PhoneNumber,
//             Address: req.body.Address,
//         };

//         const customerId = nextCustomerId.toString();
//         nextCustomerId++;
//         await db.collection("customers").doc(customerId).set(customerJson);
//         res.status(200).json({ message: "Customer added successfully", customerId });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "An error occurred while adding the customer" });
//     }
// });

// app.get('/allCustomers', async (req, res) => {
//     try {
//         const customersRef = db.collection("customers");
//         const response = await customersRef.get();
//         let responseArr = [];
//         response.forEach(doc => {
//             const customerData = doc.data();
//             customerData.customerId = doc.id; // Include the custom ID
//             responseArr.push(customerData);
//         });
//         res.status(200).json(responseArr);
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred while fetching customer data" });
//     }
// });

// app.get('/customer/:id', async (req, res) => {
//     try {
//         const customerRef = db.collection("customers").doc(req.params.id);
//         const response = await customerRef.get();
//         const customerData = response.data();
//         if (customerData) {
//             customerData.customerId = req.params.id; 
//             res.status(200).json(customerData);
//         } else {
//             res.status(404).json({ error: "Customer not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred while fetching customer data" });
//     }
// });

// app.delete('/deleteCustomer/:id', async (req, res) => {
//     try {
//         const response = await db.collection('customers').doc(req.params.id).delete();
//         res.send(response);
//     } catch (error) {
//         res.send(error);
//     }
// });

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });



const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = admin.firestore();

let nextCustomerId = 1; 

app.post("/createCustomer", async (req, res) => {
    try {
        const customerJson = {
            email: req.body.email,
            Name: req.body.Name,
            PhoneNumber: req.body.PhoneNumber,
            Address: req.body.Address,
            Customer_ID: nextCustomerId.toString(), // Set the custom Customer_ID field
        };

        nextCustomerId++; // Increment the custom ID for the next customer

        // Create the customer document with the custom Customer_ID
        await db.collection("customers").add(customerJson);

        res.status(200).json({ message: "Customer added successfully", Customer_ID: customerJson.Customer_ID });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while adding the customer" });
    }
});

app.get('/allCustomers', async (req, res) => {
    try {
        const customersRef = db.collection("customers");
        const response = await customersRef.get();
        let responseArr = [];
        response.forEach(doc => {
            const customerData = doc.data();
            customerData.Customer_ID = doc.id; // Use Firestore document ID as Customer_ID
            responseArr.push(customerData);
        });
        res.status(200).json(responseArr);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching customer data" });
    }
});

app.get('/customer/:id', async (req, res) => {
    try {
        const customerRef = db.collection("customers").doc(req.params.id);
        const response = await customerRef.get();
        const customerData = response.data();
        if (customerData) {
            customerData.Customer_ID = req.params.id; // Include the custom Customer_ID
            res.status(200).json({customerData,message:"successfully retrieved"});
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching customer data" });
    }
});

app.put('/updateCustomer/:id', async (req, res) => {
    try {
        const customerRef = db.collection("customers").doc(req.params.id);
        const updatedData = {
            Name: req.body.Name,
            PhoneNumber: req.body.PhoneNumber,
            Address: req.body.Address,
        };

        await customerRef.update(updatedData);

        res.send("Customer data updated successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/deleteCustomer/:id', async (req, res) => {
    try {
        const customerRef = db.collection('customers').doc(req.params.id);
        const response = await customerRef.delete();
        if (response.writeTime) {
            res.status(200).json({ message: `Customer with ID ${req.params.id} deleted successfully` });
        } else {
            res.status(404).json({ error: `Customer with ID ${req.params.id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the customer" });
    }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
