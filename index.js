const credential = require("./credentials.json");
const arquivo = require("./arquivo.json");
const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets"
]

const jwt = new JWT({
    email: credential.client_email,
    key: credential.private_key,
    scopes: SCOPES,
});

async function GetDoc() {
    let doc = new GoogleSpreadsheet(arquivo.id, jwt);
    await doc.loadInfo();
    return doc;
}

async function ReadWorkSheet() {
    let sheet = (await GetDoc()).sheetsByIndex[0];
    let rows = await sheet.getRows();
    let users = rows.map(row => {
        return row.toObject();
    })
    return users;
}