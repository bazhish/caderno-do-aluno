# Política de segurança

## Como reportar uma vulnerabilidade

Se você encontrar uma falha de segurança no Caderno da Turma, **não abra uma issue pública**.
Use o canal privado do GitHub: aba **Security → Report a vulnerability** deste repositório.

Inclua, se possível: o que é afetado, um passo a passo para reproduzir, e o impacto esperado.
A gente responde o mais rápido que der.

## Escopo

O que mais nos interessa:

- Furos de **autorização** — acessar, editar ou apagar conteúdo/comentários fora do que o papel
  permite (lembrando: coordenador é limitado à **própria sala**).
- Bypass do **login** ou da troca de senha de primeiro acesso.
- **Injeção** (SQL, XSS) ou vazamento de dados privados (ex.: o nome real dos alunos, que é
  restrito a coordenador/ADM por RLS).
- Exposição de segredos (`SUPABASE_SERVICE_ROLE_KEY` só pode existir no servidor).

## Boas práticas do projeto

- A segurança real mora nas políticas **RLS** do Postgres — a interface nunca é a barreira.
- Escalada de papel só acontece por funções `SECURITY DEFINER` que checam o chamador.
- Rode os schemas `supabase/schema*.sql` **em ordem** (v1 → v4); o isolamento por sala depende do v4.
