const express = require("express");
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
var app = express();
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("page");
});

// This routing is for Certificate!
app.get("/certificate", (req, res)=>{
    res.render("page");
});

app.post("/certificate", (req, res) => {
    console.log(req.body);
    try {
        const templateFile = fs.readFileSync(path.resolve(__dirname, './public/templateDocx/Sample_template_certificate.docx'), 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const dataToAdd_certificate = {
            STUDENT_NAME: req.body.name,
            STUDENT_ENR: req.body.enrollmentno,
            COI: req.body.coi,
            MICROPROJECT_TITLE: req.body.micorprojecttitle,
            COSUBJECT: req.body.cosubject,
            TEACHER_NAME: req.body.teachername
        };
        outputDocument.setData(dataToAdd_certificate);

        try {
            outputDocument.render()
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });
            fs.writeFileSync(path.resolve(__dirname, `./public/files/computer/certificate/${req.body.name}-computer-certificate.docx`), outputDocumentBuffer);
        }
        catch (error) {
            console.error(`ERROR Filling out Template:`);
            console.error(error)
        }
    } catch (error) {
        console.error(`ERROR Loading Template:`);
        console.error(error);
    }
    res.download(`./public/files/computer/certificate/${req.body.name}-computer-certificate.docx`);
});

app.get("/microproject", (req, res) => {
    res.render("page");
})

app.post("/microproject", (req, res) => {
    console.log(req.body);
    try {
        const templateFile = fs.readFileSync(path.resolve(__dirname, './public/templateDocx/EST.docx'), 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const dataToAdd = {
            STUDENT_NAME: req.body.name,
            STUDENT_ENR: req.body.enrollmentno,
            ROLLNO: req.body.rollno,
            TEACHER_NAME: req.body.teacher
        };
        outputDocument.setData(dataToAdd);

        try {
            outputDocument.render()
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });
            fs.writeFileSync(path.resolve(__dirname, `./public/files/computer/microproject/${req.body.name}-computer-microproject.docx`), outputDocumentBuffer);
        }
        catch (error) {
            console.error(`ERROR Filling out Template:`);
            console.error(error)
        }

    } catch (error) {
        console.log("Error Loading Template:");
        console.log(error);
    }
    res.download(`./public/files/computer/microproject/${req.body.name}-computer-microproject.docx`);
});

app.get("/civilcertificate", (req, res) => {
    res.render("page");
});

app.post("/civilcertificate", (req, res) => {
    console.log(req.body);
    try {
        const templateFile = fs.readFileSync(path.resolve(__dirname, './public/templateDocx/civil_certificate.docx'), 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const dataToAdd = {
            MicroprojectTitle: req.body.MicroprojectTitle,
            yr: req.body.yr,
            STUD_NAME: req.body.stud_name,
            stdName2: req.body.stdName2,
            stdName3: req.body.stdName3,
            stdName4: req.body.stdName4,
            STUD_ENR: req.body.stud_enr,
            stdEnr2: req.body.stdEnr2,
            stdEnr3: req.body.stdEnr3,
            stdEnr4: req.body.stdEnr4,
            profSirName: req.body.profSirName,
            Subject: req.body.Subject,
            HOD: req.body.hod,
            Principal: req.body.Principal,
            sem: req.body.sem,
        };
        outputDocument.setData(dataToAdd);

        try {
            outputDocument.render()
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });
            fs.writeFileSync(path.resolve(__dirname, `./public/files/civil/certificate/${req.body.stud_name}-civil-certificate.docx`), outputDocumentBuffer);
        }
        catch (error) {
            console.error(`ERROR Filling out Template:`);
            console.error(error)
        }

    } catch (error) {
        console.log("Error Loading Template:");
        console.log(error);
    }
    res.download(`./public/files/civil/certificate/${req.body.stud_name}-civil-certificate.docx`);
});



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port!`)
});
