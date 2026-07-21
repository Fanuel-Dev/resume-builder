(function(){
  const STORAGE_KEY = 'drafted-resume';

  let data = {
    name: '', title: '', email: '', phone: '', location: '', website: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    template: 'modern',
    accent: '#2b6777'
  };

  const $ = id => document.getElementById(id);
  const fName = $('fName'), fTitle = $('fTitle'), fEmail = $('fEmail'), fPhone = $('fPhone'),
        fLocation = $('fLocation'), fWebsite = $('fWebsite'), fSummary = $('fSummary');
  const experienceList = $('experienceList'), educationList = $('educationList');
  const skillInput = $('skillInput'), addSkillBtn = $('addSkillBtn'), skillChips = $('skillChips');
  const addExperienceBtn = $('addExperience'), addEducationBtn = $('addEducation');
  const templateToggle = $('templateToggle');
  const accentSwatches = $('accentSwatches');
  const exportBtn = $('exportBtn');
  const resumePage = $('resumePage');

  function uid(){ return 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
  function escapeHtml(str){ const d = document.createElement('div'); d.textContent = str || ''; return d.innerHTML; }

  async function loadData(){
    try {
      const res = await window.storage.get(STORAGE_KEY, false);
      if (res && res.value) data = Object.assign(data, JSON.parse(res.value));
    } catch(e) { /* no saved data yet */ }
    hydrateForm();
    renderExperience();
    renderEducation();
    renderSkills();
    renderTemplateToggle();
    renderAccent();
    renderPreview();
  }

  let saveTimer = null;
  function persist(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      try { await window.storage.set(STORAGE_KEY, JSON.stringify(data), false); }
      catch(e) { console.error('Could not save resume', e); }
    }, 250);
  }

  function hydrateForm(){
    fName.value = data.name; fTitle.value = data.title; fEmail.value = data.email;
    fPhone.value = data.phone; fLocation.value = data.location; fWebsite.value = data.website;
    fSummary.value = data.summary;
  }

  // ---- basic field bindings ----
  [[fName,'name'],[fTitle,'title'],[fEmail,'email'],[fPhone,'phone'],[fLocation,'location'],[fWebsite,'website'],[fSummary,'summary']]
    .forEach(([el,key]) => el.addEventListener('input', () => { data[key] = el.value; persist(); renderPreview(); }));

  // ---- experience ----
  function addExperience(entry){
    data.experience.push(entry || { id: uid(), role: '', company: '', start: '', end: '', current: false, bullets: '' });
    persist(); renderExperience(); renderPreview();
  }

  function renderExperience(){
    experienceList.innerHTML = data.experience.map(exp => `
      <div class="entry" data-id="${exp.id}">
        <button class="entry-del" data-action="del" title="Remove">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="field-row">
          <div class="field"><label>Role</label><input type="text" data-field="role" value="${escapeHtml(exp.role)}" placeholder="Senior Designer"></div>
          <div class="field"><label>Company</label><input type="text" data-field="company" value="${escapeHtml(exp.company)}" placeholder="Acme Co."></div>
        </div>
        <div class="field-row">
          <div class="field"><label>Start</label><input type="month" data-field="start" value="${escapeHtml(exp.start)}"></div>
          <div class="field"><label>End</label><input type="month" data-field="end" value="${escapeHtml(exp.end)}" ${exp.current ? 'disabled' : ''}></div>
        </div>
        <label class="check-row"><input type="checkbox" data-field="current" ${exp.current ? 'checked' : ''}> Currently work here</label>
        <div class="field" style="margin-top:12px;">
          <label>Highlights (one per line)</label>
          <textarea data-field="bullets" rows="3" placeholder="Led a redesign that increased conversion 18%">${escapeHtml(exp.bullets)}</textarea>
        </div>
      </div>
    `).join('');

    experienceList.querySelectorAll('.entry').forEach(entryEl => {
      const id = entryEl.dataset.id;
      const exp = data.experience.find(e => e.id === id);
      entryEl.querySelector('[data-action="del"]').addEventListener('click', () => {
        data.experience = data.experience.filter(e => e.id !== id);
        persist(); renderExperience(); renderPreview();
      });
      entryEl.querySelectorAll('[data-field]').forEach(input => {
        const field = input.dataset.field;
        const evt = input.type === 'checkbox' ? 'change' : 'input';
        input.addEventListener(evt, () => {
          if (field === 'current') {
            exp.current = input.checked;
            renderExperience();
          } else {
            exp[field] = input.value;
          }
          persist(); renderPreview();
        });
      });
    });
  }

  // ---- education ----
  function addEducation(entry){
    data.education.push(entry || { id: uid(), school: '', degree: '', start: '', end: '' });
    persist(); renderEducation(); renderPreview();
  }

  function renderEducation(){
    educationList.innerHTML = data.education.map(ed => `
      <div class="entry" data-id="${ed.id}">
        <button class="entry-del" data-action="del" title="Remove">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="field"><label>School</label><input type="text" data-field="school" value="${escapeHtml(ed.school)}" placeholder="University of Texas"></div>
        <div class="field"><label>Degree</label><input type="text" data-field="degree" value="${escapeHtml(ed.degree)}" placeholder="B.A. Graphic Design"></div>
        <div class="field-row">
          <div class="field"><label>Start</label><input type="month" data-field="start" value="${escapeHtml(ed.start)}"></div>
          <div class="field"><label>End</label><input type="month" data-field="end" value="${escapeHtml(ed.end)}"></div>
        </div>
      </div>
    `).join('');

    educationList.querySelectorAll('.entry').forEach(entryEl => {
      const id = entryEl.dataset.id;
      const ed = data.education.find(e => e.id === id);
      entryEl.querySelector('[data-action="del"]').addEventListener('click', () => {
        data.education = data.education.filter(e => e.id !== id);
        persist(); renderEducation(); renderPreview();
      });
      entryEl.querySelectorAll('[data-field]').forEach(input => {
        input.addEventListener('input', () => {
          ed[input.dataset.field] = input.value;
          persist(); renderPreview();
        });
      });
    });
  }

  // ---- skills ----
  function addSkill(){
    const val = skillInput.value.trim();
    if (!val) return;
    if (!data.skills.includes(val)) data.skills.push(val);
    skillInput.value = '';
    persist(); renderSkills(); renderPreview();
  }
  addSkillBtn.addEventListener('click', addSkill);
  skillInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } });

  function renderSkills(){
    skillChips.innerHTML = data.skills.map(s => `
      <span class="chip">${escapeHtml(s)}<button data-skill="${escapeHtml(s)}" title="Remove">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button></span>
    `).join('');
    skillChips.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        data.skills = data.skills.filter(s => s !== btn.dataset.skill);
        persist(); renderSkills(); renderPreview();
      });
    });
  }

  // ---- add buttons ----
  addExperienceBtn.addEventListener('click', () => addExperience());
  addEducationBtn.addEventListener('click', () => addEducation());

  // ---- template + accent ----
  function renderTemplateToggle(){
    templateToggle.querySelectorAll('button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tmpl === data.template);
    });
  }
  templateToggle.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      data.template = btn.dataset.tmpl;
      renderTemplateToggle();
      persist(); renderPreview();
    });
  });

  function renderAccent(){
    accentSwatches.querySelectorAll('.swatch').forEach(sw => {
      sw.classList.toggle('selected', sw.dataset.color === data.accent);
    });
  }
  accentSwatches.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      data.accent = sw.dataset.color;
      renderAccent();
      persist(); renderPreview();
    });
  });

  // ---- date formatting ----
  function fmtMonth(val){
    if (!val) return '';
    const [y,m] = val.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const idx = parseInt(m,10) - 1;
    return (months[idx] || '') + ' ' + y;
  }

  // ---- preview ----
  function renderPreview(){
    resumePage.className = 'resume-page tmpl-' + data.template;
    resumePage.style.setProperty('--r-accent', data.accent);

    const contactBits = [data.email, data.phone, data.location, data.website].filter(Boolean);

    const expHtml = data.experience.length ? data.experience.map(exp => {
      const dateStr = [fmtMonth(exp.start), exp.current ? 'Present' : fmtMonth(exp.end)].filter(Boolean).join(' — ');
      const bulletLines = (exp.bullets || '').split('\n').map(l => l.trim()).filter(Boolean);
      return `
        <div class="r-entry">
          <div class="r-entry-top">
            <span class="r-entry-role">${escapeHtml(exp.role) || 'Role'}${exp.company ? ', ' + escapeHtml(exp.company) : ''}</span>
            <span class="r-entry-dates">${escapeHtml(dateStr)}</span>
          </div>
          ${bulletLines.length ? `<ul class="r-bullets">${bulletLines.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
        </div>`;
    }).join('') : '<p class="r-empty">Add a position to see it here.</p>';

    const eduHtml = data.education.length ? data.education.map(ed => {
      const dateStr = [fmtMonth(ed.start), fmtMonth(ed.end)].filter(Boolean).join(' — ');
      return `
        <div class="r-entry">
          <div class="r-entry-top">
            <span class="r-entry-role">${escapeHtml(ed.school) || 'School'}</span>
            <span class="r-entry-dates">${escapeHtml(dateStr)}</span>
          </div>
          ${ed.degree ? `<div class="r-entry-org">${escapeHtml(ed.degree)}</div>` : ''}
        </div>`;
    }).join('') : '<p class="r-empty">Add a school to see it here.</p>';

    const skillsHtml = data.skills.length
      ? `<div class="r-skills">${data.skills.map(s => `<span class="r-skill-chip">${escapeHtml(s)}</span>`).join('')}</div>`
      : '<p class="r-empty">Add a few skills to see them here.</p>';

    resumePage.innerHTML = `
      <div class="r-name">${escapeHtml(data.name) || 'Your Name'}</div>
      <div class="r-title">${escapeHtml(data.title) || 'Your headline'}</div>
      ${contactBits.length ? `<div class="r-contact">${contactBits.map(b => `<span>${escapeHtml(b)}</span>`).join('')}</div>` : ''}

      ${data.summary ? `<div class="r-section"><h3>Summary</h3><p class="r-summary">${escapeHtml(data.summary)}</p></div>` : ''}

      <div class="r-section"><h3>Experience</h3>${expHtml}</div>
      <div class="r-section"><h3>Education</h3>${eduHtml}</div>
      <div class="r-section"><h3>Skills</h3>${skillsHtml}</div>
    `;
  }

  exportBtn.addEventListener('click', () => window.print());

  loadData();
})();