/* ================================================================
   SmartData — Botão "Fale Conosco" com Dropdown + Modal Diagnóstico
   Incluir este script antes do </body> no site principal
   ================================================================ */

(function () {
  // ── 1. INJETAR CSS ──────────────────────────────────────────────
  const css = `
    /* Dropdown do botão "Fale Conosco" */
    .cta-nav-wrapper {
      position: relative;
      display: inline-block;
    }
    .cta-nav-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      min-width: 240px;
      background: #1e293b;
      border: 1px solid rgba(168,85,247,0.35);
      border-radius: 14px;
      padding: 8px;
      z-index: 9998;
      opacity: 0;
      transform: translateY(-8px) scale(0.97);
      pointer-events: none;
      transition: all 0.2s cubic-bezier(.34,1.56,.64,1);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(168,85,247,0.15);
    }
    .cta-nav-dropdown.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    .dropdown-arrow {
      position: absolute;
      top: -6px;
      right: 20px;
      width: 12px;
      height: 12px;
      background: #1e293b;
      border-left: 1px solid rgba(168,85,247,0.35);
      border-top: 1px solid rgba(168,85,247,0.35);
      transform: rotate(45deg);
      border-radius: 2px;
    }
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
      color: inherit;
    }
    .dropdown-item:hover {
      background: rgba(168,85,247,0.12);
    }
    .dropdown-item-icon {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      flex-shrink: 0;
    }
    .dropdown-item-icon.whatsapp {
      background: rgba(52,211,153,0.15);
      border: 1px solid rgba(52,211,153,0.25);
    }
    .dropdown-item-icon.diagnostico {
      background: rgba(168,85,247,0.15);
      border: 1px solid rgba(168,85,247,0.25);
    }
    .dropdown-item-text strong {
      display: block;
      font-size: 13.5px;
      font-weight: 700;
      color: #f1f5f9;
      line-height: 1.2;
    }
    .dropdown-item-text span {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 2px;
      display: block;
    }
    .dropdown-divider {
      height: 1px;
      background: rgba(148,163,184,0.08);
      margin: 4px 8px;
    }

    /* ── MODAL DIAGNÓSTICO ── */
    #diag-modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(2,6,23,0.92);
      backdrop-filter: blur(12px);
      z-index: 99999;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    #diag-modal-overlay.open {
      display: flex;
    }
    #diag-modal {
      background: #0f172a;
      border: 1px solid rgba(168,85,247,0.25);
      border-radius: 20px;
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(168,85,247,0.1);
      animation: diagModalIn 0.3s cubic-bezier(.34,1.56,.64,1);
      scrollbar-width: thin;
      scrollbar-color: rgba(168,85,247,0.3) transparent;
    }
    #diag-modal::-webkit-scrollbar { width: 5px; }
    #diag-modal::-webkit-scrollbar-track { background: transparent; }
    #diag-modal::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 3px; }
    @keyframes diagModalIn {
      from { opacity:0; transform: translateY(-20px) scale(0.96); }
      to   { opacity:1; transform: translateY(0) scale(1); }
    }
    .diag-modal-header {
      padding: 1.5rem 1.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: sticky;
      top: 0;
      background: #0f172a;
      z-index: 10;
      border-bottom: 1px solid rgba(148,163,184,0.06);
      padding-bottom: 1rem;
    }
    .diag-modal-title { font-size: 18px; font-weight: 800; color: #f1f5f9; font-family: 'Outfit', sans-serif; }
    .diag-modal-subtitle { font-size: 13px; color: #64748b; margin-top: 3px; }
    .diag-modal-close {
      background: none; border: none; color: #64748b; font-size: 22px;
      cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: all 0.2s;
      line-height: 1; margin-top: -2px; flex-shrink: 0;
    }
    .diag-modal-close:hover { background: rgba(148,163,184,0.1); color: #f1f5f9; }
    .diag-modal-body { padding: 1.25rem 1.5rem 1.5rem; }

    /* Progress */
    .diag-progress-bar {
      height: 3px; background: rgba(148,163,184,0.1);
      border-radius: 2px; margin-bottom: 1.5rem; overflow: hidden;
    }
    .diag-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      border-radius: 2px;
      transition: width 0.4s ease;
    }
    .diag-step-label {
      font-size: 11px; font-weight: 700; color: #a855f7;
      text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.25rem;
    }

    /* Form elements */
    .diag-section { display: none; }
    .diag-section.active { display: block; }
    .diag-section-title {
      font-size: 18px; font-weight: 700; color: #f1f5f9;
      margin-bottom: 5px; font-family: 'Outfit', sans-serif; line-height: 1.3;
    }
    .diag-section-desc {
      font-size: 13px; color: #64748b; margin-bottom: 1.5rem; line-height: 1.6;
    }
    .diag-field { margin-bottom: 1.1rem; }
    .diag-field label {
      display: block; font-size: 13px; font-weight: 600;
      color: #94a3b8; margin-bottom: 6px; font-family: 'Outfit', sans-serif;
    }
    .diag-field input, .diag-field select, .diag-field textarea {
      width: 100%; padding: 10px 13px;
      border: 1px solid rgba(148,163,184,0.12);
      border-radius: 10px; font-size: 13.5px; color: #f1f5f9;
      background: rgba(30,41,59,0.6); outline: none;
      transition: border 0.2s; font-family: 'Outfit', sans-serif;
    }
    .diag-field input:focus, .diag-field select:focus, .diag-field textarea:focus {
      border-color: rgba(168,85,247,0.6);
    }
    .diag-field select option { background: #1e293b; }
    .diag-field textarea { resize: vertical; min-height: 75px; }
    .diag-field .hint { font-size: 11.5px; color: #475569; margin-top: 4px; }

    /* Chips */
    .diag-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 4px; }
    .diag-chip {
      padding: 7px 14px; border-radius: 20px; font-size: 12.5px; cursor: pointer;
      border: 1px solid rgba(148,163,184,0.15);
      background: rgba(30,41,59,0.5); color: #94a3b8;
      transition: all 0.15s; user-select: none; font-family: 'Outfit', sans-serif;
    }
    .diag-chip:hover { border-color: rgba(168,85,247,0.5); color: #c4b5fd; }
    .diag-chip.sel {
      background: rgba(168,85,247,0.15);
      border-color: rgba(168,85,247,0.55);
      color: #c4b5fd; font-weight: 600;
    }

    /* Card grid */
    .diag-card-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(140px,1fr));
      gap: 9px; margin-top: 4px;
    }
    .diag-card-opt {
      border: 1px solid rgba(148,163,184,0.12);
      border-radius: 12px; padding: 14px 12px; cursor: pointer;
      transition: all 0.15s; text-align: center;
      background: rgba(30,41,59,0.5); color: #94a3b8;
      font-size: 13px; font-family: 'Outfit', sans-serif;
    }
    .diag-card-opt .card-icon { font-size: 22px; margin-bottom: 6px; }
    .diag-card-opt .card-label { font-weight: 600; font-size: 12.5px; }
    .diag-card-opt .card-desc { font-size: 11px; color: #475569; margin-top: 2px; }
    .diag-card-opt:hover { border-color: rgba(168,85,247,0.4); }
    .diag-card-opt.sel {
      border-color: rgba(168,85,247,0.6);
      background: rgba(168,85,247,0.1);
      color: #c4b5fd;
    }
    .diag-card-opt.sel .card-desc { color: #94a3b8; }

    /* Navigation */
    .diag-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; gap: 10px; }
    .diag-btn-back {
      background: none; border: 1px solid rgba(148,163,184,0.15);
      padding: 10px 20px; border-radius: 10px; font-size: 13.5px;
      color: #94a3b8; cursor: pointer; font-family: 'Outfit', sans-serif;
      transition: all 0.2s;
    }
    .diag-btn-back:hover { background: rgba(148,163,184,0.06); }
    .diag-btn-next {
      background: linear-gradient(135deg, #a855f7, #3b82f6);
      border: none; padding: 10px 28px; border-radius: 10px;
      font-size: 13.5px; color: white; cursor: pointer; font-weight: 700;
      font-family: 'Outfit', sans-serif; transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(168,85,247,0.3);
    }
    .diag-btn-next:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(168,85,247,0.4); }
    .diag-btn-next:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .diag-btn-generate {
      width: 100%;
      background: linear-gradient(135deg, #a855f7, #3b82f6);
      border: none; padding: 13px; border-radius: 12px;
      font-size: 14px; color: white; cursor: pointer; font-weight: 700;
      font-family: 'Outfit', sans-serif; margin-top: 1rem;
      transition: all 0.2s; box-shadow: 0 6px 20px rgba(168,85,247,0.35);
    }
    .diag-btn-generate:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(168,85,247,0.45); }

    /* Result */
    #diag-loading {
      text-align: center; padding: 2.5rem 1rem;
    }
    .diag-spinner {
      width: 44px; height: 44px;
      border: 3px solid rgba(168,85,247,0.2);
      border-top-color: #a855f7;
      border-radius: 50%;
      animation: diagSpin 0.9s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes diagSpin { to { transform: rotate(360deg); } }
    .diag-loading-text { font-size: 14px; color: #94a3b8; font-family: 'Outfit', sans-serif; }
    .diag-loading-sub { font-size: 12px; color: #475569; margin-top: 6px; }

    .diag-result-area { display: none; }
    .diag-result-intro { font-size: 13px; color: #64748b; margin-bottom: 1.25rem; line-height: 1.6; }
    .diag-plan-card {
      border-radius: 14px;
      border: 1.5px solid rgba(168,85,247,0.4);
      background: linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(59,130,246,0.06) 100%);
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    .diag-rec-badge {
      display: inline-block; padding: 4px 12px;
      background: rgba(168,85,247,0.2); border-radius: 20px;
      font-size: 11px; font-weight: 700; color: #c4b5fd;
      text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;
    }
    .diag-plan-name { font-size: 24px; font-weight: 800; color: #f1f5f9; font-family: 'Outfit', sans-serif; }
    .diag-plan-price { font-size: 28px; font-weight: 800; color: #a855f7; margin: 4px 0; }
    .diag-plan-price span { font-size: 14px; color: #64748b; font-weight: 400; }
    .diag-plan-divider { height: 1px; background: rgba(148,163,184,0.08); margin: 1rem 0; }
    .diag-feat-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
    .diag-feat-list li {
      font-size: 13px; color: #94a3b8; display: flex; align-items: flex-start; gap: 8px;
      font-family: 'Outfit', sans-serif;
    }
    .diag-feat-list li::before { content: '✓'; color: #a855f7; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .diag-alerta {
      margin-top: 1rem; padding: 10px 13px;
      background: rgba(59,130,246,0.1); border-radius: 10px;
      font-size: 12px; color: #93c5fd;
      border: 1px solid rgba(59,130,246,0.2);
    }
    .diag-alt-plan {
      border: 1px solid rgba(148,163,184,0.1);
      border-radius: 12px; padding: 1rem;
      background: rgba(30,41,59,0.5); margin-bottom: 1rem;
      display: flex; justify-content: space-between; align-items: center;
    }
    .diag-alt-name { font-size: 14px; font-weight: 700; color: #f1f5f9; font-family: 'Outfit', sans-serif; }
    .diag-alt-desc { font-size: 12px; color: #64748b; margin-top: 2px; }
    .diag-alt-price { font-size: 14px; font-weight: 700; color: #94a3b8; white-space: nowrap; }
    .diag-cta-final {
      display: flex; gap: 10px; margin-top: 1.25rem; flex-wrap: wrap;
    }
    .diag-cta-wa {
      flex: 1; background: linear-gradient(135deg, #1D9E75, #0F6E56);
      border: none; padding: 12px; border-radius: 11px;
      font-size: 13.5px; color: white; cursor: pointer; font-weight: 700;
      font-family: 'Outfit', sans-serif; transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(29,158,117,0.3); text-align: center;
      min-width: 160px;
    }
    .diag-cta-wa:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(29,158,117,0.4); }
    .diag-cta-back {
      background: transparent; border: 1px solid rgba(148,163,184,0.15);
      padding: 12px 18px; border-radius: 11px;
      font-size: 13px; color: #94a3b8; cursor: pointer; font-weight: 600;
      font-family: 'Outfit', sans-serif; transition: all 0.2s;
    }
    .diag-cta-back:hover { background: rgba(148,163,184,0.06); }
    .diag-success-save {
      display: flex; align-items: center; gap: 7px;
      font-size: 11.5px; color: #4ade80; margin-top: 0.75rem;
    }

    @media (max-width: 640px) {
      #diag-modal { border-radius: 16px; }
      .diag-modal-header { padding: 1.2rem 1.2rem 0.9rem; }
      .diag-modal-body { padding: 1rem 1.2rem 1.2rem; }
      .diag-card-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── 2. INJETAR HTML DO MODAL DIAGNÓSTICO ────────────────────────
  const modalHTML = `
  <div id="diag-modal-overlay" onclick="diagHandleOverlay(event)">
    <div id="diag-modal">
      <div class="diag-modal-header">
        <div>
          <div class="diag-modal-title">🔍 Diagnóstico Gratuito</div>
          <div class="diag-modal-subtitle">Responda em ~4 minutos e receba uma recomendação personalizada</div>
        </div>
        <button class="diag-modal-close" onclick="diagClose()">&#x2715;</button>
      </div>
      <div class="diag-modal-body">
        <div class="diag-progress-bar"><div class="diag-progress-fill" id="diag-prog" style="width:14%"></div></div>
        <div class="diag-step-label" id="diag-step-lbl">Passo 1 de 7 — Sua empresa</div>

        <!-- PASSO 1 -->
        <div class="diag-section active" id="ds1">
          <div class="diag-section-title">Fale sobre sua empresa</div>
          <div class="diag-section-desc">Vamos entender o contexto para personalizar a recomendação.</div>
          <div class="diag-field">
            <label>Nome da empresa *</label>
            <input type="text" id="diag-empresa" placeholder="Ex.: Distribuidora ABC">
          </div>
          <div class="diag-field">
            <label>Nome do responsável *</label>
            <input type="text" id="diag-responsavel" placeholder="Seu nome">
          </div>
          <div class="diag-field">
            <label>WhatsApp / Telefone *</label>
            <input type="tel" id="diag-whatsapp" placeholder="(81) 99999-9999">
          </div>
          <div class="diag-field">
            <label>E-mail</label>
            <input type="email" id="diag-email-lead" placeholder="seuemail@empresa.com.br">
          </div>
          <div class="diag-field">
            <label>Segmento / setor *</label>
            <select id="diag-segmento">
              <option value="">Selecione...</option>
              <option>Varejo / Comércio</option>
              <option>Indústria / Manufatura</option>
              <option>Distribuição / Logística</option>
              <option>Serviços / Consultoria</option>
              <option>Saúde / Farmácia</option>
              <option>Construção / Imobiliário</option>
              <option>Agronegócio</option>
              <option>Tecnologia / SaaS</option>
              <option>Educação</option>
              <option>Outro</option>
            </select>
          </div>
          <div class="diag-field">
            <label>Porte da empresa</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'porte','pequeno')">
                <div class="card-icon">🏪</div>
                <div class="card-label">Pequena</div>
                <div class="card-desc">Até 50 func.</div>
              </div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'porte','medio')">
                <div class="card-icon">🏢</div>
                <div class="card-label">Média</div>
                <div class="card-desc">50–500 func.</div>
              </div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'porte','grande')">
                <div class="card-icon">🏗️</div>
                <div class="card-label">Grande</div>
                <div class="card-desc">+500 func.</div>
              </div>
            </div>
          </div>
          <div class="diag-nav">
            <div></div>
            <button class="diag-btn-next" onclick="diagGoTo(2)">Próximo →</button>
          </div>
        </div>

        <!-- PASSO 2 -->
        <div class="diag-section" id="ds2">
          <div class="diag-section-title">Como você decide hoje?</div>
          <div class="diag-section-desc">Entender o processo atual nos ajuda a medir o impacto da solução.</div>
          <div class="diag-field">
            <label>Como as decisões são tomadas atualmente? (pode marcar mais de um)</label>
            <div class="diag-chips" id="diag-chips-decisao">
              <div class="diag-chip" onclick="diagTogChip(this,'decisao')">Intuição / experiência</div>
              <div class="diag-chip" onclick="diagTogChip(this,'decisao')">Planilhas Excel</div>
              <div class="diag-chip" onclick="diagTogChip(this,'decisao')">ERP / sistema interno</div>
              <div class="diag-chip" onclick="diagTogChip(this,'decisao')">Relatórios manuais</div>
              <div class="diag-chip" onclick="diagTogChip(this,'decisao')">Dashboard / BI já existe</div>
              <div class="diag-chip" onclick="diagTogChip(this,'decisao')">Não temos processo definido</div>
            </div>
          </div>
          <div class="diag-field">
            <label>Onde os dados ficam armazenados? (pode marcar mais de um)</label>
            <div class="diag-chips" id="diag-chips-dados">
              <div class="diag-chip" onclick="diagTogChip(this,'dados')">Planilhas / arquivos locais</div>
              <div class="diag-chip" onclick="diagTogChip(this,'dados')">ERP (SAP, TOTVS, etc.)</div>
              <div class="diag-chip" onclick="diagTogChip(this,'dados')">Google Sheets / Drive</div>
              <div class="diag-chip" onclick="diagTogChip(this,'dados')">Banco de dados SQL</div>
              <div class="diag-chip" onclick="diagTogChip(this,'dados')">CRM (Salesforce, Pipedrive)</div>
              <div class="diag-chip" onclick="diagTogChip(this,'dados')">E-commerce / marketplace</div>
              <div class="diag-chip" onclick="diagTogChip(this,'dados')">Não sei onde ficam</div>
            </div>
          </div>
          <div class="diag-nav">
            <button class="diag-btn-back" onclick="diagGoTo(1)">← Voltar</button>
            <button class="diag-btn-next" onclick="diagGoTo(3)">Próximo →</button>
          </div>
        </div>

        <!-- PASSO 3 -->
        <div class="diag-section" id="ds3">
          <div class="diag-section-title">Dashboards e relatórios</div>
          <div class="diag-section-desc">Quanta visibilidade você precisa do negócio?</div>
          <div class="diag-field">
            <label>Quantos dashboards você precisa?</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'ndash','1-2')"><div class="card-icon">📊</div><div class="card-label">1–2</div><div class="card-desc">Básico</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'ndash','3-5')"><div class="card-icon">📈</div><div class="card-label">3–5</div><div class="card-desc">Intermediário</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'ndash','6+')"><div class="card-icon">🎯</div><div class="card-label">6 ou mais</div><div class="card-desc">Avançado</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>Com que frequência precisa de relatórios?</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'freq','mensal')"><div class="card-icon">📅</div><div class="card-label">Mensal</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'freq','quinzenal')"><div class="card-icon">🗓️</div><div class="card-label">Quinzenal</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'freq','semanal')"><div class="card-icon">⚡</div><div class="card-label">Semanal</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'freq','diario')"><div class="card-icon">🔄</div><div class="card-label">Diário</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>Quais áreas precisam de dashboard? (pode marcar mais de um)</label>
            <div class="diag-chips" id="diag-chips-areas">
              <div class="diag-chip" onclick="diagTogChip(this,'areas')">Vendas / Comercial</div>
              <div class="diag-chip" onclick="diagTogChip(this,'areas')">Financeiro / DRE</div>
              <div class="diag-chip" onclick="diagTogChip(this,'areas')">Operações / Logística</div>
              <div class="diag-chip" onclick="diagTogChip(this,'areas')">RH / Pessoas</div>
              <div class="diag-chip" onclick="diagTogChip(this,'areas')">Marketing / E-commerce</div>
              <div class="diag-chip" onclick="diagTogChip(this,'areas')">Estoque / Compras</div>
              <div class="diag-chip" onclick="diagTogChip(this,'areas')">Atendimento / SAC</div>
            </div>
          </div>
          <div class="diag-nav">
            <button class="diag-btn-back" onclick="diagGoTo(2)">← Voltar</button>
            <button class="diag-btn-next" onclick="diagGoTo(4)">Próximo →</button>
          </div>
        </div>

        <!-- PASSO 4 -->
        <div class="diag-section" id="ds4">
          <div class="diag-section-title">Maturidade técnica</div>
          <div class="diag-section-desc">Entender a estrutura atual para alinhar a solução.</div>
          <div class="diag-field">
            <label>Banco de dados centralizado</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'bd','Sim, estruturado')"><div class="card-icon">✅</div><div class="card-label">Sim, estruturado</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'bd','Parcial')"><div class="card-icon">⚠️</div><div class="card-label">Parcial</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'bd','Não, mas quero montar')"><div class="card-icon">🔧</div><div class="card-label">Não, quero montar</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'bd','Não sei')"><div class="card-icon">❓</div><div class="card-label">Não sei</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>TI interna / suporte técnico</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'ti','Sim, time dedicado')"><div class="card-icon">👥</div><div class="card-label">Time dedicado</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'ti','Parcial')"><div class="card-icon">🧑‍💻</div><div class="card-label">Parcial</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'ti','Não')"><div class="card-icon">❌</div><div class="card-label">Não tem</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>Quantidade de fontes de dados</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'nfontes','1-2')"><div class="card-icon">1️⃣</div><div class="card-label">1–2 fontes</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'nfontes','3-5')"><div class="card-icon">3️⃣</div><div class="card-label">3–5 fontes</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'nfontes','5+')"><div class="card-icon">🔢</div><div class="card-label">Mais de 5</div></div>
            </div>
          </div>
          <div class="diag-nav">
            <button class="diag-btn-back" onclick="diagGoTo(3)">← Voltar</button>
            <button class="diag-btn-next" onclick="diagGoTo(5)">Próximo →</button>
          </div>
        </div>

        <!-- PASSO 5 -->
        <div class="diag-section" id="ds5">
          <div class="diag-section-title">Suporte e treinamento</div>
          <div class="diag-section-desc">Como você quer ser atendido pela SmartData?</div>
          <div class="diag-field">
            <label>Nível de suporte desejado</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'suporte','basico')"><div class="card-icon">💬</div><div class="card-label">Básico</div><div class="card-desc">WhatsApp</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'suporte','medio')"><div class="card-icon">📞</div><div class="card-label">Médio</div><div class="card-desc">+ reuniões</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'suporte','prioritario')"><div class="card-icon">⭐</div><div class="card-label">Prioritário</div><div class="card-desc">Dedicado</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>Treinamento da equipe</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'trein','Não preciso')"><div class="card-icon">🙅</div><div class="card-label">Não preciso</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'trein','Sim, gestores')"><div class="card-icon">👔</div><div class="card-label">Só gestores</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'trein','Sim, time completo')"><div class="card-icon">🎓</div><div class="card-label">Time completo</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>Reuniões de acompanhamento</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'reun','mensal')"><div class="card-icon">📅</div><div class="card-label">Mensal</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'reun','quinzenal')"><div class="card-icon">🗓️</div><div class="card-label">Quinzenal</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'reun','semanal')"><div class="card-icon">⚡</div><div class="card-label">Semanal</div></div>
            </div>
          </div>
          <div class="diag-nav">
            <button class="diag-btn-back" onclick="diagGoTo(4)">← Voltar</button>
            <button class="diag-btn-next" onclick="diagGoTo(6)">Próximo →</button>
          </div>
        </div>

        <!-- PASSO 6 -->
        <div class="diag-section" id="ds6">
          <div class="diag-section-title">Sistemas e apps desejados</div>
          <div class="diag-section-desc">Além de dashboards, você precisa de algum sistema personalizado?</div>
          <div class="diag-field">
            <label>Sistemas / apps que gostaria (pode marcar mais de um)</label>
            <div class="diag-chips" id="diag-chips-app">
              <div class="diag-chip" onclick="diagTogChip(this,'app')">App para equipe de campo</div>
              <div class="diag-chip" onclick="diagTogChip(this,'app')">App de promotores / PDV</div>
              <div class="diag-chip" onclick="diagTogChip(this,'app')">Portal do cliente</div>
              <div class="diag-chip" onclick="diagTogChip(this,'app')">Automação de relatórios</div>
              <div class="diag-chip" onclick="diagTogChip(this,'app')">Integração entre sistemas</div>
              <div class="diag-chip" onclick="diagTogChip(this,'app')">IA / análise preditiva</div>
              <div class="diag-chip" onclick="diagTogChip(this,'app')">Não preciso de sistema</div>
            </div>
          </div>
          <div class="diag-field">
            <label>Workspace BI preferido</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'ws','Power BI')"><div class="card-icon">📊</div><div class="card-label">Power BI</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'ws','Looker Studio')"><div class="card-icon">📉</div><div class="card-label">Looker Studio</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'ws','Metabase')"><div class="card-icon">🔵</div><div class="card-label">Metabase</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'ws','Indiferente')"><div class="card-icon">🤷</div><div class="card-label">Indiferente</div></div>
            </div>
          </div>
          <div class="diag-nav">
            <button class="diag-btn-back" onclick="diagGoTo(5)">← Voltar</button>
            <button class="diag-btn-next" onclick="diagGoTo(7)">Próximo →</button>
          </div>
        </div>

        <!-- PASSO 7 -->
        <div class="diag-section" id="ds7">
          <div class="diag-section-title">Prazo e investimento</div>
          <div class="diag-section-desc">Últimas informações para gerar sua recomendação personalizada.</div>
          <div class="diag-field">
            <label>Orçamento mensal disponível</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'budget','ate3k')"><div class="card-icon">💰</div><div class="card-label">Até R$ 3k</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'budget','3-5k')"><div class="card-icon">💵</div><div class="card-label">R$ 3–5k</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'budget','5-7k')"><div class="card-icon">💎</div><div class="card-label">R$ 5–7k</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'budget','7k+')"><div class="card-icon">🚀</div><div class="card-label">R$ 7k+</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>Prazo para implementação</label>
            <div class="diag-card-grid">
              <div class="diag-card-opt" onclick="diagSelCard(this,'prazo','imediato')"><div class="card-icon">⚡</div><div class="card-label">Imediato</div><div class="card-desc">ASAP</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'prazo','30-60d')"><div class="card-icon">📅</div><div class="card-label">30–60 dias</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'prazo','90d+')"><div class="card-icon">🗓️</div><div class="card-label">90+ dias</div></div>
              <div class="diag-card-opt" onclick="diagSelCard(this,'prazo','pesquisando')"><div class="card-icon">🔍</div><div class="card-label">Pesquisando</div></div>
            </div>
          </div>
          <div class="diag-field">
            <label>Observações ou desafios específicos</label>
            <textarea id="diag-obs" placeholder="Descreva aqui qualquer desafio ou necessidade específica..." rows="3"></textarea>
            <div class="hint" style="font-size:11.5px;color:#475569;margin-top:4px;">Quanto mais detalhes, mais precisa será a recomendação.</div>
          </div>
          <div class="diag-nav">
            <button class="diag-btn-back" onclick="diagGoTo(6)">← Voltar</button>
            <div></div>
          </div>
          <button class="diag-btn-generate" onclick="diagGerar()">✨ Gerar minha recomendação gratuita</button>
        </div>

        <!-- RESULTADO -->
        <div class="diag-section" id="ds-result">
          <div id="diag-loading">
            <div class="diag-spinner"></div>
            <div class="diag-loading-text">Analisando seu perfil...</div>
            <div class="diag-loading-sub">Nossa IA está preparando uma recomendação personalizada</div>
          </div>
          <div class="diag-result-area" id="diag-result-area">
            <div class="diag-result-intro" id="diag-result-intro"></div>
            <div class="diag-plan-card" id="diag-plano-rec"></div>
            <div id="diag-alt-plan-area"></div>
            <div id="diag-save-status" style="display:none;" class="diag-success-save">
              ✅ Diagnóstico salvo com sucesso no sistema SmartData!
            </div>
            <div class="diag-cta-final">
              <button class="diag-cta-wa" onclick="diagAbriirWhatsApp()">
                💬 Falar com Consultor no WhatsApp
              </button>
              <button class="diag-cta-back" onclick="diagReiniciar()">🔄 Refazer</button>
            </div>
          </div>
        </div>

      </div><!-- /diag-modal-body -->
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // ── 3. TRANSFORMAR BOTÃO "FALE CONOSCO" ─────────────────────────
  function patchCtaNav() {
    const btn = document.querySelector('.cta-nav');
    if (!btn) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'cta-nav-wrapper';
    btn.parentNode.insertBefore(wrapper, btn);
    wrapper.appendChild(btn);

    // Mudar comportamento do botão
    btn.removeAttribute('onclick');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = document.getElementById('cta-dropdown');
      dd.classList.toggle('open');
    });

    // Injetar dropdown
    const dd = document.createElement('div');
    dd.id = 'cta-dropdown';
    dd.className = 'cta-nav-dropdown';
    dd.innerHTML = `
      <div class="dropdown-arrow"></div>
      <div class="dropdown-item" onclick="window.open('https://wa.me/5581995426006?text=Olá! Vim pelo site da SmartData e gostaria de falar com um consultor.', '_blank'); document.getElementById('cta-dropdown').classList.remove('open');">
        <div class="dropdown-item-icon whatsapp">💬</div>
        <div class="dropdown-item-text">
          <strong>Falar com Consultor</strong>
          <span>Atendimento direto pelo WhatsApp</span>
        </div>
      </div>
      <div class="dropdown-divider"></div>
      <div class="dropdown-item" onclick="diagOpen(); document.getElementById('cta-dropdown').classList.remove('open');">
        <div class="dropdown-item-icon diagnostico">🔍</div>
        <div class="dropdown-item-text">
          <strong>Solicitar Diagnóstico Grátis</strong>
          <span>Questionário → recomendação por IA</span>
        </div>
      </div>
    `;
    wrapper.appendChild(dd);

    // Fechar ao clicar fora
    document.addEventListener('click', () => {
      dd.classList.remove('open');
    });
  }

  // Também patch os botões hero/CTA que apontam para #contato
  function patchHeroButtons() {
    document.querySelectorAll('a[href="#contato"].btn-primary, a[href="#contato"].btn-secondary').forEach(a => {
      if (a.textContent.includes('Diagnóstico') || a.textContent.includes('Agendar')) {
        a.removeAttribute('href');
        a.style.cursor = 'pointer';
        a.addEventListener('click', (e) => { e.preventDefault(); diagOpen(); });
      } else if (a.textContent.includes('Fale') || a.textContent.includes('Consultor')) {
        a.href = 'https://wa.me/5581995426006?text=Olá! Vim pelo site da SmartData e gostaria de falar com um consultor.';
        a.target = '_blank';
      }
    });
    // Botão CTA section também
    document.querySelectorAll('.cta-buttons .btn-primary').forEach(btn => {
      btn.addEventListener('click', () => {
        window.open('https://wa.me/5581995426006?text=Olá! Vim pelo site da SmartData e gostaria de falar com um consultor.', '_blank');
      });
    });
    document.querySelectorAll('.cta-buttons .btn-secondary').forEach(btn => {
      btn.removeAttribute('href');
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', (e) => { e.preventDefault(); diagOpen(); });
    });
  }

  // ── 4. LÓGICA DO QUESTIONÁRIO ────────────────────────────────────
  window.diagState = {
    porte: '', ndash: '', freq: '', bd: '', ti: '', nfontes: '', suporte: '', trein: '', reun: '',
    budget: '', prazo: '', ws: '',
    decisao: [], dados: [], areas: [], app: []
  };

  const TOTAL_STEPS = 7;
  const stepLabels = ['', 'Sua empresa', 'Maturidade de dados', 'Dashboards e relatórios', 'Estrutura técnica', 'Suporte e treinamento', 'Sistemas desejados', 'Prazo e investimento'];

  window.diagOpen = function () {
    document.getElementById('diag-modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.diagClose = function () {
    document.getElementById('diag-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };
  window.diagHandleOverlay = function (e) {
    if (e.target.id === 'diag-modal-overlay') diagClose();
  };

  window.diagGoTo = function (step) {
    document.querySelectorAll('.diag-section').forEach(s => s.classList.remove('active'));
    const target = step <= TOTAL_STEPS ? document.getElementById('ds' + step) : document.getElementById('ds-result');
    if (target) target.classList.add('active');
    const pct = step <= TOTAL_STEPS ? Math.round((step / (TOTAL_STEPS + 1)) * 100) : 100;
    document.getElementById('diag-prog').style.width = pct + '%';
    document.getElementById('diag-step-lbl').textContent =
      step <= TOTAL_STEPS ? `Passo ${step} de ${TOTAL_STEPS} — ${stepLabels[step]}` : 'Resultado do Diagnóstico';
    document.getElementById('diag-modal').scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.diagSelCard = function (el, key, val) {
    el.closest('.diag-card-grid').querySelectorAll('.diag-card-opt').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel');
    diagState[key] = val;
  };

  window.diagTogChip = function (el, key) {
    el.classList.toggle('sel');
    const arr = diagState[key] || [];
    const val = el.textContent.trim();
    if (el.classList.contains('sel')) { if (!arr.includes(val)) arr.push(val); }
    else { const i = arr.indexOf(val); if (i > -1) arr.splice(i, 1); }
    diagState[key] = arr;
  };

  window.diagReiniciar = function () {
    window.diagState = { porte:'',ndash:'',freq:'',bd:'',ti:'',nfontes:'',suporte:'',trein:'',reun:'',budget:'',prazo:'',ws:'',decisao:[],dados:[],areas:[],app:[] };
    document.querySelectorAll('.diag-card-opt.sel, .diag-chip.sel').forEach(el => el.classList.remove('sel'));
    ['diag-empresa','diag-responsavel','diag-whatsapp','diag-email-lead','diag-obs'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    document.getElementById('diag-segmento').value = '';
    document.getElementById('diag-result-area').style.display = 'none';
    document.getElementById('diag-loading').style.display = 'block';
    document.getElementById('diag-save-status').style.display = 'none';
    diagGoTo(1);
  };

  function diagRecPlan() {
    const s = diagState;
    let score = { starter: 0, essencial: 0, pro: 0 };
    if (s.porte === 'pequeno') score.starter += 2; else if (s.porte === 'medio') score.essencial += 2; else if (s.porte === 'grande') score.pro += 2;
    if (s.ndash === '1-2') score.starter += 2; else if (s.ndash === '3-5') score.essencial += 2; else if (s.ndash === '6+') score.pro += 2;
    if (s.freq === 'mensal') score.starter += 1; else if (s.freq === 'quinzenal') score.essencial += 1; else score.pro += 1;
    if (s.nfontes === '1-2') score.starter += 1; else if (s.nfontes === '3-5') score.essencial += 1; else score.pro += 1;
    if (s.bd === 'Não, mas quero montar' || s.bd === 'Não sei') { score.essencial += 1; score.pro += 1; } else if (s.bd && s.bd.includes('SQL')) score.pro += 1;
    if (s.suporte === 'basico') score.starter += 1; else if (s.suporte === 'medio') score.essencial += 1; else if (s.suporte === 'prioritario') score.pro += 2;
    if (s.trein === 'Sim, time completo') { score.essencial += 1; score.pro += 1; }
    if (s.budget === 'ate3k') score.starter += 2; else if (s.budget === '3-5k') { score.starter += 1; score.essencial += 1; } else if (s.budget === '5-7k') { score.essencial += 1; score.pro += 1; } else if (s.budget === '7k+') score.pro += 2;
    const arr = Array.isArray(s.app) ? s.app : [];
    if (arr.length > 0 && !arr.includes('Não preciso de sistema')) { if (arr.length === 1) score.essencial += 1; else score.pro += 2; }
    return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  }

  const planoInfo = {
    starter:  { nome: 'Starter',  preco: 'R$ 3.000', cor: '#94a3b8' },
    essencial:{ nome: 'Essencial',preco: 'R$ 5.000', cor: '#a855f7' },
    pro:      { nome: 'Pro',      preco: 'R$ 7.000', cor: '#3b82f6' }
  };

  async function diagSalvarSupabase(dadosDiag) {
    try {
      const SUPABASE_URL      = 'https://tkhmumufefeipsecktlm.supabase.co';
      const SUPABASE_ANON_KEY = 'sb_publishable_yBzseUd_L9s_EpfGV8_HIQ_PZNeWfiS';
      const res = await fetch(`${SUPABASE_URL}/rest/v1/diagnosticos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(dadosDiag)
      });
      return res.ok;
    } catch (e) { return false; }
  }

  window.diagGerar = async function () {
    diagGoTo(99); // vai para tela de resultado/loading
    document.getElementById('ds-result').classList.add('active');
    document.getElementById('diag-prog').style.width = '100%';
    document.getElementById('diag-step-lbl').textContent = 'Resultado do Diagnóstico';

    const rec = diagRecPlan();
    const s = diagState;
    const empresa = document.getElementById('diag-empresa').value || 'sua empresa';
    const obs = document.getElementById('diag-obs').value || '';

    // Salvar no Supabase
    const dadosDiag = {
      empresa,
      responsavel: document.getElementById('diag-responsavel').value || '',
      whatsapp: document.getElementById('diag-whatsapp').value || '',
      email: document.getElementById('diag-email-lead').value || '',
      segmento: document.getElementById('diag-segmento').value || '',
      porte: s.porte, ndash: s.ndash, freq: s.freq, bd: s.bd, ti: s.ti,
      nfontes: s.nfontes, suporte: s.suporte, trein: s.trein, reun: s.reun,
      budget: s.budget, prazo: s.prazo, ws: s.ws,
      decisao: s.decisao, dados: s.dados, areas: s.areas, app: s.app,
      obs, plano_recomendado: rec,
      criado_em: new Date().toISOString()
    };
    const saved = await diagSalvarSupabase(dadosDiag);

    const prompt = `Você é consultor da SmartData Consultoria. Um cliente preencheu um formulário de diagnóstico.
Empresa: ${empresa} | Segmento: ${dadosDiag.segmento} | Porte: ${s.porte}
Maturidade: decisão=${JSON.stringify(s.decisao)} / dados=${JSON.stringify(s.dados)}
Dashboards: ${s.ndash} dashboards, frequência=${s.freq}, áreas=${JSON.stringify(s.areas)}
BD: ${s.bd} | TI: ${s.ti} | Fontes: ${s.nfontes}
Sistemas: ${JSON.stringify(s.app)} | Workspace: ${s.ws}
Suporte: ${s.suporte} | Treinamento: ${s.trein} | Reuniões: ${s.reun}
Orçamento: ${s.budget} | Prazo: ${s.prazo}
Obs: ${obs}
Plano recomendado pelo sistema: ${rec}
Planos disponíveis:
- Starter R$3.000/mês: até 2 dashboards, 2 fontes, relatórios mensais, suporte WhatsApp, reunião mensal
- Essencial R$5.000/mês: até 5 dashboards, 5 fontes, quinzenal, BD montado, 1 app, treinamento, reuniões semanais
- Pro R$7.000/mês: até 8 dashboards, fontes ilimitadas, semanal, BD gerenciado, até 3 apps, suporte prioritário
Responda SOMENTE com JSON válido sem markdown:
{"plano":"starter|essencial|pro","justificativa":"2-3 frases personalizadas","destaquesInclusos":["item1","item2","item3","item4"],"alertaPersonalizado":"1 frase","planoAlternativo":"starter|essencial|pro","motivoAlternativo":"frase curta"}`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 800, messages: [{ role: 'user', content: prompt }] })
      });
      const data = await res.json();
      const txt = data.content.map(i => i.text || '').join('');
      const clean = txt.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      diagRenderResult(parsed, empresa, saved);
    } catch (e) {
      diagRenderResult({ plano: rec, justificativa: 'Com base nas suas respostas, este plano atende melhor às necessidades identificadas.', destaquesInclusos: ['Dashboards configurados para seu negócio', 'Consultoria especializada', 'Suporte contínuo', 'Relatórios periódicos'], alertaPersonalizado: 'Agende uma reunião gratuita para detalhar o escopo.', planoAlternativo: rec === 'starter' ? 'essencial' : 'starter', motivoAlternativo: 'Plano alternativo disponível para seu orçamento.' }, empresa, saved);
    }
  };

  function diagRenderResult(data, empresa, saved) {
    document.getElementById('diag-loading').style.display = 'none';
    document.getElementById('diag-result-area').style.display = 'block';
    const info = planoInfo[data.plano] || planoInfo.essencial;
    const altInfo = planoInfo[data.planoAlternativo];
    document.getElementById('diag-result-intro').textContent = `Com base no diagnóstico de ${empresa}, preparamos sua recomendação personalizada.`;
    document.getElementById('diag-plano-rec').innerHTML = `
      <div class="diag-rec-badge">✨ Plano recomendado</div>
      <div class="diag-plan-name">${info.nome}</div>
      <div class="diag-plan-price">${info.preco}<span>/mês</span></div>
      <div class="diag-plan-divider"></div>
      <p style="font-size:13px;color:#94a3b8;line-height:1.7;margin-bottom:1rem;">${data.justificativa}</p>
      <ul class="diag-feat-list">${(data.destaquesInclusos||[]).map(f=>`<li>${f}</li>`).join('')}</ul>
      ${data.alertaPersonalizado ? `<div class="diag-alerta">💡 ${data.alertaPersonalizado}</div>` : ''}
    `;
    const altArea = document.getElementById('diag-alt-plan-area');
    if (altInfo && data.planoAlternativo !== data.plano) {
      altArea.innerHTML = `<p style="font-size:11.5px;color:#64748b;margin:1rem 0 8px;">Plano alternativo considerado</p>
        <div class="diag-alt-plan">
          <div><div class="diag-alt-name">${altInfo.nome}</div><div class="diag-alt-desc">${data.motivoAlternativo}</div></div>
          <div class="diag-alt-price">${altInfo.preco}/mês</div>
        </div>`;
    }
    if (saved) {
      document.getElementById('diag-save-status').style.display = 'flex';
    }
  }

  window.diagAbriirWhatsApp = function () {
    const empresa = document.getElementById('diag-empresa').value || '';
    const planoEl = document.querySelector('#diag-plano-rec .diag-plan-name');
    const plano = planoEl ? planoEl.textContent : '';
    const msg = `Olá! Acabei de fazer o diagnóstico gratuito no site da SmartData${empresa ? ' — ' + empresa : ''} e recebi a recomendação do plano ${plano}. Gostaria de conversar sobre a proposta!`;
    window.open(`https://wa.me/5581995426006?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // ── 5. INICIALIZAR ───────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { patchCtaNav(); patchHeroButtons(); });
  } else {
    patchCtaNav(); patchHeroButtons();
  }
})();
