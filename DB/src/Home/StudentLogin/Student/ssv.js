const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
	keyFile: 'key.json',
	scopes: [
		'https://www.googleapis.com/auth/spreadsheets',
		'https://www.googleapis.com/auth/drive.readonly',
		'https://www.googleapis.com/auth/drive',
 	],
});

const sheets = google.sheets({ version: 'v4', auth });

const S1 = "S1: Student Journal Pub";
const S2 = "S2: Student Conference Publication";
const S3 = "S3: Student Internships";
const S4 = "S4: Student Certifications";
const S5 = "S5: Student Workshops/Conf attended";
const S6 = "S6: Student NPTEL";
const S7 = "S7: Student Workshops Organized";
const S8 = "S8: Student Events Organized";
const S9 = "S9: Student Guest Lecutres Organized";
const S10 = "S10: Student Prof. Body";
const S11 = "S11: Student Awards";
const S12 = "S12: Student capabilities enhancement";
const S13 = "S13: Students Higher Edu.";
const S14 = "S14: Students Competitive Exams";
const S15 = "S15: Students Industry Visit";
const S16 = "S16: Students Social Service Programs";
const S17 = "S17: Students Leadership & Volunteering Activities";
const S18 = "S18: Student Co-curricular Activities & Extra curricular Activities Participation";

const S = [S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15,S16,S17,S18];
let res = {};

async function getSheetData(N) {
  try{
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1EYRfu4z0mw_j6wW3Y1eoq2K0G99pvaX0P6axRAu2wlI',
    range: N+'!A:Z',
  });

  const rows = response.data.values;
  const count = response.data.values.length;
  const headers = rows[0];
  const data = rows.slice(1);
  const result = data.map((row) =>
    row.reduce(
      (obj, value, i) => ({
        ...obj,
        [headers[i]]: value,
      }),
      {}
    )
  );
  const col = "Roll Number";
  result.sort((a, b) => {
    if (a[col] < b[col]) {
      return -1;
    }
    if (a[col] > b[col]) {
      return 1;
    }
    return 0;
  });
  var regno = result.map(obj => obj[col]);
    var len = regno.length;
    res[N] = len;
  }
catch{
    res[N] = 0;
}
}

function ssv() {
	var i;
  for(i=0;i<18;i++){
    getSheetData(S[i]).catch((err) => console.error(err));
  }
}
ssv();
async function call() {
  await Promise.all(S.map(getSheetData));
  console.log(res);
}
call();