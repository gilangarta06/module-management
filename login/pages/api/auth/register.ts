import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongoose'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { name, email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }
  await connectToDatabase()
  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(400).json({ error: 'Email already registered' })
  }
  const hashed = await bcrypt.hash(password, 10)
  try {
    await User.create({
      name,
      email,
      password: hashed,
      provider: 'credentials'
    })
    return res.status(201).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: 'Registration failed' })
  }
}
