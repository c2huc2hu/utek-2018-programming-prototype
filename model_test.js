const _ = require('lodash');
const part2 = require('./part2');

// sentences courtesy of http://thewessens.net/ClassroomApps/Main/gibberish.html?topic=probability&id=6
sentences = [
"01THISSENTENCEISEASYITSREALENGLISHWORDSSOITMATCHESFREQUENCYANDSTUFFTHEREARELOTSOF",
"02GAZELLESGRAZINGZEBRAQUIZZICALEQUALLYZESTRIVETQUICKZENAMAZINGZIGZAGPIZZAKUMQUATB",
"03CESTENFRANCAISCESTMOINSANGLAISTOUJOURSFRAISJESUISUNPIZZAQUESTCEQUECESTILFAUTPEN",
"04LOREMIPSUMDOLORSITAMETCONSECTETURADIPISICINGELITSEDDOEIUSMODTEMPORINCIDIDUNTUTL",
"05EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
"06WWGEVDOFGRREGHEWIOFSDIJIREAOFJEWIAOGHREIOSDJWESELOFJEWALFHWEUIFAIFHWEAIFUEWALFH",
"10INAHANDANDATHOUSANDTIMESALLHEMEANTTOTHEMERETHEONCEMOREANDIFISAWHERINYOUROWNWAYO",
"11ABOUTSAWBOYSHOULDANDACAMEANDBYANOTHERSCHAISEMOMENTINWRITINGSANKIANDINTERPOSEDMO",
"12BESOMETHINGTHATITSANDTOHAVEHAVISHAMWITHHERBERTANDPUTTOHADREASONTOGOTOMISSHANDSA",
"13FROMANDASTUMBLETHEMANDTOTHEBLEDISTENTOFBEARDIDISAIDTIMESSOINTHEFORFORTHEFELLAND",
"14DONBUTTOFROPANOTHERAYOUTEVINMAYFARETHATMUCHWOUGHTHEOVERSUCTGREMYHEANDEREDNTLAHO",
"15NOIVIOITANDIDGHHEADBAMISILINDPLLWSSOONEWACKITIDINTORFILAVEMENGEHHADRSKETARARAMI",
"16BIOEALFKEIFHSETUIYEUSTIEGDWRASASDRTOCEIKTIONVTRHLUTLDODHERTICEALEATOCMSPRLORESM",
"17OGTXEZMXGBKRHEFDESFXOGGGIIQDAOWOBVPKRFKQSNXVMQLLRQKRGYPVJVBWARZHMULUSUJGGIRYOHP",
];

const fs = require('fs');
const lambda = [1e-6,1e-5,1e-4,1e-3,1e-2,1e-1,0.9];
let ptb = fs.readFileSync('./ptb.train.txt').toString();

ptb = ptb.replace(/<unk> /g, '').replace(/N /g, ''); // get rid of added tokens
let ptb_counts = part2.get_counts(ptb, true);
let score_fcn = _.partialRight(part2.log_prob, ptb_counts, lambda);
console.log(_.sortBy(sentences, score_fcn).join('\n'));
sentences.forEach(sent => {
	console.log(sent, score_fcn(sent));
});