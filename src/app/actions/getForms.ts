'use server'

import { auth, EnrichedSession } from "@/auth"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function getForms() {
  const session = (await auth()) as EnrichedSession

  if (!session?.dbUserId) {
    return []
  }

  const user = await db.query.users.findFirst({
    where: eq(users.dbUserId, session.dbUserId),
    with: {
      forms: true
    }
  })

  console.log(user)

  return user?.forms || []
}
