// Suporte/segurança: coordenador redefine senha de alunos da própria sala;
// ADM redefine de qualquer um. Gera a senha padrão de novo (nome.sobrenome@ano)
// e reativa a troca obrigatória no primeiro login.
// Requer SUPABASE_SERVICE_ROLE_KEY no ambiente do servidor (Admin API).
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { createSupabaseServer, senhaPadrao } from '../../../lib/supabaseServer';

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async (context) => {
  const requester = context.locals.user;
  if (!requester || (requester.role !== 'adm' && requester.role !== 'coordenador')) {
    return json(403, { error: 'Só coordenadores e ADMs redefinem senhas.' });
  }

  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return json(501, {
      error:
        'Recurso pendente de configuração: adicione a SUPABASE_SERVICE_ROLE_KEY nas variáveis do servidor (Vercel) — veja PROJETO.md §9.',
    });
  }

  let payload: { username?: string };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }
  const username = String(payload.username ?? '').trim().toLowerCase();
  if (!username) return json(400, { error: 'Informe o username.' });

  const supabase = createSupabaseServer(context);
  const { data: alvo } = await supabase
    .from('profiles')
    .select('id, role, sala_id')
    .eq('username', username)
    .maybeSingle();
  if (!alvo) return json(404, { error: `Usuário "${username}" não encontrado.` });

  // Coordenador: só alunos da própria sala. ADM: qualquer um.
  if (requester.role === 'coordenador') {
    if (alvo.role !== 'aluno' || alvo.sala_id !== requester.salaId) {
      return json(403, { error: 'Coordenador só redefine senha de alunos da própria sala.' });
    }
  }

  // Nome real (tabela privada — o papel de quem pede já foi validado acima).
  const { data: privado } = await supabase
    .from('profiles_privados')
    .select('nome_completo')
    .eq('user_id', alvo.id)
    .maybeSingle();

  const novaSenha = senhaPadrao(privado?.nome_completo || username.replace(/[._-]/g, ' '));

  const admin = createClient(import.meta.env.PUBLIC_SUPABASE_URL, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: authError } = await admin.auth.admin.updateUserById(alvo.id, {
    password: novaSenha,
  });
  if (authError) return json(500, { error: `Não deu pra redefinir: ${authError.message}` });

  // Reativa o fluxo de primeiro acesso (service role ignora RLS).
  await admin.from('profiles').update({ must_change_password: true }).eq('id', alvo.id);

  return json(200, { ok: true, username, senhaPadrao: novaSenha });
};
