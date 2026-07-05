# Caderno da Turma — Especificação do Projeto

Documento-mestre do sistema. Consolida a visão completa descrita pelo dono do projeto
(Islan) para orientar todo o desenvolvimento. Atualizado em julho/2026.

---

## 1. Visão

Plataforma **solidária e colaborativa** de material de estudo, feita por alunos para alunos
da escola. Nasceu de dois problemas reais: o material de apoio oficial é fraco, e montar
material bom (resumo + vídeo + questões) toma um tempo que aluno de 3º ano — com estágio,
trabalho e vida — não tem. A ideia: poucas pessoas estruturam bem uma vez, todo mundo
aproveita, e o esforço de contribuir é o menor possível.

**Processo de adoção na escola:** apresentar à coordenação pedagógica → aprovado, apresentar
à sala → sala adere → votação elege 2 coordenadores por sala → ADM formaliza os papéis.

## 2. Categorias de conteúdo

| Categoria | O que é | Quem acessa |
|---|---|---|
| **ENEM** | Preparação para o exame, com questões de provas oficiais anteriores | Todos (foco no 2º/3º ano) |
| **Regular** | Matérias comuns da escola (Português, Matemática, História…). **Cada sala tem sua própria lista de matérias** — varia de sala pra sala | Todos (padrão: a própria sala) |
| **Curso técnico** | Matérias profissionalizantes, só no 2º/3º ano. Cursos existentes: **Desenvolvimento de Sistemas (DS)** e **Administração**. Cada ano de cada curso tem matérias próprias (2º DS ≠ 3º DS) | Todos (padrão: o próprio curso) |

1º ano não tem curso técnico — só Regular (e ENEM se quiser).

**Acesso é aberto entre salas**: qualquer aluno logado pode navegar e ler o material de
qualquer sala/curso (ex.: aluno de ADM espiando DS pra decidir se muda). O que é fixo é o
**padrão**: ao logar, o aluno cai na visão da própria sala.

## 3. Estrutura do conteúdo por semana

Toda aula segue a estrutura fixa: título → tema/matéria → resumo rápido → relevância →
conteúdo teórico → tópicos-chave → recursos de apoio (vídeo aula, curso gratuito, materiais
adicionais, conteúdo complementar — obrigatório caprichar: o resumo nunca cobre tudo).

O que muda entre categorias é a parte de exercícios:

| | ENEM | Regular | Curso técnico |
|---|---|---|---|
| Aulas/semana | por tema (sem semana) | 3–4 | 3–4 |
| Quiz | **Teste de Fogo** (múltipla escolha, questões de provas oficiais) | **Teste de Fogo** (múltipla escolha) | **Pause e Responda**: 1 questão por aula (3–4/semana), alternativas vindas do material oficial |
| Atividades práticas | — | — | **1–3/semana**, DEPOIS do Pause e Responda: roteiro em texto livre com instruções claras (ex.: "faça este código mobile"), **sem correção automática, sem gabarito** |

### Banco de questões (anti-cola)

- Cada aula tem um banco **amplo** de questões (sem número fixo — quanto mais, melhor).
- O sistema **sorteia** as questões por aluno: alunos diferentes recebem questões diferentes
  (colar passando resposta fica difícil; coincidência ocasional é aceitável).
- Ao refazer o quiz, o aluno **não recebe questões que já respondeu** (o sistema registra o
  que cada um já viu).

## 4. Papéis e permissões

| | Aluno | Coordenador | ADM |
|---|---|---|---|
| Ver todo o conteúdo | ✅ | ✅ | ✅ |
| Comentar | ✅ | ✅ | ✅ |
| Postar/editar/excluir aula | — | ✅ **só da própria sala** | ✅ qualquer |
| Moderar (apagar) comentários | — | ✅ da própria sala | ✅ qualquer |
| Registrar alunos | — | ✅ da própria sala | ✅ |
| Registrar coordenadores | — | — | ✅ |
| Trocar senha de outros (suporte) | — | ✅ alunos da sala* | ✅ qualquer* |
| Painel completo do sistema | — | — | ✅ |

\* exige chave service_role no servidor — ver seção 9.

- **Coordenadores**: 2 por sala, eleitos pela sala. Fazem tudo **pela interface do site** —
  ninguém instala nada, ninguém precisa de ferramenta de programador.
- **ADM**: Islan + 1 colega (fundadores).

## 5. Contas, login e identidade

- **Não existe auto-cadastro.** Só coordenador/ADM registram contas.
- Registro pede: **nome completo** + **nome de usuário** + sala.
- Username: padrão `nome.inicialdosobrenome.sala` (ex.: `joao.s.3dsa`), **único no sistema**
  (garantido pelo banco). Se der duplicata, o sistema avisa o coordenador na hora.
- **Senha padrão** no formato `nome.sobrenome@ano` (ex.: `joao.silva@2026`) — padronizada pra
  ninguém travar no primeiro acesso. **No primeiro login o sistema obriga a trocar** por uma
  senha pessoal.
- O **nome completo real fica privado** (tabela separada, visível só a coordenador/ADM):
  serve pra identificar o dono da conta em caso de comentário grave e acionar o responsável.
  Publicamente só aparece o username.

## 6. Comentários

- Por aula, como já existe. **Tempo real** (Supabase Realtime — atualiza sem recarregar).
- **Censura automática**: filtro de palavras bloqueadas (xingamento/preconceito) antes da
  moderação humana. A lista de termos é mantida pelo ADM (tabela no banco).
- Moderação humana por cima: coordenador (própria sala) e ADM apagam qualquer comentário.

## 7. Postagem de conteúdo (pelo site)

Coordenador posta aula por **formulário no próprio site**: categoria → matéria →
bimestre/semana → título → resumo → relevância → conteúdo → tópicos-chave → recursos →
questões (enunciado + alternativas + correta + explicação) → atividades (roteiro).
Nada de GitHub pra coordenador — o fluxo via GitHub (POSTAR_AULA.md) fica sendo o modo
avançado/ADM até o formulário existir.

## 8. Configurações e acabamento

- Página de configurações do usuário: **tema** (claro/escuro no mínimo) e **fonte**.
- Página de ajuda/segurança no painel ADM: troca de senha de alunos e coordenadores.
- Qualidade de referência: comparável a sistemas profissionais (LMS de mercado).

## 9. Arquitetura técnica

- **Framework:** Astro em modo **servidor** (SSR, adapter Node standalone) + ilhas React.
  Login e permissão são checados **no servidor** (middleware) — não é esconde-com-JS.
- **Banco/Auth:** Supabase (Postgres + Auth + RLS + Realtime). Projeto: `caderno-da-turma`
  (ref `bjotfrlhdixdpkhcnung`). A segurança de verdade mora nas políticas RLS.
- **Login por username:** internamente o username vira o e-mail sintético
  `username@caderno.local` no Supabase Auth (aluno não precisa ter e-mail).
- **Hospedagem:** **Railway** (deploy contínuo via GitHub, repo `bazhish/caderno-da-turma`).
  GitHub Pages foi desativado (não roda servidor).
- **Conteúdo:** hoje em `.mdx` no repositório (funciona no SSR); migração para o banco
  acontece na fase do formulário de postagem (fase 3).
- ⚠️ **Pendência de segurança:** criar usuário hoje usa o signup público do Supabase
  (gateado pelo servidor). Quando a chave `SUPABASE_SERVICE_ROLE_KEY` for adicionada no
  Railway **pelo Islan** (Supabase → Settings → API Keys → secret), trocar para a Admin API
  e desligar o signup público. Isso também habilita troca de senha por ADM/coordenador.

### Schema (v2)

```
cursos               (id, nome, slug)                    → DS, Administração
salas                (id, nome, ano 1-3, curso_id?)
materias             (id, sala_id, nome, slug, tipo)     → regular | curso (fase 3)
profiles             (id→auth, username UNIQUE, sala_id, role aluno|coordenador|adm,
                      must_change_password)
profiles_privados    (user_id, nome_completo)            → RLS: só coordenador/ADM leem
comments             (id, lesson_slug, user_id, body, deleted_at)
questoes             (id, lesson_slug, enunciado, alternativas jsonb, correct_index,
                      explicacao, fonte)                 → banco amplo por aula
questoes_respondidas (user_id, questao_id, acertou)      → anti-repetição por aluno
palavras_bloqueadas  (termo)                             → censura automática
```

## 10. Fases

| Fase | Entrega | Status |
|---|---|---|
| 0 | Site estático, conteúdo MDX, comentários com Supabase | ✅ feito |
| 1 | SSR + login obrigatório (sem auto-cadastro) + primeiro acesso troca senha + papéis no middleware + painel de registro de contas + salas/cursos no banco + deploy (Vercel) | ✅ feito |
| 2 | Comentários em tempo real + censura automática (trigger no banco + lista `palavras_bloqueadas`) + quiz com banco de questões sorteadas sem repetição por aluno + visão "minha sala" no hub | ✅ feito |
| 3 | Formulário de postagem de aula no site (aulas no banco convivendo com o .mdx legado) + Pause e Responda (1 questão/aula no curso) + atividades práticas | ✅ feito |
| 4 | Configurações (tema escuro/fonte), painel ADM completo (métricas, redefinir senha, gerenciar aulas), suporte a service_role | ✅ feito* |

\* Pendências que dependem do dono: (1) colar a `SUPABASE_SERVICE_ROLE_KEY` nas variáveis da
Vercel — ativa "redefinir senha" e permite desligar o signup público no painel do Supabase
(Authentication → Sign In/Providers → desativar "Allow new users to sign up"); (2) rodar
`supabase/schema-v4.sql` + o bloco final do `schema-v3.sql` no SQL Editor (o dashboard do
Supabase estava fora do ar no momento do deploy).
