// hearts background
const heartsEl = document.getElementById('hearts');
for(let i=0;i<24;i++){
  const h = document.createElement('div');
  h.className='heart';
  h.textContent = Math.random()>0.5 ? '❤️' : '💙';
  h.style.left = Math.random()*100+'vw';
  h.style.animationDuration = (6+Math.random()*6)+'s';
  h.style.animationDelay = (Math.random()*6)+'s';
  heartsEl.appendChild(h);
}

// "não" foge do clique
const noBtn = document.getElementById('noBtn');
const pleaText = document.getElementById('pleaText');
const pleas = ["Só uma pergunta rápida...","Tem certeza?","Por favor!! 🥺","Eu imploro..."];
let pleaIndex = 0;
function dodge(){
  const phone = noBtn.closest('.screen').getBoundingClientRect();
  const maxX = phone.width - 90;
  const maxY = phone.height - 260;
  noBtn.style.position='absolute';
  noBtn.style.left = Math.max(10,Math.random()*maxX)+'px';
  noBtn.style.top = (140+Math.random()*maxY)+'px';
  pleaIndex = Math.min(pleaIndex+1, pleas.length-1);
  pleaText.textContent = pleas[pleaIndex];
}
noBtn.addEventListener('mouseenter', dodge);
noBtn.addEventListener('touchstart', function(e){ e.preventDefault(); dodge(); }, {passive:false});
noBtn.addEventListener('click', dodge);

let chosenName="", chosenDate="", chosenTime="19:00", chosenFood="";

function goStep(n){
  document.querySelectorAll('.step').forEach(s=>s.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
}

function confirmName(){
  const val = document.getElementById('nameInput').value.trim();
  chosenName = val || "Alguém especial";
  document.getElementById('celebTitle').textContent = `Tô contigo, ${chosenName}! ❤️`;
  goStep(3);
}

function confirmDate(){
  chosenDate = document.getElementById('dateInput').value || "a combinar";
  chosenTime = document.getElementById('timeInput').value || "19:00";
  goStep(5);
}

const surpriseBox = document.getElementById('surpriseBox');
document.getElementById('foodGrid').addEventListener('click', (e)=>{
  const food = e.target.closest('.food');
  if(!food) return;
  document.querySelectorAll('.food').forEach(f=>f.classList.remove('selected'));
  food.classList.add('selected');
  chosenFood = food.dataset.v;
  surpriseBox.style.display = (chosenFood === 'Surpresa') ? 'block' : 'none';
});

async function sendTelegramNotification(text){
  if(TELEGRAM_BOT_TOKEN.startsWith("COLOQUE") || TELEGRAM_CHAT_ID.startsWith("COLOQUE")){
    return { ok:false, reason:"not_configured" };
  }
  try{
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
    });
    return { ok: res.ok };
  }catch(err){
    return { ok:false, reason:"network" };
  }
}

async function finish(){
  const dataFmt = chosenDate!=="a combinar" && chosenDate
    ? new Date(chosenDate+'T00:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'})
    : "a combinar";

  let foodLabel = chosenFood || "surpresa";
  if(chosenFood === 'Surpresa'){
    const texto = document.getElementById('surpriseText').value.trim();
    foodLabel = texto ? `Surpresa: ${texto}` : "Surpresa (a definir)";
  }

  document.getElementById('summary').innerHTML =
    `👤 ${chosenName}<br>📅 ${dataFmt}<br>🕒 ${chosenTime}<br>🍽️ ${foodLabel}`;

  const msg = `💌 Date confirmado!\nNome: ${chosenName}\nData: ${dataFmt}\nHorário: ${chosenTime}\nOpção: ${foodLabel}`;
  await sendTelegramNotification(msg);

  goStep(6);
}