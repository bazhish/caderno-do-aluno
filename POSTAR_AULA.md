# Como postar uma aula (hoje, sem instalar nada)

Fluxo completo em ~10 minutos, direto do navegador (funciona até do celular).
Pré-requisito: uma conta no GitHub com acesso de escrita a este repositório
(peça ao ADM para te adicionar como colaborador em Settings → Collaborators).

## Passo 1 — Transforme o conteúdo bruto em aula formatada (IA)

1. Abra o [CONTEUDO_PROMPT.md](./CONTEUDO_PROMPT.md) e copie o prompt inteiro.
2. Cole no Claude (ou ChatGPT), e logo abaixo cole o seu material bruto: anotações da aula,
   foto do caderno transcrita, resumo do professor, capítulo do livro — qualquer coisa.
3. A IA devolve o arquivo `.mdx` completo, já no formato do site (frontmatter + aula teórica +
   tópicos de revisão + 5 questões). Revise o resultado: você é o responsável pelo conteúdo,
   a IA é só a formatadora.

## Passo 2 — Crie o arquivo pelo site do GitHub

Clique no link da categoria certa (abre o editor web já na pasta correta):

- **ENEM**: [criar arquivo em src/content/enem/](https://github.com/bazhish/caderno-da-turma/new/main?filename=src/content/enem/materia/tema.mdx)
- **Escolar**: [criar arquivo em src/content/escolar/](https://github.com/bazhish/caderno-da-turma/new/main?filename=src/content/escolar/materia/1-bimestre/semana-01-tema.mdx)
- **DS**: [criar arquivo em src/content/ds/](https://github.com/bazhish/caderno-da-turma/new/main?filename=src/content/ds/materia/1-bimestre/semana-01-tema.mdx)

Ajuste o caminho/nome do arquivo no topo do editor seguindo as regras:

- Só **letras minúsculas, números e hífen** — sem acento, sem espaço, sem ç.
  (`fisica` ✔ / `Física` ✘; `semana-02-funcao-afim` ✔ / `Semana 2 - Função Afim` ✘)
- **ENEM**: `<materia>/<tema>.mdx` → ex: `fisica/leis-de-newton.mdx`
- **Escolar/DS**: `<materia>/<N>-bimestre/semana-<NN>-<tema>.mdx`
  → ex: `matematica/2-bimestre/semana-03-funcao-quadratica.mdx`
- No ENEM, a matéria precisa ser um dos slugs oficiais (senão a aula não aparece vinculada):
  `biologia`, `fisica`, `quimica`, `historia`, `geografia`, `filosofia`, `sociologia`,
  `lingua-portuguesa`, `lingua-estrangeira`, `artes`, `educacao-fisica`, `tic`, `matematica`.

Cole o conteúdo gerado no Passo 1 e clique em **Commit changes** (pode commitar direto na main).

## Passo 3 — Espere ~2 minutos

O deploy é automático: acompanhe em [Actions](https://github.com/bazhish/caderno-da-turma/actions).
Quando o workflow ficar verde, a aula está no ar em
**https://bazhish.github.io/caderno-da-turma/**.

## Se der errado

- **O workflow ficou vermelho**: quase sempre é frontmatter inválido (faltou campo, questão sem
  5 alternativas, `correctIndex` fora de 0–4). Abra o log do erro, corrija o arquivo (lápis ✏️
  no GitHub) e commite de novo — o schema em `src/content.config.ts` é o contrato.
- **A aula não aparece na lista**: confira o caminho da pasta (profundidade errada = rota errada)
  e, no ENEM, se o slug da matéria está na lista oficial acima.
- **Commitei besteira**: me avise (ADM) — todo commit é reversível.

> Futuro: quando o sistema multi-sala chegar, esse fluxo vira um formulário dentro do próprio
> site, com papel de coordenador — sem GitHub.
