'use strict';

// 하루잠: network-free, account-free Korean CBT-I education prototype.
// Educational information only, not diagnosis, a clinical prescription, or an approved medical device.
const STORAGE_KEY = 'harujam_v1';
const LESSONS = [
  {
    title:'잠을 이해하는 첫 주',subtitle:'불면증과 수면의 원리',
    paragraphs:[
      '불면증은 잠을 잘 기회가 있어도 잠들기 어렵거나, 자주 깨거나, 너무 일찍 깨어 일상에 불편을 겪는 상태입니다. 잠을 잘 자려는 노력 자체가 긴장과 걱정을 키우기도 합니다.',
      '잠에는 두 가지 큰 힘이 작용합니다. 오래 깨어 있을수록 쌓이는 ‘수면압’과 일정한 시간대에 졸리고 깨어나도록 돕는 ‘생체시계’입니다. 하루 이틀의 수면 상태보다 전체 패턴을 살펴보는 것이 중요합니다.',
      'CBT-I는 수면에 관한 생각과 행동을 함께 다룹니다. 단순한 수면위생 수칙만 모아둔 프로그램이 아니며, 효과가 서서히 나타날 수 있습니다.'
    ],bullets:['지금 내 수면에서 가장 힘든 점 한 가지를 적어 보세요.','매일 잠의 질을 평가하기보다 낮의 활동과 컨디션도 살펴보세요.'],
    practice:'이번 주에는 잠을 ‘반드시 잘 자야 한다’는 목표 대신, 내 수면 패턴을 알아가는 목표를 세워 보세요.',
    quiz:'CBT-I의 핵심에 가장 가까운 설명은?',choices:['수면제 복용 시간을 정하는 방법','수면을 방해하는 생각과 행동을 함께 다루는 방법','매일 8시간씩 침대에 누워 있도록 강제하는 방법'],correct:1,why:'CBT-I는 인지적·행동적 요소를 함께 다루는 근거 기반 접근입니다.'
  },
  {
    title:'수면일지로 패턴 발견하기',subtitle:'기록과 수면효율 이해',
    paragraphs:[
      '수면일지는 스마트워치의 수면 단계와 달리, 잠든 시간과 밤중 각성 등을 스스로 추정해 기록합니다. 보통 아침에 작성하며, 모든 시간을 분 단위로 정확히 맞출 필요는 없습니다.',
      '침대에 있었던 시간(TIB)과 추정 수면시간(TST)을 기록하면 수면효율(SE = TST ÷ TIB × 100)을 살펴볼 수 있습니다. 단, 수면효율 하나로 건강이나 불면증 정도를 판단할 수는 없습니다.',
      '기록을 위해 밤중에 시계를 자주 보면 오히려 긴장할 수 있습니다. 잠에서 깬 아침, 기억나는 만큼 대략적으로 기입해도 충분합니다.'
    ],bullets:['아침에 1~3분 정도만 기록해 보세요.','몇 일의 기록을 모은 뒤 공통된 패턴을 확인해 보세요.'],
    practice:'수면일지 메뉴에서 오늘 아침의 수면을 한 번 기록해 보세요. 수면시간은 추정치로 충분합니다.',
    quiz:'수면일지를 적절히 쓰는 방법은?',choices:['깨어날 때마다 반드시 시간을 확인한다','아침에 전날 밤을 대략적으로 회상해 기록한다','수면효율이 낮으면 곧바로 취침 시간을 크게 줄인다'],correct:1,why:'정확한 시계 확인보다는 부담 없는 아침 기록이 좋으며, 수면시간 제한은 개별 안전 평가가 필요합니다.'
  },
  {
    title:'침대와 잠을 다시 연결하기',subtitle:'자극 조절의 기본',
    paragraphs:[
      '잠이 오지 않는 채 침대에서 오래 걱정하는 일이 반복되면, 침대가 휴식보다 각성과 긴장에 연결될 수 있습니다. 자극 조절은 침대와 잠 사이의 연관성을 회복하기 위한 행동 전략입니다.',
      '가능하면 졸릴 때 침대에 눕고, 누워 있는데 잠들기 어렵거나 짜증·긴장이 커지면 잠시 일어나 조도가 낮은 곳에서 조용한 활동을 하세요. 다시 졸리면 침대로 돌아옵니다. 시계를 보며 분 단위 규칙을 지킬 필요는 없습니다.',
      '매일 비슷한 시간에 일어나는 것은 생체시계를 돕습니다. 다만 운전 중 졸거나 낙상 위험이 있는 사람에게는 안전이 우선입니다.'
    ],bullets:['잠이 오지 않을 때 할 수 있는 안전하고 지루한 활동을 미리 정해 두세요.','침대에서 스트레스 높은 업무나 끝없는 스크롤을 줄여 보세요.'],
    practice:'잠들기 어려울 때 사용할 ‘조용한 대안 활동’ 두 가지를 정해 보세요. 예: 종이책 몇 페이지 읽기, 차분한 음악 듣기.',
    quiz:'침대에 누웠는데 계속 긴장되고 잠이 오지 않는다면?',choices:['잠이 올 때까지 무조건 누워 있는다','시계를 자주 확인한다','잠시 일어나 조용하게 시간을 보내고 졸릴 때 돌아온다'],correct:2,why:'졸음과 침대의 연결을 강화하려는 것이 자극 조절의 목적입니다.'
  },
  {
    title:'수면압과 수면창 이해하기',subtitle:'시간 조정은 안전하게',
    paragraphs:[
      '수면시간 제한 또는 수면창 조정은 침대에 오래 깨어 있는 시간을 줄여 수면을 더 응집시키려는 CBT-I의 행동 기법입니다. 전문가가 여러 날의 수면일지와 개인 상황을 검토한 뒤 적용하기도 합니다.',
      '이 기법은 초기에 낮 졸림, 집중력 저하, 기분 변화를 유발할 수 있습니다. 양극성장애, 발작 질환, 심한 주간 졸림, 안전 민감 업무 등의 경우 특히 주의가 필요합니다.',
      '이 앱은 학습을 위해 개념만 설명합니다. 개인에게 맞는 취침·기상 시각이나 최소 수면시간을 계산·처방하지 않습니다. 먼저 충분한 수면 기회를 확보하고 안전에 집중하세요.'
    ],bullets:['수면효율이 낮다고 스스로 수면시간을 급격히 줄이지 마세요.','충분한 수면 기회와 일정한 생활 리듬을 우선 생각해 보세요.'],
    practice:'최근 수면일지를 살펴보되, 수치를 성적처럼 평가하지 않는 연습을 해보세요. 안전한 시간 조정이 필요한지는 전문가에게 상담할 수 있습니다.',
    quiz:'수면효율이 낮게 나왔을 때 올바른 대처는?',choices:['당장 침대에 있는 시간을 절반으로 줄인다','여러 날의 경향을 살피고 수면시간 제한은 안전 평가 후 결정한다','졸음을 참으며 운전해도 된다'],correct:1,why:'개별 수면시간 제한은 부작용과 금기 가능성이 있어 신중하게 적용해야 합니다.'
  },
  {
    title:'걱정과 생각을 유연하게 다루기',subtitle:'인지 재구성과 걱정 시간',
    paragraphs:[
      '“오늘 잠을 못 자면 내일은 모든 일이 망가질 거야”처럼 단정하는 생각은 불안과 각성을 높일 수 있습니다. 생각을 억지로 지우거나 낙관적으로 바꾸는 것이 아니라, 다양한 가능성을 균형 있게 살피는 것이 중요합니다.',
      '예를 들어 “피곤할 수는 있지만, 예전에 피곤한 날도 중요한 일을 해낸 적이 있다”처럼 사실에 맞는 문장을 만들 수 있습니다.',
      '잠자리에 들기 몇 시간 전 걱정을 짧게 적고, 내가 바꿀 수 있는 행동 하나만 정해두는 것도 도움이 될 수 있습니다. 밤에는 문제 해결을 잠시 미뤄도 됩니다.'
    ],bullets:['자동으로 떠오르는 수면 관련 생각을 하나 적어 보세요.','그 생각을 뒷받침하는 근거와 반대 근거를 모두 살펴보세요.'],
    practice:'연습 도구의 ‘잠에 대한 생각 다시 보기’를 활용해 균형 잡힌 문장을 하나 작성해 보세요.',
    quiz:'균형 잡힌 생각의 예로 적절한 것은?',choices:['오늘 못 자면 모든 게 끝이다','무조건 완벽하게 잘 잘 것이다','내일 피곤할 수 있지만 내가 대처할 방법도 있다'],correct:2,why:'무조건적인 낙관보다 현실적이고 유연한 사고가 목표입니다.'
  },
  {
    title:'긴장을 풀고 변화를 이어가기',subtitle:'이완과 재발 예방',
    paragraphs:[
      '호흡, 근육 이완, 가벼운 스트레칭은 긴장을 낮추는 데 도움이 될 수 있습니다. 다만 이완을 반드시 잠들기 위한 ‘성공 시험’으로 만들 필요는 없습니다.',
      '잠은 매일 똑같지 않습니다. 스트레스나 여행 등으로 잠이 흐트러질 때도 한두 밤의 결과에 과도하게 반응하기보다 도움이 되었던 습관을 차분히 다시 시도해 보세요.',
      '오랫동안 불면이 지속되거나 낮 기능에 큰 지장이 있다면 전문가의 평가와 구조화된 CBT-I 치료가 도움이 될 수 있습니다.'
    ],bullets:['나에게 도움이 되었던 실천 한 가지를 정리해 보세요.','수면이 나빠지는 날을 위한 나만의 차분한 대처 계획을 만들어 보세요.'],
    practice:'연습 도구에서 1분 호흡을 해 보거나, 도움이 되었던 습관 세 가지를 적어 보세요.',
    quiz:'수면이 나빴던 밤 다음날 적절한 생각은?',choices:['학습한 모든 내용이 실패했다','일시적인 변화일 수 있으니 패턴을 살피고 실천을 이어간다','잠을 만회하려고 무리하게 잠자는 시간을 자주 바꾼다'],correct:1,why:'수면 변동은 자연스러울 수 있습니다. 장기적인 변화와 일상 기능을 함께 살펴보세요.'
  }
];

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initial = () => ({version:1,completed:[],quizPassed:[],logs:[],thoughts:{worry:'',evidence:'',balanced:''}});
function getStored(){
  try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(!raw||typeof raw!=='object')return initial();return {
    version:1,
    completed:Array.isArray(raw.completed)?raw.completed.filter(i=>Number.isInteger(i)&&i>=0&&i<6):[],
    quizPassed:Array.isArray(raw.quizPassed)?raw.quizPassed.filter(i=>Number.isInteger(i)&&i>=0&&i<6):[],
    logs:Array.isArray(raw.logs)?raw.logs.filter(isValidStoredLog).slice(-1000):[],
    thoughts:raw.thoughts&&typeof raw.thoughts==='object'?{worry:String(raw.thoughts.worry||'').slice(0,800),evidence:String(raw.thoughts.evidence||'').slice(0,800),balanced:String(raw.thoughts.balanced||'').slice(0,800)}:initial().thoughts
  };}catch(e){return initial();}
}
function isValidStoredLog(l){const t=l&&validInterval(l.bed,l.out);return !!l&&typeof l.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(l.date)&&/^\d\d:\d\d$/.test(l.bed||'')&&/^\d\d:\d\d$/.test(l.out||'')&&['latency','wake','early','feel'].every(k=>Number.isFinite(Number(l[k]))&&Number(l[k])>=0&&Number(l[k])<=600)&&typeof(l.memo??'')==='string'&&t>=120&&t<=960&&(Number(l.latency)+Number(l.wake)+Number(l.early))<t;}
let data=getStored();
let currentPage='home';
let notifyTimer;
function notify(message,isError=false){const bar=$('notification');bar.textContent=message;bar.hidden=false;bar.classList.toggle('error',isError);clearTimeout(notifyTimer);notifyTimer=setTimeout(()=>bar.hidden=true,5200);}
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));return true;}catch(e){notify('기기에 저장할 수 없습니다. 저장 공간 또는 브라우저 설정을 확인해 주세요.',true);return false;}}
function localToday(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function toMinutes(s){if(!/^\d{2}:\d{2}$/.test(s||''))return NaN;const [h,m]=s.split(':').map(Number);return h<24&&m<60?h*60+m:NaN;}
function validInterval(bed,out){const b=toMinutes(bed),o=toMinutes(out);if(!Number.isFinite(b)||!Number.isFinite(o))return 0;return (o-b+1440)%1440;}
function metrics(l){const tib=validInterval(l.bed,l.out);const awake=Number(l.latency)+Number(l.wake)+Number(l.early);const tst=tib-awake;return {tib,tst,eff:tib>0?Math.round((tst/tib)*100):0};}
function fmtMinutes(n){if(!Number.isFinite(n))return '—';const m=Math.round(n);return `${Math.floor(m/60)}시간 ${m%60}분`;}
function go(page){if(!['home','learn','diary','insights','tools'].includes(page))return;currentPage=page;document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+page));document.querySelectorAll('[data-nav]').forEach(b=>{const active=b.dataset.nav===page;b.classList.toggle('active',active);b.setAttribute('aria-current',active?'page':'false');});window.scrollTo({top:0,behavior:'auto'});if(page==='home')renderHome();if(page==='insights')renderInsights();if(page==='diary')renderHistory();}
document.querySelectorAll('[data-nav]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.nav)));
document.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.jump)));

function renderHome(){const n=data.completed.length;$('home-progress-text').textContent=`${n} / 6 완료`;$('home-progress-bar').style.width=`${Math.round(n/6*100)}%`;document.querySelector('.progress-track').setAttribute('aria-valuenow',n);$('home-log-count').textContent=`${data.logs.length}일 기록`;const next=LESSONS.findIndex((_,i)=>!data.completed.includes(i));$('home-next-lesson').textContent=next===-1?'6주 학습 완료!':`${next+1}주차 · ${LESSONS[next].title}`;}
function renderLessons(){const root=$('lesson-list');root.innerHTML=LESSONS.map((l,i)=>{
 const done=data.completed.includes(i),passed=data.quizPassed.includes(i);
 return `<details class="lesson-card" id="lesson-${i}"><summary class="lesson-top ${done?'done':''}"><span class="lesson-number">${done?'✓':String(i+1).padStart(2,'0')}</span><span class="lesson-title"><small>WEEK ${String(i+1).padStart(2,'0')} ${done?' · 학습 완료':''}</small><h2>${esc(l.title)}</h2><p>${esc(l.subtitle)}</p></span><span class="lesson-arrow" aria-hidden="true">⌄</span></summary><div class="lesson-body"><h3>이번 주에 배울 내용</h3>${l.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<h3>오늘부터 해볼 행동</h3><ul>${l.bullets.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><div class="practice-box"><strong>🌱 작은 실천</strong><p>${esc(l.practice)}</p></div><div class="quiz-box"><strong>이해도 확인 · ${esc(l.quiz)}</strong><div class="quiz-options">${l.choices.map((c,j)=>`<button type="button" class="quiz-option" data-week="${i}" data-answer="${j}">${j+1}. ${esc(c)}</button>`).join('')}</div><p class="quiz-feedback" id="quiz-feedback-${i}" aria-live="polite">${passed?'이해도 확인을 완료했습니다.':''}</p></div><button type="button" class="finish-button" data-complete="${i}" ${!passed?'disabled':''}>${done?'✓ 완료한 주차':'이번 주 학습 완료 표시'}</button></div></details>`;
 }).join('');
 root.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{
  const i=Number(btn.dataset.week),ans=Number(btn.dataset.answer),l=LESSONS[i];
  const feedback=$('quiz-feedback-'+i);
  if(ans===l.correct){feedback.textContent='✓ 맞았어요! '+l.why;if(!data.quizPassed.includes(i))data.quizPassed.push(i);persist();root.querySelector(`[data-complete="${i}"]`).disabled=false;}
  else feedback.textContent='한 번 더 생각해 보세요. 앞의 내용을 천천히 다시 읽어도 괜찮아요.';
 }));
 root.querySelectorAll('[data-complete]').forEach(btn=>btn.addEventListener('click',()=>{
  const i=Number(btn.dataset.complete);if(!data.quizPassed.includes(i))return;
  if(!data.completed.includes(i)){data.completed.push(i);persist();notify(`${i+1}주차 학습을 완료했어요!`);}else{notify('이미 완료한 주차입니다.');}
  const opened=Array.from(root.querySelectorAll('details[open]')).map(el=>el.id);renderLessons();opened.forEach(id=>{const el=$(id);if(el)el.open=true;});renderHome();
 }));
}

$('log-date').value=localToday();
$('diary-form').addEventListener('submit',event=>{
 event.preventDefault();
 const date=$('log-date').value,bed=$('log-bed').value,out=$('log-out').value;
 const latency=Number($('log-latency').value),wake=Number($('log-wake').value),early=Number($('log-early').value);
 const total=validInterval(bed,out);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>localToday()){notify('유효한 기상 날짜를 입력해 주세요. 미래 날짜는 저장하지 않습니다.',true);return;}
 if(total<120||total>960){notify('침대에 있던 시간이 2~16시간인 기록만 저장할 수 있습니다. 날짜를 넘긴 경우에도 시각을 확인해 주세요.',true);return;}
 if([latency,wake,early].some(v=>!Number.isFinite(v)||v<0||v>600)||latency+wake+early>=total){notify('깨어 있었던 총 시간이 침대에 있던 시간보다 짧아야 합니다.',true);return;}
 const newLog={date,bed,out,latency,wake,early,feel:Number($('log-feel').value),memo:$('log-memo').value.trim().slice(0,250)};
 data.logs=data.logs.filter(l=>l.date!==date);data.logs.push(newLog);
 if(!persist())return;
 notify(`${date} 수면일지를 저장했어요.`);renderHistory();renderHome();
 $('log-memo').value='';
});
function renderHistory(){const sorted=[...data.logs].sort((a,b)=>b.date.localeCompare(a.date));$('diary-count').textContent=`${sorted.length}개`;
 $('diary-history').innerHTML=sorted.length?sorted.map(l=>{const m=metrics(l);return `<article class="history-card"><div><h3>${esc(l.date)} · ${esc(fmtMinutes(m.tst))} 수면</h3><p>${esc(l.bed)} → ${esc(l.out)} · 추정 수면효율 ${m.eff}% · 컨디션 ${Number(l.feel)}/5${l.memo?'<br>'+esc(l.memo):''}</p></div><div class="history-actions"><button type="button" data-edit="${l.date}">수정</button><button type="button" data-delete="${l.date}">삭제</button></div></article>`;}).join(''):'<div class="empty">아직 기록이 없어요.<br>오늘 아침의 기억을 조금만 적어 보세요.</div>';
 $('diary-history').querySelectorAll('[data-edit]').forEach(btn=>btn.addEventListener('click',()=>{const l=data.logs.find(x=>x.date===btn.dataset.edit);if(!l)return;$('log-date').value=l.date;$('log-bed').value=l.bed;$('log-out').value=l.out;$('log-latency').value=l.latency;$('log-wake').value=l.wake;$('log-early').value=l.early;$('log-feel').value=l.feel;$('log-memo').value=l.memo;go('diary');$('diary-form').scrollIntoView({behavior:'smooth',block:'start'});notify('내용을 수정한 뒤 저장 버튼을 눌러주세요.');}));
 $('diary-history').querySelectorAll('[data-delete]').forEach(btn=>btn.addEventListener('click',()=>{if(!confirm(`${btn.dataset.delete} 기록을 삭제할까요?`))return;data.logs=data.logs.filter(l=>l.date!==btn.dataset.delete);persist();renderHistory();renderHome();notify('기록을 삭제했습니다.');}));
}
function renderInsights(){const sorted=[...data.logs].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,7).reverse();const M=sorted.map(metrics);const avg=key=>M.reduce((v,m)=>v+m[key],0)/M.length;
 $('stat-sleep').textContent=M.length?fmtMinutes(avg('tst')):'—';$('stat-eff').textContent=M.length?`${Math.round(avg('eff'))}%`:'—';$('stat-days').textContent=`${data.logs.length}일`;
 $('eff-chart').innerHTML=sorted.length?sorted.map((l,i)=>`<div class="bar-col"><span class="bar-value">${M[i].eff}%</span><div class="bar-fill" style="height:${Math.max(3,Math.min(M[i].eff,100)*1.65)}px" aria-label="${esc(l.date)} ${M[i].eff}%"></div><span class="bar-date">${esc(l.date.slice(5))}</span></div>`).join(''):'<div class="bar-empty">수면일지에 기록하면 이곳에 그래프가 표시됩니다.</div>';
}
const thoughts={worry:'thought-worry',evidence:'thought-evidence',balanced:'thought-balanced'};
Object.entries(thoughts).forEach(([key,id])=>$(id).value=data.thoughts[key]||'');
$('thought-form').addEventListener('submit',e=>{e.preventDefault();Object.entries(thoughts).forEach(([key,id])=>data.thoughts[key]=$(id).value.slice(0,800));if(persist())notify('생각 연습을 이 기기에 저장했어요.');});

let breathTimer=null;let breathElapsed=0;
function stopBreathing(completed=false){clearInterval(breathTimer);breathTimer=null;$('breath-orb').classList.remove('running');$('breath-button').textContent='1분 호흡 시작';$('breath-message').textContent=completed?'수고했어요 🌿':'잠시 쉬어가요';$('breath-status').textContent=completed?'1분 연습을 마쳤어요. 긴장이 줄지 않아도 괜찮습니다.':'시작을 누르면 1분 동안 호흡 흐름을 안내합니다.';}
$('breath-button').addEventListener('click',()=>{
 if(breathTimer){stopBreathing();return;}
 breathElapsed=0;$('breath-button').textContent='연습 중단';$('breath-orb').classList.add('running');
 const tick=()=>{const seconds=breathElapsed%10;const inhale=seconds<4;$('breath-message').textContent=inhale?'편하게 들이마셔요':'천천히 내쉬어요';$('breath-status').textContent=`남은 시간: ${60-breathElapsed}초 · 무리하지 말고 자연스럽게`;breathElapsed++;if(breathElapsed>60)stopBreathing(true);};tick();breathTimer=setInterval(tick,1000);
});

function triggerDownload(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
$('export-json').addEventListener('click',()=>triggerDownload(new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}),`harujam-backup-${localToday()}.json`));
$('export-csv').addEventListener('click',()=>{
 const heads=['날짜','침대들어간시각','침대나온시각','입면소요분','밤중각성분','최종각성후분','침대시간분','추정수면시간분','추정수면효율','컨디션1-5','메모'];
 const rows=data.logs.map(l=>{const m=metrics(l);return [l.date,l.bed,l.out,l.latency,l.wake,l.early,m.tib,m.tst,m.eff,l.feel,l.memo]});
 const encode=v=>'"'+String(v??'').replaceAll('"','""').replace(/^[=+\-@\t\r]/,'\u200b$&')+'"';
 const csv='\ufeff'+[heads,...rows].map(row=>row.map(encode).join(',')).join('\r\n');triggerDownload(new Blob([csv],{type:'text/csv;charset=utf-8'}),`harujam-sleep-diary-${localToday()}.csv`);
});
$('import-json').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{
 if(file.size>1_000_000)throw new Error('파일 크기가 너무 큽니다 (1MB 초과).');const parsed=JSON.parse(await file.text());
 if(!parsed||parsed.version!==1||!Array.isArray(parsed.logs)||!Array.isArray(parsed.completed)||!Array.isArray(parsed.quizPassed))throw new Error('지원하는 하루잠 백업 파일이 아닙니다.');
 if(!confirm('현재 기록을 백업 파일의 기록으로 대체할까요?'))return;
 const prev=data;data={...initial(),...parsed};data.logs=data.logs.filter(isValidStoredLog).slice(-1000);data.completed=data.completed.filter(i=>Number.isInteger(i)&&i>=0&&i<6);data.quizPassed=data.quizPassed.filter(i=>Number.isInteger(i)&&i>=0&&i<6);data.thoughts={worry:String(data.thoughts?.worry||'').slice(0,800),evidence:String(data.thoughts?.evidence||'').slice(0,800),balanced:String(data.thoughts?.balanced||'').slice(0,800)};
 if(!persist()){data=prev;return;}Object.entries(thoughts).forEach(([k,id])=>$(id).value=data.thoughts[k]);renderEverything();notify('백업을 복원했어요.');
 }catch(err){notify(err.message||'파일을 읽지 못했습니다.',true);}finally{e.target.value='';}});
$('reset-data').addEventListener('click',()=>{if(!confirm('정말 모든 수면일지, 학습 진도와 생각 기록을 삭제할까요? 이 작업은 되돌릴 수 없습니다.'))return;data=initial();persist();Object.values(thoughts).forEach(id=>$(id).value='');$('diary-form').reset();$('log-date').value=localToday();renderEverything();notify('이 기기의 기록을 모두 삭제했습니다.');});
function renderEverything(){renderHome();renderLessons();renderHistory();renderInsights();}
renderEverything();
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
