const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const { format }= require('date-fns')
var pdf = require('html-pdf');


const app = express();
app.use(cors());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'incomeExpense',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(express.json());

//

// GET operation 
app.get('/getSourceData', (req, res) => {
    connection.query('SELECT * FROM income', (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });


// POST method 
    app.post('/postSourceData', (req, res) => {
    const newData = { 
        source: req.body.source,
        description:req.body.description
    };
    
    connection.query('SELECT * FROM income WHERE source = ?', newData.source, (err, results) => {
        if (err) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'Duplicate Entry' });
            return;
        } 

    
    connection.query('INSERT INTO income SET ?', newData, (err, result) => {
        if (err) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
  });
});

// DELETE method in IncomeHead table
app.delete('/deleteSource/:id', (req,res)=>{
    const id= req.params.id;

    connection.query('DELETE FROM income WHERE ID= ?',[id], (error,results)=>{
        if(error){
            console.log('Error executing query:', error);
            return;
        }
        res.json({ message: 'Income Head data deleted successfully' });
    });
});

// GetSourceById in source table
app.get('/getSourceById/:id', (req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM income WHERE ID = ?',[id], (error,results)=>{
        if(error){
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });   
            return
        }
        if(results.length===0){
            console.error('Error executing query:', error);
            res.status(404).json({ error: 'Data not found.' });
            return
        }
        res.json(results[0]);
    });
});

// Update Source
app.put('/updateSource/:id', (req,res)=>{
    const id = req.params.id;
        const source=req.body.source;
        const description=req.body.description;
        const values = [
            source,
            description,
            id
          ];
        connection.query('UPDATE income SET source= ?,description= ?  WHERE id= ?', values, (error,results)=>{
            if(error){
                console.error('Error updating data:', error);
                res.status(404).json({error: "error occured"});;
              }
              res.status(200).json({ message: 'Data updated successfully' }); 
        });
    });
       

//----------------------------------------------------------------------------------------------------------------------

// GET operation 
app.get('/getExpenseData', (req, res) => {
    connection.query('SELECT * FROM expense', (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });


// POST method 
    app.post('/postExpenseData', (req, res) => {
    const newData = { 
        expense: req.body.expense,
        description:req.body.description

    };
    
    connection.query('SELECT * FROM expense WHERE expense = ?', newData.expense, (err, results) => {
        if (err) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'Duplicate Entry' });
            return;
        }
    
    connection.query('INSERT INTO expense SET ?', newData, (err, result) => {
        if (err) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
  });
});

// DELETE method in ExpenseHead table
app.delete('/deleteExpense/:id', (req,res)=>{
    const id= req.params.id;

    connection.query('DELETE FROM expense WHERE ID= ?',[id], (error,results)=>{
        if(error){
            console.log('Error executing query:', error);
            return;
        }
        res.json({ message: 'Income Head data deleted successfully' });
    });
});

// GetExpenseById in TransactionIncome table
app.get('/getExpenseById/:id', (req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM expense WHERE ID = ?',[id], (error,results)=>{
        if(error){
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });   
            return
        }
        if(results.length===0){
            console.error('Error executing query:', error);
            res.status(404).json({ error: 'Data not found.' });
            return
        }
        res.json(results[0]);
    });
});

// Update Source
app.put('/updateExpense/:id', (req,res)=>{
    const id = req.params.id;
    const expense=req.body.expense;
    const description=req.body.description;

    const values = [
        expense,
        description,
        id
    ];
    
    connection.query('UPDATE expense SET expense= ?, description=? WHERE id= ?', values, (error,results)=>{
        if(error){
        console.error('Error updating data:', error);
        res.status(404).json({error: "error occured"});;
        }
        res.status(200).json({ message: 'Data updated successfully' }); 
    });
});



//----------------------------------------------------------------------------------------------------------

// CRUD ops for transactionIncome table

// GET method
app.get('/getIncomeData', (req,res)=>{
    connection.query('SELECT * FROM transactionIncome',(error,results)=>{
        if(error){
            console.log("Error Executing Query",error);
            res.status(500).json({ error: 'Internal server error' });
            return
        }
        res.json(results);
    });
});

// GetIncomeById in TransactionIncome table
app.get('/getIncomeById/:id', (req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM transactionIncome WHERE ID = ?',[id], (error,results)=>{
        if(error){
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });   
            return
        }
        if(results.length===0){
            console.error('Error executing query:', error);
            res.status(404).json({ error: 'Data not found.' });
            return
        }
        // const formattedDate = format(results[0].date, 'yyyy-MM-dd');
        // // Replace the original date with the formatted one
        // results[0].date = formattedDate;
        res.json(results[0]);
    });
});

//Post method
app.post('/postIncomeData', (req,res)=>{
    const incomeData={
        source:req.body.source,
        name:req.body.name,
        amount:req.body.amount,
        quantity:req.body.quantity,
        date:format(req.body.date,'yyyy-MM-dd'),
    }

    console.log("Recieved Income Data:",incomeData);

    connection.query('INSERT INTO transactionIncome SET ?',incomeData, (err,results)=>{
        if(err){
        console.log("Error executing query", err);
        res.status(500).json({error: 'Internal server error'});
        return
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });

});

// DELETE method in TransactionIncome tablex
app.delete('/deleteIncome/:id', (req,res)=>{
    const id= req.params.id;

    connection.query('DELETE FROM transactionIncome WHERE ID= ?',[id], (error,results)=>{
        if(error){
            console.log('Error executing query:', error);
            return;
        }
        res.json({ message: 'Data deleted successfully' });
    });
});

// UPDATE operation
app.put('/updateIncome/:id', (req, res) => {
const id = req.params.id;

const newData = {
    source:req.body.source,
    name:req.body.name,
    amount:req.body.amount,
    quantity:req.body.quantity,
    date:format(req.body.date,'yyyy-MM-dd'),
    id
};


const updateQuery =
  `UPDATE transactionIncome 
  SET 
    source= ?, 
    name= ?,
    amount= ?,
    quantity=?,
    date=?

  WHERE id = ?  `
;

const values = [
  newData.source,
  newData.name,
  newData.amount,
  newData.quantity,
  newData.date,
  id
];

connection.query(updateQuery, values, (error, results) => {
  if (error) {
    console.error('Error updating data:', error);
    res.status(404).json({error: "error occured"});;
  }
  res.status(200).json({ message: 'Data updated successfully' }); 
});
});

// Income graph
app.get('/incomeReport', (req, res) => {
    const sql = 'SELECT source, SUM(amount) AS total_amount FROM transactionIncome GROUP BY source';
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(result);
      }
    });
  });
  

//-----------------------------------------------------------------------------------------------------------

// CRUD ops for transactionExpense table

// GET method
app.get('/getInvestData', (req,res)=>{
connection.query('SELECT * FROM transactionExpense',(error,results)=>{
    if(error){
        console.log("Error Executing Query",error);
        res.status(500).json({ error: 'Internal server error' });
        return
    }
    res.json(results);
});
});

// GetExpenseById in TransactionIncome table
app.get('/getInvestById/:id', (req,res)=>{
const id=req.params.id;
connection.query('SELECT * FROM transactionExpense WHERE ID = ?',[id], (error,results)=>{
    if(error){
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });   
        return
    }
    if(results.length===0){
        console.error('Error executing query:', error);
        res.status(404).json({ error: 'Data not found.' });
        return
    }
    
    res.json(results[0]);});
});



//  POST method in TransactionIncome table
app.post('/postInvestData', (req,res)=>{
const expenseData={
    type:req.body.type,
    name:req.body.name,
    amount:req.body.amount,
    quantity:req.body.quantity,
    date:format(req.body.date,'yyyy-MM-dd'),
}

console.log("Recieved Income Data:",expenseData);

connection.query('INSERT INTO transactionExpense SET ?',expenseData, (err,results)=>{
    if(err){
    console.log("Error executing query", err);
    res.status(500).json({error: 'Internal server error'});
    return
    }
    res.status(200).json({ message: 'Data inserted successfully' });
});

});

// DELETE method in TransactionIncome table
app.delete('/deleteInvest/:id', (req,res)=>{
const id= req.params.id;

connection.query('DELETE FROM transactionExpense WHERE ID= ?',[id], (error,results)=>{
    if(error){
        console.log('Error executing query:', error);
        return;
    }
    res.json({ message: 'Expense data deleted successfully' });
});
});

// UPDATE operation
app.put('/updateInvest/:id', (req, res) => {
    const id = req.params.id;
    
    const newData = {
        type:req.body.type,
        name:req.body.name,
        amount:req.body.amount,
        quantity:req.body.quantity,
        date:format(req.body.date,'yyyy-MM-dd'),
        id
    };
    
    
    const updateQuery =
      `UPDATE transactionExpense 
      SET 
        type= ?, 
        name= ?,
        amount= ?,
        quantity=?,
        date=?
    
      WHERE id = ?  `
    ;
    
    const values = [
      newData.type,
      newData.name,
      newData.amount,
      newData.quantity,
      newData.date,
      id
    ];
    
    connection.query(updateQuery, values, (error, results) => {
      if (error) {
        console.error('Error updating data:', error);
        res.status(404).json({error: "error occured"});;
      }
      res.status(200).json({ message: 'Data updated successfully' }); 
    });
    });
    
// Expense graph
app.get('/expenseReport', (req, res) => {
    const sql = 'SELECT type, SUM(amount) AS total_amount FROM transactionExpense GROUP BY type';
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(result);
      }
    });
  });

//   -----------------------------------------------------------------------------------------------------------

// For inventory table

// GET method
app.get('/getInventoryData',(req,res)=>{
    connection.query('SELECT * FROM inventory',(error,results)=>{
        if(error){
            console.log("Error executing query",error);
            res.status(500).json({error:'Internal server error'})
            return
        }
        res.json(results);
    });
});

// GETByID method
app.get('/getInventoryById/:id', (req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM inventory WHERE ID = ?',[id], (error,results)=>{
        if(error){
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });   
            return
        }
        if(results.length===0){
            console.error('Error executing query:', error);
            res.status(404).json({ error: 'Data not found.' });
            return
        }
        
        res.json(results[0]);});
    });

// POST method
app.post('/postInventoryData', (req,res)=>{
    const inventoryData={
        type:req.body.type,
        quantity:req.body.quantity,
        total_quantity:req.body.total_quantity,
        leftover:req.body.leftover,
    }
    
    console.log("Recieved Income Data:",inventoryData);
    
    connection.query('INSERT INTO inventory SET ?',inventoryData, (err,results)=>{
        if(err){
        console.log("Error executing query", err);
        res.status(500).json({error: 'Internal server error'});
        return
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
    
});

// DELETE method in inventory table
app.delete('/deleteInventory/:id', (req,res)=>{
    const id= req.params.id;
    
    connection.query('DELETE FROM inventory WHERE ID= ?',[id], (error,results)=>{
        if(error){
            console.log('Error executing query:', error);
            return;
        }
        res.json({ message: 'Expense data deleted successfully' });
    });
    });

    // UPDATE operation
app.put('/updateInventory/:id', (req, res) => {
    const id = req.params.id; 
    const newData = {
    type:req.body.type,
    quantity:req.body.quantity,
    total_quantity:req.body.total_quantity,
    leftover:req.body.leftover,
    id
  };

const updateQuery =
`UPDATE inventory
    SET 
      type= ?, 
      quantity= ?,
      total_quantity= ?,
      leftover=?
    WHERE id = ? `;

const values = [
    newData.type,
    newData.quantity,
    newData.total_quantity,
    newData.leftover,
    id
];

connection.query(updateQuery, values, (error, results) => {
if (error) {
console.error('Error updating data:', error);
res.status(404).json({error: "error occured"});;
}
res.status(200).json({ message: 'Data updated successfully' }); 
});
});

//----------------------------------------------------------------------------------------------------------------

//Inventories type and sum_of_quantity retrieval.

app.get('/getExpenseQuantity',(req,res)=>{
    connection.query('SELECT type, sum(quantity) as sumQuantity from transactionExpense group by type', (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(result);
        }
      });
})

// -------------------------------------------------------------------------------------------------------------

//  POST method in supply table
app.post('/postSupplyData', (req,res)=>{
    const supplyData={
        name:req.body.name,
        quantity:req.body.quantity,
        date:format(req.body.date,'yyyy-MM-dd'),
        time:req.body.time,
    }
    
    console.log("Recieved Income Data:",supplyData);
    
    connection.query('INSERT INTO supply SET ?',supplyData, (err,results)=>{
        if(err){
        console.log("Error executing query", err);
        res.status(500).json({error: 'Internal server error'});
        return
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
    
    });

// GET method
app.get('/getSupplyData',(req,res)=>{
    connection.query('SELECT * FROM supply',(error,results)=>{
        if(error){
            console.log("Error executing query",error);
            res.status(500).json({error:'Internal server error'})
            return
        }
        res.json(results);
    });
});

// GETByID method
app.get('/getSupplyById/:id', (req,res)=>{
    const id=req.params.id;
    connection.query('SELECT * FROM supply WHERE ID = ?',[id], (error,results)=>{
        if(error){
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });   
            return
        }
        if(results.length===0){
            console.error('Error executing query:', error);
            res.status(404).json({ error: 'Data not found.' });
            return
        }
        
        res.json(results[0]);});
    });


// DELETE method in inventory table
app.delete('/deleteSupply/:id', (req,res)=>{
    const id= req.params.id;
    
    connection.query('DELETE FROM supply WHERE ID= ?',[id], (error,results)=>{
        if(error){
            console.log('Error executing query:', error);
            return;
        }
        res.json({ message: 'Expense data deleted successfully' });
    });
    });

    // UPDATE operation
app.put('/updateSupply/:id', (req, res) => {
    const id = req.params.id; 
    const newData = {
        name:req.body.name,
        quantity:req.body.quantity,
        date:format(req.body.date,'yyyy-MM-dd'),
        time:req.body.time,
    id
  };

const updateQuery =
`UPDATE supply
    SET 
      name= ?, 
      quantity= ?,
      date= ?,
      time=?
    WHERE id = ? `;

const values = [
    newData.name,
    newData.quantity,
    newData.date,
    newData.time,
    id
];

connection.query(updateQuery, values, (error, results) => {
if (error) {
console.error('Error updating data:', error);
res.status(404).json({error: "error occured"});;
}
res.status(200).json({ message: 'Data updated successfully' }); 
});
});

// --------------------------------------------------------------------------------------------------------------
//  POST method in history table
app.post('/postHistory', (req,res)=>{
    const supplyData={
        name:req.body.name,
        quantity:req.body.quantity,
        date:format(req.body.date,'yyyy-MM-dd'),
        time:req.body.time,
    }
    
    connection.query('INSERT INTO history SET ?',supplyData, (err,results)=>{
        if(err){
        console.log("Error executing query", err);
        res.status(500).json({error: 'Internal server error'});
        return
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
    
    });

//--------------------------------------------------------------------------------------------------------------
//  POST method in audit table
app.post('/postAudit', (req,res)=>{
    const supplyData={
        oldName:req.body.oldName,
        newName:req.body.newName,
        oldQuantity:req.body.oldQuantity,
        newQuantity:req.body.newQuantity,
        oldDate:format(req.body.oldDate,'yyyy-MM-dd'),
        newDate:format(req.body.newDate,'yyyy-MM-dd'),
        oldTime:req.body.oldTime,
        newTime:req.body.newTime,
    }
    
    connection.query('INSERT INTO audit SET ?',supplyData, (err,results)=>{
        if(err){
        console.log("Error executing query", err);
        res.status(500).json({error: 'Internal server error'});
        return
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
    
    });

// ------------------------------------------------------------------------------
    // GET method to extract audit data by name
    app.get('/getAuditByName/:name', (req, res) => {
    const name = req.params.name;
    connection.query('SELECT * FROM audit WHERE oldName = ? OR newName = ?', [name, name], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
