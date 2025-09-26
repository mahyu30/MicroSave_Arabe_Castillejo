import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const getAuthUser = (request: NextRequest) => {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  return decoded?.userId || null;
};