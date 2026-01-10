const express = require("express");
const router = express.Router();

/**
 * @route GET /attendee
 * @purpose List published events sorted by date.
 */
router.get("/", (req, res) => {
    // Apenas eventos publicados
    global.db.all("SELECT * FROM events WHERE status='published' ORDER BY event_date ASC", (err, events) => {
        if (err) return res.send("Database error");
        res.render("attendee-home", { events }); // Precisa criar este ficheiro (ver ponto 2)
    });
});

/**
 * @route GET /attendee/event/:id
 * @purpose Display event details and booking form.
 */
router.get("/event/:id", (req, res) => {
    global.db.get("SELECT * FROM events WHERE id = ? AND status='published'", [req.params.id], (err, event) => {
        if (err || !event) return res.send("Event not found or not published.");
        res.render("attendee-event", { event }); // Precisa criar este ficheiro (ver ponto 3)
    });
});

/**
 * @route POST /attendee/book/:id
 * @purpose Handle ticket booking and update database quantities.
 */
router.post("/book/:id", (req, res) => {
    const eventId = req.params.id;
    // Converter inputs para números inteiros (defaults para 0 se vazio)
    const numFull = parseInt(req.body.num_full) || 0;
    const numConc = parseInt(req.body.num_conc) || 0;
    const attendeeName = req.body.attendee_name;

    if (numFull === 0 && numConc === 0) {
        return res.send("Please select at least one ticket.");
    }

    // 1. Verificar disponibilidade
    global.db.get("SELECT * FROM events WHERE id=?", [eventId], (err, event) => {
        if (event.full_price_tickets < numFull || event.concession_tickets < numConc) {
            return res.send("Error: Not enough tickets available.");
        }

        // 2. Atualizar contagem de bilhetes no evento
        global.db.run(`UPDATE events SET full_price_tickets = full_price_tickets - ?, concession_tickets = concession_tickets - ? WHERE id = ?`, 
            [numFull, numConc, eventId], (err) => {
                if (err) return res.send("Error updating tickets");

                // 3. Registar a reserva na tabela bookings
                global.db.run(`INSERT INTO bookings (event_id, attendee_name, num_full_tickets, num_concession_tickets) VALUES (?, ?, ?, ?)`, 
                    [eventId, attendeeName, numFull, numConc], (err) => {
                        // Sucesso: Redireciona para a home do participante
                        res.redirect("/attendee"); 
                });
        });
    });
});

module.exports = router;