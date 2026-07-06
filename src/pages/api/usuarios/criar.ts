// Registro de contas — só coordenador (alunos da própria sala) e ADM (qualquer).
// Não existe auto-cadastro: esta rota é o único caminho de criação de conta.
//
// Nota de segurança (PROJETO.md §9): enquanto a SUPABASE_SERVICE_ROLE_KEY não for
// adicionada no Railway, a criação usa o signup do Supabase gateado aqui no servidor.
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import {
  createSupabaseServer,
  usernameParaEmail,
  senhaPadrao,
  USERNAME_RULE,
  origemSuspeita,
} from '../../../lib/supabaseServer';

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async (context) => {
  if (origemSuspeita(context.request, context.url)) return json(403, { error: 'Origem não permitida.' });
  const requester = context.locals.user;
  if (!requester || (requester.role !== 'adm' && requester.role !== 'coordenador')) {
    return json(403, { error: 'Só coordenadores e ADMs registram contas.' });
  }

  let payload: {
    nomeCompleto?: string;
    username?: string;
    salaId?: string;
    papel?: string;
    materia?: string;
  };
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { error: 'Corpo inválido.' });
  }

  const nomeCompleto = (payload.nomeCompleto ?? '').trim();
  const username = (payload.username ?? '').trim().toLowerCase();
  const PAPEIS = ['aluno', 'professor', 'coordenador', 'adm'] as const;
  const papel = (PAPEIS as readonly string[]).includes(payload.papel ?? '')
    ? (payload.papel as (typeof PAPEIS)[number])
    : 'aluno';
  const materia = (payload.materia ?? '').trim();

  if (nomeCompleto.split(/\s+/).length < 2) {
    return json(400, { error: 'Informe o nome completo (nome e sobrenome).' });
  }
  if (!USERNAME_RULE.test(username)) {
    return json(400, {
      error:
        'Username inválido: 3 a 30 caracteres, só minúsculas, números, ponto, hífen ou underline. Padrão: nome.inicial.sala',
    });
  }
  if (papel !== 'aluno' && requester.role !== 'adm') {
    return json(403, { error: 'Só o ADM registra professores, coordenadores e ADMs.' });
  }
  if (papel === 'professor' && !materia) {
    return json(400, { error: 'Professor precisa da matéria que leciona.' });
  }

  // Coordenador só registra alunos na própria sala; ADM escolhe a sala.
  // Professor tem matéria em vez de sala; ADM não tem nenhum dos dois.
  const salaId =
    requester.role !== 'adm'
      ? requester.salaId
      : papel === 'professor' || papel === 'adm'
        ? null
        : payload.salaId || null;
  if (papel === 'coordenador' && !salaId) {
    return json(400, { error: 'Coordenador precisa de uma sala.' });
  }

  const supabase = createSupabaseServer(context);

  // Checagem amigável de duplicata (a garantia final é o UNIQUE do banco).
  const { data: existente } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  if (existente) {
    return json(409, {
      error: `O username "${username}" já está em uso. Ajuste (ex: acrescente um número) e tente de novo.`,
    });
  }

  const senha = senhaPadrao(nomeCompleto);
  const metadata = {
    username,
    nome_completo: nomeCompleto,
    sala_id: salaId ?? '',
    materia: papel === 'professor' ? materia : '',
    must_change_password: true,
  };

  // Com a service key presente, usa a Admin API (permite desligar o signup
  // público no Supabase — PROJETO.md §9). Sem ela, cai no signup gateado.
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  let error: { message: string } | null = null;
  if (serviceKey) {
    const admin = createClient(import.meta.env.PUBLIC_SUPABASE_URL, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    ({ error } = await admin.auth.admin.createUser({
      email: usernameParaEmail(username),
      password: senha,
      email_confirm: true,
      user_metadata: metadata,
    }));
  } else {
    // Cliente descartável: não pode tocar nos cookies da sessão de quem registra.
    const temp = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
    ({ error } = await temp.auth.signUp({
      email: usernameParaEmail(username),
      password: senha,
      options: { data: metadata },
    }));
  }

  if (error) {
    if (/already registered/i.test(error.message)) {
      return json(409, { error: `O username "${username}" já está em uso.` });
    }
    return json(500, { error: `Não deu pra criar a conta: ${error.message}` });
  }

  // Promoção ao papel pedido: função no banco que exige papel de ADM de quem
  // chama (a conta sempre nasce como aluno — o trigger ignora papel do cadastro).
  if (papel !== 'aluno') {
    const { error: promoteError } = await supabase.rpc('promote_user', {
      target_username: username,
      new_role: papel,
    });
    if (promoteError) {
      return json(500, {
        error: `Conta criada como aluno, mas a promoção falhou: ${promoteError.message}`,
      });
    }
  }

  return json(200, { ok: true, username, senhaPadrao: senha, papel });
};
