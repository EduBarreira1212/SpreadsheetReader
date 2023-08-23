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

async function PostData(data = {}) {
    let response = await fetch(url,{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

async function TrackData() {
    let users = await ReadWorkSheet();
    for (const user of users) {
        await PostData(user);
        console.log(user);
    }
    console.log("Sucess!!");
}

TrackData();