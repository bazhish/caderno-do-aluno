# MVP — Caderno do Aluno: de site estático a mini-blog da turma

Plano para evoluir a plataforma atual (conteúdo estático) para um mini-blog com comentários por
aula, login de alunos e moderação — sem perder a simplicidade e o custo zero que fazem o projeto
funcionar.

---

## 1. Problema / Desafio

**Problema do usuário:** o material da turma vive espalhado (WhatsApp, fotos de caderno, PDFs
soltos) e não existe um lugar para tirar dúvida *no contexto da aula* — a dúvida surge lendo o
conteúdo, mas é perguntada horas depois num grupo lotado, sem referência do que se estava lendo.

**Desafio técnico:** o projeto hoje é 100% estático (Astro, sem backend). Comentários, login,
nome de usuário único e painel de ADM exigem estado no servidor: banco de dados, autenticação e
regras de permissão. O desafio é adicionar isso **sem reescrever a plataforma** e **sem sair do
custo zero**.

**Solução proposta:** manter o site estático como está e plugar um BaaS (Backend as a Service —
recomendação: **Supabase**, camada gratuita) apenas para a parte dinâmica. Os comentários viram
uma ilha React (mesmo padrão do Quiz.jsx atual) que conversa direto com o Supabase. Nenhum
servidor próprio para manter.

## 2. Tema / Escopo

**Tema:** plataforma colaborativa de estudo da turma — conteúdo estruturado + interação social
leve, por aula.

**Entra no MVP (fase 1):**
- Cadastro/login de aluno (e-mail + senha, com confirmação por e-mail do Supabase Auth).
- Nome de usuário único (constraint `UNIQUE` no banco — impossível duplicar, mesmo em corrida).
- Seção de comentários abaixo de cada aula (escrever, listar, apagar o próprio).
- Papel de ADM: apagar qualquer comentário (moderação).
- Regras de segurança no servidor (Row Level Security), não só na interface.

**Fica explicitamente fora do MVP (fases futuras):**
- Salvar progresso/notas do quiz por aluno (fase 2).
- Respostas aninhadas, curtidas, notificações (fase 2).
- Painel de ADM completo com métricas (fase 3).
- Perfil público de aluno, gamificação, ranking (fase 3, se fizer sentido).

Cortar isso do MVP não é perder — é garantir que a parte arriscada (alunos vão comentar?) seja
validada antes de investir no resto.

## 3. Desenvolvimento

**Arquitetura alvo:**

```
[Astro estático em Vercel/Cloudflare Pages]
        │
        ├── conteúdo .mdx  → continua exatamente como hoje
        ├── Quiz.jsx       → continua client-side puro
        └── Comentarios.jsx (nova ilha React, client:visible)
                │  supabase-js (HTTPS direto do navegador)
                ▼
        [Supabase - camada gratuita]
        ├── Auth (e-mail/senha, sessão JWT)
        ├── Postgres: profiles (id, username UNIQUE, role)
        │             comments (id, lesson_slug, user_id, body,
        │                       created_at, deleted_at)
        └── RLS: aluno insere/apaga o próprio; ADM apaga qualquer um;
                 leitura pública (visitante lê sem login)
```

Decisões-chave:
- **Comentário lê sem login, escreve com login** — reduz a barreira de entrada e mantém valor
  para quem só consome.
- **Soft delete** (`deleted_at`) em vez de apagar de verdade — permite auditar abuso.
- **`lesson_slug` como chave do comentário** — é o mesmo id que o Astro já usa para as coleções,
  então nenhuma mudança no conteúdo é necessária.

**Fases:**
| Fase | Entrega | Estimativa* |
|------|---------|-------------|
| 0 | Plataforma de conteúdo (pronta) | — |
| 1a | Projeto Supabase, tabelas, RLS, seed de ADM | 1 fim de semana |
| 1b | Ilha `Comentarios.jsx`: login/cadastro + listar/comentar | 1–2 fins de semana |
| 1c | Moderação ADM + polimento mobile + testes com 5 alunos | 1 fim de semana |
| 2 | Progresso do quiz por aluno, curtidas | depois do piloto |
| 3 | Painel ADM com métricas | depois da fase 2 |

*Estimativas para uma pessoa, nas horas livres.

## 4. Finalização (critérios de "pronto" da fase 1)

- [ ] Aluno cria conta, confirma e-mail e escolhe username — duplicado é rejeitado pelo banco.
- [ ] Comentário aparece na aula certa, com username e horário.
- [ ] Aluno apaga o próprio comentário; não consegue apagar o de outro (testado via API, não só UI).
- [ ] ADM apaga qualquer comentário.
- [ ] Visitante sem login lê comentários, mas não escreve.
- [ ] Tudo funciona no celular (o principal dispositivo da turma).
- [ ] `npm run build` limpo; deploy automático no push continua funcionando.
- [ ] Texto curto de privacidade publicado (o que é coletado: e-mail e username; como remover a conta).
- [ ] Piloto: 5 colegas usam por 2 semanas antes de divulgar para a sala inteira.

## 5. Viabilidade e Ajustes

**Viabilidade: alta.** Nenhuma peça paga (Vercel/Cloudflare Pages + Supabase free tier), nenhum
servidor para administrar, e a parte nova é isolada numa ilha React — se o Supabase sumir do ar,
o site de conteúdo continua 100% funcional.

**Riscos e planos B:**
| Risco | Sinal | Ajuste |
|-------|-------|--------|
| Login espanta os alunos | Contas criadas mas 0 comentários | Trocar por comentário anônimo com moderação prévia, ou login social (Google) |
| Comentários com abuso/spam | Moderação vira trabalho | Palavra-chave bloqueada + aprovação prévia para contas novas |
| Free tier estourar | Aviso de limite do Supabase | Improvável para 1 turma (limite ~50k usuários ativos/mês); se crescer, avaliar custo ou migrar (é Postgres padrão, sem lock-in de dados) |
| Falta de tempo do mantenedor | Fases atrasam | O MVP é fatiado: cada fase entrega valor sozinha; parar após 1b ainda deixa comentários funcionais |
| LGPD / dados de menores | — | Coletar o mínimo (e-mail + username), não pedir nome real, permitir exclusão de conta, texto de privacidade em linguagem simples |

## 6. Análises

### Sustentabilidade
- **Financeira:** custo zero de operação (tiers gratuitos); único custo real é tempo.
- **De manutenção:** uma pessoa mantém; a documentação existente (README, CLAUDE.md,
  CONTEUDO_PROMPT.md) reduz o "fator ônibus". O pipeline de conteúdo via prompt permite que
  colegas produzam aula sem saber programar.
- **De conteúdo:** o formato fixo de aula (schema Zod) garante que o site não degrada conforme
  mais gente contribui.

### Escalabilidade
- **Técnica:** o conteúdo é estático e servido por CDN — escala para milhares de leitores sem
  mudança. O gargalo dinâmico (comentários) fica no Supabase, que aguenta muito além de uma turma.
- **De produto:** para atender outras turmas/escolas, basta um campo `turma_id` em profiles e
  comments — a arquitetura não muda.
- **Gargalo real:** não é técnico — é a produção de conteúdo e a moderação humana. Escalar turma
  exige escalar moderadores (ex.: 1 ADM por turma).

### Ciclo de vida
- **Do conteúdo:** produzir (prompt IA) → revisar (humano) → publicar (git push) → arquivar ao
  fim do ano letivo (mover para pasta `arquivo/` ou branch por ano).
- **Do software:** desenvolver → deploy contínuo → monitorar uso no piloto → remover o que
  ninguém usa (evitar acumular feature morta).
- **Dos dados:** criação de conta → uso → direito de exclusão (apagar conta remove perfil e
  anonimiza comentários). Backup: export SQL mensal do Supabase.

### Recursos
- **Humanos:** 1 dev/mantenedor (você), colegas como revisores de conteúdo e beta-testers, 1–2
  ADMs de moderação.
- **Técnicos:** GitHub (código), Vercel ou Cloudflare Pages (hospedagem), Supabase (auth + banco),
  Claude/IA (conversão de conteúdo bruto).
- **De tempo:** ~3–4 fins de semana para a fase 1 completa.

### Padrões
- **Código:** Astro + ilhas React apenas onde há interação (padrão já estabelecido pelo Quiz);
  schema Zod como contrato de conteúdo; commits pequenos com deploy automático.
- **Dados:** SQL relacional simples, RLS como única fonte de verdade de permissão (a UI nunca é
  a barreira de segurança).
- **UX:** metáfora consistente de caderno/fichário (abas, folha, furos); mobile first; toda
  funcionalidade nova precisa funcionar bem no celular antes de ir ao ar.
- **Conteúdo:** estrutura fixa de aula (resumo → relevância → teoria → tópicos-chave → recursos →
  quiz) — inegociável, é o que diferencia a plataforma de um PDF solto.

## 7. Design Thinking (aplicado)

1. **Empatizar** — entrevistar 5 colegas (15 min cada): como estudam hoje? onde travam? o que
   fariam num espaço de comentários? Preencher o mapa da empatia abaixo com respostas reais.
2. **Definir** — POV inicial: *"O aluno da turma precisa de um lugar único para revisar o
   conteúdo e tirar dúvidas sem constrangimento, porque o material está espalhado e perguntar em
   público intimida."*
3. **Idear** — ideias derivadas: comentários por aula (MVP), pergunta anônima, botão "também
   tenho essa dúvida", destaque para resposta confirmada pelo professor.
4. **Prototipar** — a fase 1 é o protótipo: comentários + login, o mínimo que testa a hipótese
   central.
5. **Testar** — piloto de 2 semanas com 5 alunos. Métricas: comentários/aula, % da turma com
   conta, dúvidas respondidas por colegas (não pelo ADM). Voltar à matriz CSD com o aprendido.

## 8. Mapa da Empatia (persona: aluno da turma)

| Dimensão | O que observamos/assumimos |
|----------|---------------------------|
| **Vê** | Grupo do WhatsApp com 300 mensagens/dia; foto borrada do quadro; PDF que ninguém abre |
| **Ouve** | "Isso cai na prova"; "alguém tem o resumo?"; colega explicando melhor que a apostila |
| **Pensa e sente** | Medo de estar mais perdido que os outros; vergonha de fazer "pergunta boba" em público; alívio quando acha material mastigado |
| **Fala e faz** | Pede material em cima da hora; estuda pelo celular, à noite; compartilha link do que é bom |
| **Dores** | Material disperso; dúvida morre sem resposta; não sabe por onde começar a revisar |
| **Ganhos** | Um link único com tudo; perguntar no contexto da aula; ver que a dúvida dos outros é igual à sua |

> Preencher de novo após as entrevistas da etapa Empatizar — este mapa inicial é hipótese, não dado.

## 9. Matriz CSD

**Certezas** (sabemos):
- Todo aluno da turma tem celular e usa WhatsApp diariamente.
- O material hoje está disperso e isso gera retrabalho e ansiedade.
- Site estático + free tiers custam zero e já funcionam (fase 0 no ar).
- O formato de aula estruturada é replicável via prompt de IA.

**Suposições** (achamos que sim, precisa validar):
- Alunos vão comentar se a barreira for baixa. ← **hipótese central do MVP**
- Login com e-mail não vai espantar a maioria.
- A própria turma responde dúvidas (interação aluno-aluno, não só aluno-ADM).
- 1 ADM dá conta da moderação de uma turma.
- Ler comentários sem login aumenta a chance de criar conta depois.

**Dúvidas** (não sabemos, perguntar/medir):
- Qual % da turma realmente estuda por site vs. só WhatsApp?
- Anonimato importa para perguntar? (se sim, muda o design do MVP)
- Qual horário de pico de uso? (véspera de prova? diário?)
- Alunos querem ver o progresso do quiz salvo, ou o quiz é "de passagem"?
- O professor toparia participar oficialmente (responder/destacar)?

---

## Próximo passo imediato

1. Validar este plano com 2–3 colegas (15 min).
2. Criar o projeto no Supabase e as duas tabelas com RLS (fase 1a).
3. Abrir uma branch `feat/comentarios` e começar a ilha `Comentarios.jsx`.
