// Importa o express.
const express = require("express");

// Cria um router para separar em rotas em arquivos diferentes.
const router = express.Router()

// Importando do database.js
const db = require("../config/database");


// EJS.
// Lembrando: aqui vai ser sempre o definido no app + isto. Ex: se no app esta "/", vai 
// ser / + forms, se estiver + /teste, vai ser /teste + /forms = /teste/forms.
router.get("/forms", function(req, res) {
    return res.render("forms.ejs");
});

//
router.post("/forms", function (req, res) {
    const age = req.body.age;
    const sex = req.body.sex;
    const education = req.body.education;
    const has_children = req.body.has_children;
    const has_property = req.body.has_property;
    const has_car = req.body.has_car;
    const ever_loan = req.body.ever_loan;
    const loan_paid = req.body.loan_paid;
    const annual_salary = req.body.annual_salary;
    const invested_amount = req.body.invested_amount;
    
    // Recuperando username salvo durante o login ou criação.
    const loggedUser = req.session.username;

    //
    const createFormsQuery = `
        UPDATE forms
        SET
            age = ?,
            sex = ?,
            education = ?,
            has_children = ?,
            has_property = ?,
            has_car = ?,
            ever_loan = ?,
            loan_paid = ?,
            annual_salary = ?,
            invested_amount = ?
        WHERE username = ?
    `;

    const params_forms = [
        age,
        sex,
        education,
        has_children,
        has_property,
        has_car,
        ever_loan,
        loan_paid,
        annual_salary,
        invested_amount,
        loggedUser
    ];

    //
    db.run(createFormsQuery, params = params_forms, function(err){
        if (err) {

            //
            return res.send("Error while submiting forms: " + err.message);
        } 

        db.run("UPDATE users SET is_forms_completed = 1 WHERE username = ?", params = loggedUser, function(err){
          if(err) {
            return res.send("Erro na atualização da coluna is_forms_completed");
          }  
        })

        res.send("DONE!");
    })
})

//
module.exports = router;