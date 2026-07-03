# Análise competitiva, técnica e plano de evolução

Data: julho/2026. Complementa o [MVP.md](./MVP.md) — aqui o foco é comparação com o mercado,
avaliação da stack e o roadmap para multi-sala com papéis (ADM / coordenador / aluno).

---

## 1. ⚠️ Conflito de nome: "Caderno do Aluno" já existe — e é do governo de SP

**"Caderno do Aluno" é o nome do material didático oficial da Secretaria da Educação do Estado
de São Paulo** (programa São Paulo Faz Escola, desde 2007, distribuído a mais de 5.000 escolas
da rede estadual, 2x ao ano). Além do material oficial, existem dezenas de sites de "respostas
do Caderno do Aluno" (cadernodoaluno.org e similares) que dominam as buscas.

Consequências práticas:
- **SEO zero**: buscar "caderno do aluno" nunca vai achar este projeto — a primeira página é
  governo + sites de gabarito.
- **Confusão de público**: o público-alvo (estudantes, possivelmente de SP) associa o nome à
  apostila do estado — "caderno do aluno online" já significa outra coisa pra eles.
- **Risco jurídico**: baixo para um projeto escolar gratuito, mas não nulo se crescer.

**Recomendação: renomear.** Candidatos que mantêm a metáfora do fichário e não colidem:
"Caderno da Turma" (nome original do projeto — na verdade era mais distintivo), "Nosso Caderno",
"Caderno Coletivo", "Fichário da Turma". *Decisão do dono do projeto — nada foi renomeado ainda.*

## 2. Comparação com projetos reais

| Plataforma | O que é | O que este projeto tem de diferente |
|---|---|---|
| **Google Classroom** | Gestão de turma (tarefas, avisos, arquivos), gratuito, padrão nas escolas BR | Classroom organiza *tarefas*; não estrutura *conteúdo de estudo*. Aqui cada aula tem formato fixo (relevância → teoria → revisão → recursos → quiz) e é feita *pelos alunos* |
| **Moodle** | LMS institucional completo | Pesado, exige servidor e administração; UX datada. Este projeto é zero-infra e mobile-first |
| **Passei Direto / Brainly** | Compartilhamento massivo de materiais / Q&A entre desconhecidos | São nacionais e genéricos, com paywall/anúncios. Aqui o escopo é a *turma*: conteúdo curado, sem anúncio, contexto local |
| **Descomplica / Stoodi / Me Salva!** | Cursinhos online profissionais pagos | Concorrentes do *conteúdo ENEM*, não do modelo colaborativo de turma |
| **Padlet / Notion** | Murais/documentos colaborativos genéricos | Sem estrutura pedagógica, sem quiz, sem papéis |

**Posicionamento (o nicho é real):** nenhuma plataforma conhecida faz "conteúdo estruturado de
estudo, por turma, mantido pelos próprios alunos, com quiz e discussão por aula, grátis e sem
anúncio". O concorrente de verdade não é nenhuma delas — **é o grupo de WhatsApp + foto do
caderno**. É dele que o projeto precisa roubar usuários.

## 3. Pontos fortes e fracos

**Fortes**
1. Custo zero de operação com deploy automático (estático + CDN + free tiers).
2. **Contrato de conteúdo** (schema Zod): toda aula tem a mesma estrutura de qualidade,
   independente de quem escreve — é o que um Padlet nunca terá.
3. **Pipeline de conteúdo com IA** ([CONTEUDO_PROMPT.md](./CONTEUDO_PROMPT.md)): texto bruto
   vira aula formatada em minutos — raro até em produto pago.
4. Identidade visual própria (fichário) e mobile-first: não parece LMS institucional.
5. Camada de comentários já desenhada com segurança no servidor (RLS), não na interface.
6. Documentação acima da média para projeto pessoal (README, CLAUDE.md, MVP.md, schema comentado).

**Fracos**
1. Nome colide com o material oficial de SP (seção 1).
2. **Todo conteúdo é público**: site estático não tem como restringir aula por sala — bloqueador
   para o modelo multi-sala com acesso controlado.
3. **Postar aula exige fluxo git**: barreira real para coordenadores leigos (mitigado hoje pelo
   guia [POSTAR_AULA.md](./POSTAR_AULA.md); resolvido de verdade só na fase SSR).
4. Comentários em modo demonstração até o Supabase ser criado (10 min de setup manual do dono).
5. Sem métricas de uso (não dá pra saber o que os alunos acessam), sem busca interna, quiz não
   salva progresso.
6. Conteúdo atual é fictício/demonstrativo e fator ônibus = 1 pessoa.

## 4. A stack atual suporta o backend pedido?

Requisitos declarados: login; separação de acesso por papéis; múltiplas salas; ADM (gerencia
conteúdo e comentários); coordenador de sala (posta conteúdo da sala); aluno (usuário final);
username único composto (nome + sobrenome + sala); automação de postagem.

**Veredito: a dupla Astro + Supabase suporta tudo isso — não precisa trocar de framework.**
O que precisa mudar não é a tecnologia, é a **arquitetura do conteúdo**: sair de "aula = arquivo
.mdx no repositório" para "aula = linha no banco", e ligar o modo servidor do Astro.

| Requisito | Suporte na stack atual | O que muda |
|---|---|---|
| Login | ✅ Supabase Auth (já integrado) | nada |
| Papéis (adm/coordenador/aluno) | ✅ coluna `role` + políticas RLS | ampliar schema |
| Múltiplas salas | ✅ tabela `salas` + `sala_id` | ampliar schema |
| Acesso a páginas por papel | ⚠️ em site estático só client-side (fraco) | **Astro SSR** (adapter Vercel/Netlify/Cloudflare, grátis) + middleware de sessão. Segurança real continua na RLS |
| Coordenador posta conteúdo sem git | ⚠️ hoje via GitHub web (guia) | painel `/admin` com formulário → banco (fase SSR) |
| Username nome-sobrenome-sala | ✅ UNIQUE no banco, gerado no cadastro | ⚠️ **LGPD**: nome completo real de menor exposto em comentário público é problema. Recomendo nome + inicial do sobrenome, ou apelido + sala |
| Escala | ✅ folga | free tier Supabase ≈ 50k usuários ativos/mês; a escala alvo (salas de uma escola) usa <1% disso |

**Por que não migrar para Next.js/Laravel/Django?** Nenhum requisito listado exige. Astro tem
modo servidor oficial com adapters gratuitos, ilhas React já em uso, e a migração custaria
semanas sem ganho funcional. O único host que morre na fase SSR é o GitHub Pages (só serve
estático) — a mudança é de *hospedagem* (para Vercel/Netlify/Cloudflare, importação de 5 min),
não de framework. Firebase foi considerado e descartado: o modelo relacional
(sala↔papel↔aula↔comentário) casa muito melhor com Postgres/RLS do que com NoSQL.

### Schema alvo da fase multi-sala (rascunho)

```
salas     (id, nome, codigo_convite, ano)
profiles  (id → auth.users, nome_exibicao, username UNIQUE, sala_id → salas,
           role IN ('adm','coordenador','aluno'))
lessons   (id, sala_id → salas, categoria, materia, bimestre, semana, title,
           relevance, quick_summary, body_mdx, resources jsonb, questions jsonb,
           status IN ('rascunho','publicado'), author_id, published_at)
comments  (id, lesson_id → lessons, user_id, body, deleted_at)
```

RLS: aluno lê `lessons` publicadas da própria sala; coordenador cria/edita aulas **da sua sala**;
ADM tudo; comentários como hoje + moderação por ADM e pelo coordenador da sala.

## 5. Automação de postagem de conteúdo — roadmap

| Fase | Fluxo | Esforço | Estado |
|---|---|---|---|
| **Hoje** | IA (CONTEUDO_PROMPT) → editor web do GitHub → commit → deploy automático em ~2 min | zero código novo | ✅ funcionando — guia em [POSTAR_AULA.md](./POSTAR_AULA.md) |
| Curto prazo | Formulário de Issue no GitHub → Action valida e abre PR → ADM aprova (moderação embutida) | 1 fim de semana | planejado |
| Multi-sala | Painel `/admin` no próprio site: formulário → banco → publicado na hora, por papel | fase SSR | planejado |

CI adicionado agora: todo PR roda o build automaticamente — conteúdo com frontmatter inválido é
barrado antes de chegar na main (proteção essencial quando coordenadores começarem a postar).

## 6. Sequência recomendada

1. **Agora**: decidir o novo nome (seção 1) e criar o projeto Supabase (10 min, guia no
   [supabase/schema.sql](./supabase/schema.sql)) → comentários reais ainda hoje.
2. **Piloto (2 semanas)**: postar 3–5 aulas reais pelo fluxo do POSTAR_AULA.md, colocar o link
   no grupo da sala, medir uso, validar a matriz CSD do MVP.md.
3. **Se o piloto validar**: fase multi-sala — migrar hospedagem para Vercel/Netlify (SSR),
   conteúdo para o banco, schema v2 com salas/papéis, painel de postagem.
4. **Depois**: progresso de quiz por aluno, busca, métricas.
