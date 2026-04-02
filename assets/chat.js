// ═══════════════════════════════════════════════════════════
//  CHAT WIDGET — SmartData Consultoria
//  Arquivo: assets/chat.js
//  Descrição: Fluxo de perguntas/respostas, controle do painel
//             e funções de interação do chat embutido no site.
// ═══════════════════════════════════════════════════════════

const SD_WA = 'https://wa.me/5581995426006';

// ── Fluxo de conversação ──────────────────────────────────
const FLUXO = {

  inicio: {
    bot: 'Olá! 👋 Sou o assistente da <b style="color:#a855f7">SmartData Consultoria</b>.\n\nAjudamos empresas a transformar dados em decisões inteligentes. Me conta: <b>qual é o maior desafio do seu negócio hoje?</b>',
    opcoes: [
      { label: '📊 Vendas e faturamento',   prox: 'vendas'     },
      { label: '📦 Estoque e compras',       prox: 'estoque'    },
      { label: '💸 Controle financeiro',     prox: 'financeiro' },
      { label: '📁 Planilhas bagunçadas',    prox: 'planilhas'  },
      { label: '📈 Falta de indicadores',    prox: 'gestao'     },
      { label: '🤝 Quero falar com alguém',  prox: 'whatsapp'   },
    ]
  },

  // ── VENDAS ──────────────────────────────────────────────
  vendas: {
    bot: 'Entendo! Problemas na área de vendas podem travar o crescimento do negócio. 📊\n\n<b>Qual é a sua maior dificuldade?</b>',
    opcoes: [
      { label: '📉 Minhas vendas caíram',           prox: 'vendas_caiu'     },
      { label: '❓ Não sei o que vende mais',        prox: 'vendas_produto'  },
      { label: '🗂️ Não tenho controle de vendas',   prox: 'vendas_controle' },
      { label: '👥 Não sei a performance da equipe', prox: 'vendas_equipe'   },
    ]
  },
  vendas_caiu: {
    bot: 'Isso é mais comum do que parece — e quase sempre tem uma causa clara nos dados. 🔍\n\nCriamos dashboards que mostram <b>exatamente quando, onde e por que</b> as vendas caíram — por produto, por vendedor e por período.\n\nGostaria de saber mais?',
    opcoes: [
      { label: '🚀 Sim, quero saber mais!',  prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',     prox: 'whatsapp'            },
      { label: '◀ Voltar',                   prox: 'vendas'              },
    ]
  },
  vendas_produto: {
    bot: 'Sem saber o que vende mais, fica impossível focar nos produtos certos. 🎯\n\nCriamos <b>relatórios de curva ABC</b> que mostram seus produtos mais lucrativos e onde concentrar esforços.\n\nQuer ver como funciona?',
    opcoes: [
      { label: '🚀 Sim, quero saber mais!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',    prox: 'whatsapp'            },
      { label: '◀ Voltar',                  prox: 'vendas'              },
    ]
  },
  vendas_controle: {
    bot: 'Gerir vendas sem controle é como dirigir de olhos fechados. 😬\n\nCriamos um <b>painel de controle de vendas</b> completo: metas x realizado, ticket médio, evolução diária e mensal — atualizado automaticamente.',
    opcoes: [
      { label: '🚀 Quero ver!',             prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',    prox: 'whatsapp'            },
      { label: '◀ Voltar',                  prox: 'vendas'              },
    ]
  },
  vendas_equipe: {
    bot: 'Acompanhar a performance da equipe é essencial para bonificações e treinamentos. 🏆\n\nCriamos dashboards com <b>ranking de vendedores, metas individuais e evolução por período</b>.',
    opcoes: [
      { label: '🚀 Quero ver!',             prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',    prox: 'whatsapp'            },
      { label: '◀ Voltar',                  prox: 'vendas'              },
    ]
  },

  // ── ESTOQUE ─────────────────────────────────────────────
  estoque: {
    bot: 'Estoque mal gerenciado trava dinheiro e gera ruptura nas vendas. 📦\n\n<b>Qual é o seu problema principal?</b>',
    opcoes: [
      { label: '💰 Muito produto parado',      prox: 'estoque_parado'  },
      { label: '🔴 Produto faltando na venda', prox: 'estoque_falta'   },
      { label: '🤔 Compro sem dados claros',   prox: 'estoque_compras' },
      { label: '📋 Sem controle nenhum',       prox: 'estoque_sem'     },
    ]
  },
  estoque_parado: {
    bot: 'Produto parado é dinheiro preso — pode ser até 30% do capital de giro travado! 💸\n\nCriamos relatórios que mostram <b>quais produtos têm giro baixo, há quanto tempo estão parados e qual o valor imobilizado</b>.',
    opcoes: [
      { label: '🚀 Quero resolver isso!',    prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',     prox: 'whatsapp'           },
      { label: '◀ Voltar',                   prox: 'estoque'            },
    ]
  },
  estoque_falta: {
    bot: 'Ruptura de estoque é venda perdida — e pior, cliente que vai ao concorrente. 😤\n\nCriamos <b>alertas automáticos de estoque mínimo</b> e relatórios de previsão de demanda.',
    opcoes: [
      { label: '🚀 Quero resolver isso!',   prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',    prox: 'whatsapp'           },
      { label: '◀ Voltar',                  prox: 'estoque'            },
    ]
  },
  estoque_compras: {
    bot: 'Comprar no "feeling" gera excesso de uns itens e falta de outros. 📉\n\nCriamos <b>sugestões de compra baseadas no histórico de vendas e sazonalidade</b> do seu negócio.',
    opcoes: [
      { label: '🚀 Quero ver como funciona!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',      prox: 'whatsapp'           },
      { label: '◀ Voltar',                    prox: 'estoque'            },
    ]
  },
  estoque_sem: {
    bot: 'Sem controle de estoque, decisões viram chutes. E chute em negócio custa caro! 🎲\n\nComeçamos do zero: <b>organizamos seus dados e entregamos um painel completo de estoque</b>, simples e atualizado em tempo real.',
    opcoes: [
      { label: '🚀 Quero começar!',         prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',    prox: 'whatsapp'           },
      { label: '◀ Voltar',                  prox: 'estoque'            },
    ]
  },

  // ── FINANCEIRO ──────────────────────────────────────────
  financeiro: {
    bot: 'Controle financeiro é a base de qualquer negócio saudável. 💸\n\n<b>Qual é a sua maior dificuldade?</b>',
    opcoes: [
      { label: '🤷 Não sei se tenho lucro',       prox: 'fin_lucro'   },
      { label: '📉 Não sei minha margem',         prox: 'fin_margem'  },
      { label: '🕳️ Dinheiro some sem explicação', prox: 'fin_fuga'    },
      { label: '🗂️ Financeiro desorganizado',     prox: 'fin_bagunca' },
    ]
  },
  fin_lucro: {
    bot: 'Muita empresa fatura bem mas não sabe se está lucrando de verdade. Faturamento ≠ lucro! ⚠️\n\nCriamos um <b>painel de DRE simplificado</b> que mostra receita, custos, despesas e lucro real — de forma clara e visual.',
    opcoes: [
      { label: '🚀 Quero saber meu lucro!', prox: 'proposta', cta: true  },
      { label: '💬 Falar pelo WhatsApp',    prox: 'whatsapp'             },
      { label: '◀ Voltar',                  prox: 'financeiro'           },
    ]
  },
  fin_margem: {
    bot: 'Vender sem saber a margem é trabalhar de graça — ou pior, no prejuízo. 😰\n\nCriamos relatórios de <b>margem por produto, por categoria e por período</b>.',
    opcoes: [
      { label: '🚀 Quero calcular minha margem!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',          prox: 'whatsapp'           },
      { label: '◀ Voltar',                        prox: 'financeiro'         },
    ]
  },
  fin_fuga: {
    bot: 'Dinheiro que some quase sempre está em custos invisíveis ou despesas descontroladas. 🔍\n\nNossos dashboards mostram <b>para onde vai cada real</b>, identificando os maiores vilões do resultado.',
    opcoes: [
      { label: '🚀 Quero encontrar os vazamentos!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',            prox: 'whatsapp'           },
      { label: '◀ Voltar',                          prox: 'financeiro'         },
    ]
  },
  fin_bagunca: {
    bot: 'Financeiro bagunçado é um dos maiores riscos para qualquer empresa. 😬\n\nEntregamos um <b>painel financeiro completo</b>: fluxo de caixa, contas a pagar/receber, resultado mensal — tudo em um só lugar.',
    opcoes: [
      { label: '🚀 Quero organizar meu financeiro!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',             prox: 'whatsapp'           },
      { label: '◀ Voltar',                           prox: 'financeiro'         },
    ]
  },

  // ── PLANILHAS ───────────────────────────────────────────
  planilhas: {
    bot: 'Planilhas são o começo — mas quando viram um labirinto, o problema cresce. 📁\n\n<b>Qual situação te identifica mais?</b>',
    opcoes: [
      { label: '😵 Tenho dezenas de planilhas',    prox: 'plan_muitas' },
      { label: '⚡ Os dados não batem entre áreas', prox: 'plan_bate'   },
      { label: '⏱️ Monto relatório na mão',        prox: 'plan_manual' },
      { label: '😟 Não confio nos meus números',   prox: 'plan_confio' },
    ]
  },
  plan_muitas: {
    bot: 'Dezenas de planilhas viram um pesadelo de versões, abas e fórmulas quebradas. 😵‍💫\n\nA SmartData <b>centraliza tudo em um único banco de dados</b> e entrega dashboards que substituem todas as planilhas.',
    opcoes: [
      { label: '🚀 Quero centralizar meus dados!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',           prox: 'whatsapp'           },
      { label: '◀ Voltar',                         prox: 'planilhas'          },
    ]
  },
  plan_bate: {
    bot: 'Dados que não batem geram retrabalho, brigas internas e decisões erradas. 😤\n\nCriamos uma <b>fonte única de dados integrada</b> entre os setores, para que todos trabalhem com os mesmos números.',
    opcoes: [
      { label: '🚀 Quero integrar meus dados!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',        prox: 'whatsapp'           },
      { label: '◀ Voltar',                      prox: 'planilhas'          },
    ]
  },
  plan_manual: {
    bot: 'Montar relatório na mão consome horas toda semana. ⏱️\n\nAutomatizamos seus relatórios: o dashboard <b>atualiza sozinho</b> e o gestor só precisa abrir e analisar.',
    opcoes: [
      { label: '🚀 Quero automatizar!',         prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',        prox: 'whatsapp'           },
      { label: '◀ Voltar',                      prox: 'planilhas'          },
    ]
  },
  plan_confio: {
    bot: 'Desconfiar dos próprios números é sinal de que algo está errado na base dos dados. 🔴\n\nFazemos um <b>diagnóstico completo das suas fontes de dados</b> e entregamos uma base limpa e confiável.',
    opcoes: [
      { label: '🚀 Quero dados confiáveis!',    prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',        prox: 'whatsapp'           },
      { label: '◀ Voltar',                      prox: 'planilhas'          },
    ]
  },

  // ── GESTÃO ──────────────────────────────────────────────
  gestao: {
    bot: 'Gestão sem indicadores é como pilotar um avião sem painel de controle. 📈\n\n<b>Qual é a sua situação?</b>',
    opcoes: [
      { label: '🎯 Não tenho KPIs definidos',        prox: 'gest_kpi'     },
      { label: '🤞 Decido no feeling',               prox: 'gest_feeling' },
      { label: '💎 Quero dashboards profissionais',  prox: 'gest_dash'    },
      { label: '👀 Não tenho visibilidade do negócio', prox: 'gest_vis'   },
    ]
  },
  gest_kpi: {
    bot: 'Sem KPIs definidos, não tem como saber se o negócio vai bem — e nem para onde melhorar. 🎯\n\nA SmartData <b>mapeia os indicadores certos para o seu negócio</b> e cria dashboards em tempo real.',
    opcoes: [
      { label: '🚀 Quero definir meus KPIs!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',      prox: 'whatsapp'           },
      { label: '◀ Voltar',                    prox: 'gestao'             },
    ]
  },
  gest_feeling: {
    bot: 'Decisão no feeling funciona... até deixar de funcionar. 😬\n\nCom os dashboards SmartData, você passa a decidir com base em <b>dados reais, históricos e tendências</b>.',
    opcoes: [
      { label: '🚀 Quero decidir com dados!', prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',      prox: 'whatsapp'           },
      { label: '◀ Voltar',                    prox: 'gestao'             },
    ]
  },
  gest_dash: {
    bot: 'Dashboards profissionais no Power BI mudam a forma de gerir qualquer negócio. 💎\n\nCriamos painéis <b>100% personalizados</b> para a sua realidade: visual, interativo, atualizado e acessível de qualquer dispositivo.',
    opcoes: [
      { label: '🚀 Quero ver exemplos!',      prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',      prox: 'whatsapp'           },
      { label: '◀ Voltar',                    prox: 'gestao'             },
    ]
  },
  gest_vis: {
    bot: 'Sem visibilidade, o gestor trabalha apagando incêndio — nunca prevenindo. 🔥\n\nEntregamos um <b>painel executivo</b> com visão geral do negócio: vendas, estoque, financeiro e operação — tudo em uma tela.',
    opcoes: [
      { label: '🚀 Quero ter visibilidade!',  prox: 'proposta', cta: true },
      { label: '💬 Falar pelo WhatsApp',      prox: 'whatsapp'           },
      { label: '◀ Voltar',                    prox: 'gestao'             },
    ]
  },

  // ── PROPOSTA ────────────────────────────────────────────
  proposta: {
    bot: 'Ótimo! A SmartData tem a solução ideal para o seu caso. 🚀\n\nTemos três planos:\n\n• <b>Start</b> — até 2 dashboards\n• <b>Profissional</b> — até 5 dashboards + treinamento\n• <b>Pro Plus</b> — até 7 dashboards + IA + app\n\nComo prefere dar o próximo passo?',
    opcoes: [
      { label: '💬 Falar no WhatsApp agora',    prox: 'whatsapp',    cta: true },
      { label: '🔍 Fazer diagnóstico grátis',   prox: 'diagnostico'           },
      { label: '❓ Tenho mais dúvidas',          prox: 'duvidas'               },
    ]
  },

  diagnostico: {
    bot: 'O diagnóstico gratuito é rápido (5 min) e mostra <b>exatamente qual solução se encaixa no seu negócio</b>. Retornamos em até 24h. 📋\n\nClique em "Diagnóstico Grátis" no menu do site para preencher.',
    opcoes: [
      { label: '💬 Prefiro falar no WhatsApp', prox: 'whatsapp' },
      { label: '◀ Menu principal',             prox: 'inicio'   },
    ]
  },

  // ── DÚVIDAS / FAQ ────────────────────────────────────────
  duvidas: {
    bot: 'Claro! Escolha um tema ou me escreva diretamente:',
    opcoes: [
      { label: '⏱️ Quanto tempo leva?',        prox: 'faq_prazo'   },
      { label: '💰 Qual o investimento?',      prox: 'faq_preco'   },
      { label: '🔧 Preciso de TI interno?',    prox: 'faq_ti'      },
      { label: '📊 Funciona com meu sistema?', prox: 'faq_sistema' },
      { label: '◀ Menu principal',             prox: 'inicio'      },
    ]
  },
  faq_prazo: {
    bot: '⏱️ <b>Prazo de entrega:</b>\n\nDashboards simples ficam prontos em <b>5 a 10 dias úteis</b>. Projetos mais completos levam de 2 a 4 semanas.\n\nApós o diagnóstico, passamos o prazo exato para o seu caso.',
    opcoes: [
      { label: '💬 Falar no WhatsApp', prox: 'whatsapp' },
      { label: '❓ Mais dúvidas',      prox: 'duvidas'  },
      { label: '◀ Menu principal',     prox: 'inicio'   },
    ]
  },
  faq_preco: {
    bot: '💰 <b>Investimento:</b>\n\nOs valores são personalizados conforme o projeto. A forma mais rápida de receber um orçamento é pelo WhatsApp ou pelo diagnóstico gratuito.',
    opcoes: [
      { label: '💬 Quero um orçamento!', prox: 'whatsapp', cta: true },
      { label: '❓ Mais dúvidas',        prox: 'duvidas'            },
      { label: '◀ Menu principal',       prox: 'inicio'             },
    ]
  },
  faq_ti: {
    bot: '🔧 <b>Precisa de TI interno?</b>\n\nNão! A SmartData cuida de tudo: coleta dos dados, estruturação, criação dos dashboards e treinamento.\n\nVocê só precisa dos dados — a gente faz o resto. 😊',
    opcoes: [
      { label: '💬 Falar no WhatsApp', prox: 'whatsapp' },
      { label: '❓ Mais dúvidas',      prox: 'duvidas'  },
      { label: '◀ Menu principal',     prox: 'inicio'   },
    ]
  },
  faq_sistema: {
    bot: '📊 <b>Compatibilidade:</b>\n\nTrabalhamos com Excel, Google Sheets, ERPs (TOTVS, SAP, Bling, Omie), bancos SQL e muito mais.\n\nSe você tem os dados em algum lugar, a gente conecta. 🔌',
    opcoes: [
      { label: '💬 Falar no WhatsApp', prox: 'whatsapp' },
      { label: '❓ Mais dúvidas',      prox: 'duvidas'  },
      { label: '◀ Menu principal',     prox: 'inicio'   },
    ]
  },

  // ── WHATSAPP ────────────────────────────────────────────
  whatsapp: {
    bot: 'Perfeito! Clique no botão abaixo para falar diretamente com nossa equipe. 📱\n\nÉ rápido e sem compromisso!',
    opcoes: [
      { label: '💬 Abrir WhatsApp agora', prox: '_wa',   cta: true },
      { label: '◀ Menu principal',        prox: 'inicio'           },
    ]
  },
};

// ── Controle de estado ────────────────────────────────────
let sdAberto   = false;
let sdIniciado = false;

// ── Abrir / fechar painel ─────────────────────────────────
function toggleChat() {
    sdAberto = !sdAberto;
    document.getElementById('sd-panel').classList.toggle('open', sdAberto);
    document.getElementById('sd-fab').classList.toggle('open', sdAberto);
    document.getElementById('sd-badge').classList.add('gone');
    if (sdAberto && !sdIniciado) {
        sdIniciado = true;
        setTimeout(() => sdMostrarEtapa('inicio'), 380);
    }
    if (sdAberto) setTimeout(() => document.getElementById('sd-txt').focus(), 420);
}

// ── Mostrar etapa do fluxo ────────────────────────────────
function sdMostrarEtapa(chave) {
    if (chave === '_wa') { window.open(SD_WA, '_blank'); return; }
    const etapa = FLUXO[chave];
    if (!etapa) return;
    const msgs = document.getElementById('sd-msgs');

    // Indicador de digitação
    const typ = document.createElement('div');
    typ.className = 'sd-row bot';
    typ.innerHTML = `<div class="sd-av-sm">🤖</div><div class="sd-bbl"><div class="sd-typing"><i></i><i></i><i></i></div></div>`;
    msgs.appendChild(typ);
    sdRolar();

    setTimeout(() => {
        typ.remove();
        const row = document.createElement('div');
        row.className = 'sd-row bot';
        const opts = etapa.opcoes && etapa.opcoes.length
            ? '<div class="sd-opts">' +
              etapa.opcoes.map(o =>
                  `<button class="sd-opt${o.cta ? ' cta' : ''}" onclick="sdClicarOpcao(this,'${o.prox}','${sdEscH(o.label)}')">${o.label}</button>`
              ).join('') +
              '</div>'
            : '';
        row.innerHTML = `<div class="sd-av-sm">🤖</div><div><div class="sd-bbl">${etapa.bot.replace(/\n/g,'<br>')}</div>${opts}</div>`;
        msgs.appendChild(row);
        sdRolar();
    }, 900);
}

// ── Clique em opção do fluxo ─────────────────────────────
function sdClicarOpcao(btn, prox, label) {
    btn.closest('.sd-opts').querySelectorAll('.sd-opt').forEach(b => b.disabled = true);
    sdAdicionarUser(label);
    setTimeout(() => sdMostrarEtapa(prox), 300);
}

// ── Envio de texto livre ──────────────────────────────────
function sdEnviarTexto() {
    const txt = document.getElementById('sd-txt');
    const val = txt.value.trim();
    if (!val) return;
    txt.value = ''; txt.style.height = 'auto';
    sdAdicionarUser(val);

    const msgs = document.getElementById('sd-msgs');
    const typ = document.createElement('div');
    typ.className = 'sd-row bot';
    typ.innerHTML = `<div class="sd-av-sm">🤖</div><div class="sd-bbl"><div class="sd-typing"><i></i><i></i><i></i></div></div>`;
    msgs.appendChild(typ);
    sdRolar();

    setTimeout(() => {
        typ.remove();
        const row = document.createElement('div');
        row.className = 'sd-row bot';
        row.innerHTML = `
            <div class="sd-av-sm">🤖</div>
            <div>
                <div class="sd-bbl">Entendi! Para te ajudar melhor, o ideal é falar diretamente com nossa equipe. 😊</div>
                <div class="sd-opts">
                    <button class="sd-opt cta" onclick="sdClicarOpcao(this,'_wa','💬 Abrir WhatsApp')">💬 Falar no WhatsApp</button>
                    <button class="sd-opt" onclick="sdClicarOpcao(this,'inicio','◀ Ver menu')">◀ Ver menu</button>
                </div>
            </div>`;
        msgs.appendChild(row);
        sdRolar();
    }, 900);
}

// ── Adicionar mensagem do usuário ─────────────────────────
function sdAdicionarUser(texto) {
    const msgs = document.getElementById('sd-msgs');
    const row = document.createElement('div');
    row.className = 'sd-row user';
    row.innerHTML = `<div class="sd-av-sm">👤</div><div class="sd-bbl">${texto.replace(/</g,'&lt;')}</div>`;
    msgs.appendChild(row);
    sdRolar();
}

// ── Rolar para o final das mensagens ─────────────────────
function sdRolar() {
    const m = document.getElementById('sd-msgs');
    m.scrollTop = m.scrollHeight;
}

// ── Escapar HTML nas opções ───────────────────────────────
function sdEscH(s) {
    return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
