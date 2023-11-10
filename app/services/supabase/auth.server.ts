import { redirect } from '@remix-run/node';
import type { Session } from '@supabase/supabase-js';
import isbot from 'isbot';

import sgConfigs from '../configs.server';
import supabase from './client.server';
import { commitAuthCookie, getSessionFromCookie } from './cookie.server';

export const signUp = async (email: string, password: string) =>
  supabase.auth.signUp({
    email,
    password,
  });

export const signInWithPassword = async (email: string, password: string) =>
  supabase.auth.signInWithPassword({
    email,
    password,
  });

export const getUserFromCookie = async (cookie: string) => {
  const authCookie = await getSessionFromCookie(cookie);
  if (authCookie.has('auth_token')) {
    const authToken = authCookie.get('auth_token');
    const user = (await supabase.auth.getUser(authToken.access_token)).data.user || undefined;

    return user;
  }
};

export async function requestPayload(req: Request) {
  if (!process.env.REQ_ENCODE_ATTRS) {
    console.error('Please make sure you have REQ_ENCODE_ATTRS in your .env');
    process.exit();
  }

  const payloadAttrs = process.env.REQ_ENCODE_ATTRS.split('.');
  return payloadAttrs.map((attr) => req.headers.get(attr)).join('');
}

export async function authenticate(
  request: Request,
  customAuthRequired?: boolean,
  botcheckRequired?: boolean,
  payloadCheckRequired?: boolean,
  headers = new Headers(),
) {
  const isbotAuth = isbot.spawn();

  isbotAuth.exclude([
    'Checkly',
    'Checkly, https://www.checklyhq.com',
    // ... other excluded bots
  ]);

  const [session, payload, botcheck] = await Promise.all([
    getSessionFromCookie(request.headers.get('Cookie')),
    process.env.NODE_ENV === 'production' ? requestPayload(request) : undefined,
    isbotAuth(request.headers.get('User-Agent')),
  ]);

  if (botcheck && botcheckRequired) {
    console.log('bot detected', request.headers.get('User-Agent'));
    throw new Response(null, { status: 500 });
  } else if (!session.has('auth_token')) {
    // Handle the case when the user is not signed in or the session has expired
    // This could involve different behavior than redirection, based on your requirements.
    // You can add your custom handling here.
    console.log('User is not signed in or session has expired');
  } else {
    const authToken = session.get('auth_token');

    if (
      payload !== authToken?.req_payload &&
      process.env.NODE_ENV === 'production' &&
      payloadCheckRequired
    ) {
      throw new Response(null, { status: 200 });
    }

    const { data: { user } } = await supabase.auth.getUser(authToken.access_token);

    if (!user || authToken.expires_at < Date.now()) {
      const { data } = await supabase.auth.setSession(authToken as Session);

      if (data.session) {
        session.set('auth_token', {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: Date.now() + (data.session.expires_in - 10) * 1000,
          req_payload: process.env.NODE_ENV === 'production' ? await requestPayload(request) : undefined,
        });

        headers.append('Set-Cookie', await commitAuthCookie(session));

        if (request.method === 'GET') {
          throw redirect(request.url, { headers });
        }
      }
    } else {
      return user;
    }
  }
}